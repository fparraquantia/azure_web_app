const express = require("express");
const path = require('path');
const multer = require('multer');
const http = require('http');
const {spawn} = require('child_process');
const fs = require('fs');
const cors = require('cors');
var attributesArray
var template_id
var token
const axios = require('axios');
const PORT = process.env.PORT || 3001;

const client_id = 's2ztlGcammyWFdVA7S4P9HX9cGaPKCk8'
const secret_id = 'UHFxXAnlp3O4daNs'
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

const socketIo = require('socket.io');
const io = socketIo(server);

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://budget2acc.azurewebsites.net/',
    //origin: 'http://localhost:3001/',
    optionsSuccessStatus: 200
};

//Configuracion Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})
app.use(cors(corsOptions));

//REDIRECCION /SelectProject/
app.get('/SelectProject/', function (req, res) {
    //Obtencion de code, y client and secret id
    const code = req.query.code;
    console.log('codigo' + code)
    res.redirect('/SelectProjectBc3');
    //Llamada a APS para obtener token
    let url = 'https://developer.api.autodesk.com/authentication/v1/gettoken';
    let data = {
        client_id: client_id,
        client_secret: secret_id,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://budget2acc.azurewebsites.net/SelectProject/'
        //redirect_uri: 'http://localhost:3001/SelectProject/'
    };
    let confheaders = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    axios
        .post(url, data, confheaders)
        .then((response) => {
            token = response.data['access_token']
            console.log(token);
            findHubId(token)
        })
        .catch((error) => {
            console.error(error);
        });
  });
  
//REDIRECCION /NameProject/
app.post('/UploadNameProject', function (req, res) {
    console.log(req.body)
    project_name = req.body['label']
    project_id = req.body['value']
    res.redirect('/SendBc3');
    findTemplateId()
});

//REDIRECCION /UploadSuccessfully/
app.post('/UploadSuccessfully', function (req, res) {
    console.log(req.body)
    nconcepts = req.body['nconcepts']
    nombre_presupuesto = req.body['nombre_presupuesto']
    coste = req.body['coste']
});


//REDIRECCION /UploadBC3/
app.post('/upload', upload.array('myBc3'), (req, res) => {
    console.log(req.files[0]['originalname']);
    var bc3_filename = req.files[0]['originalname']
    const file_path = `uploads/${bc3_filename}`
    
    let urlBc3 = 'https://sendbc3.azurewebsites.net/api/send_bc3?code=tZ6rPBpK2FhuZ25yZN4qK0k9YDtCVPEVMiW28ZNW8z98AzFuXvwIHw==&clientId=default';
    //let urlBc3 = 'http://127.0.0.1:7071/api/send_bc3';
    let dataBc3 = {
        file: fs.createReadStream(file_path),
        token: token,
        id_project: project_id,
        id_template: template_id
    };
    let confheadersBc3 = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios
        .post(urlBc3, dataBc3, confheadersBc3)
        .then((response) => {
            console.log('Respuesta exitosa:', response.data);
            //Obtener respuesta de Azure Functions y actualizacion del FE
            const execution_time_seconds = response.data['execution_time'];
            const execution_time_minutes = parseFloat((execution_time_seconds / 60).toFixed(2));
            data = {
                "nconcepts" : response.data['n_concepts'],
                "presupuesto" : response.data['presupuesto'],
                "coste_total" : response.data['coste_total'],
                "execution_time" : execution_time_minutes,
                "url_project" : response.data['url_project']  
            }
            res.json(response.data);
        })
        .catch((error) => {
            console.error('Error en Axios:', error.message, error);
        });
});

//Llamada a APS para obtener el ID de template desde Acc
function findTemplateId() {
    let urlTemplate = `https://developer.api.autodesk.com/cost/v1/containers/${project_id}/templates`;
    let confHeadersTempl = {
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json",
            Authorization: 'Bearer ' + token
        }
    };
    axios
        .get(urlTemplate, confHeadersTempl)
        .then((response) => {
            template_id = response.data[0]['id']
            console.log(template_id)
        })
        .catch((error) => {
            console.error(error);
        });
}
//REDIRECCION /SendBc3/
app
    .get('/SendBc3/', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });

//REDIRECCION /UploadSuccessfully/
app
    .get('/UploadSuccessfully/', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });

app.get('/api/data', (req, res) => {
    res.json({attributesArray});
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores
// retornaran nuestro app React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

//Llamada a APS para obtener el hub
function findHubId(tok) {
    let urlHub = 'https://developer.api.autodesk.com/project/v1/hubs';
    let confheadersHub = {
        headers: {
            Authorization: 'Bearer ' + tok
        }
    };
    axios
        .get(urlHub, confheadersHub)
        .then((response) => {
            const id_hub = response.data['data'][0]['id']
            getProjects(id_hub, tok)
        })
        .catch((error) => {
            console.error(error);
        });
}

/**
 * 
 * @param {*} id_hub -> REEMPLAZAR POR ID FIJO DE AENA
 * @param {*} tok  -> MANTENER
 */

//Llamada a APS para obtener todos los proyectos
function getProjects(id_hub, tok) {

    const urlProject = `https://developer.api.autodesk.com/project/v1/hubs/${id_hub}/projects`;
    let confheadersProj = {
        headers: {
            Authorization: 'Bearer ' + tok
        }
    };
    axios
        .get(urlProject, confheadersProj)
        .then((response) => {
            attributesArray = response
                .data
                .data
                .map((item) => ({name: item.attributes['name'], id: item.relationships['cost']['data']['id']
                }));
            console.log(attributesArray)

        })
        .catch((error) => {
            console.error(error);
        });

}
