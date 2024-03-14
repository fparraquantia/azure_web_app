import {Box, Button,  Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useState, useEffect,} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import 'react-responsive-modal/styles.css';
const logo = require("../assets/logo.png")
const steps = ['Conceder Acceso', 'Seleccionar Proyecto', 'Subir Presupuesto'];

const UploadSuccessfully : React.FC = () => {
    // Lee los parámetros de consulta de la URL
  const params = new URLSearchParams(window.location.search);
  const nconcepts = params.get('nconcepts');
  const presupuesto = params.get('presupuesto');
  const coste_total = params.get('coste_total');
  const url_project = params.get('url_project');
  console.log(nconcepts,presupuesto,coste_total,url_project)




    useEffect(() => {
       
    }, []);

    return (

        <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            minHeight={550}
            sx={{
            boxShadow: {
                xs: "",
                sm: "",
                md: "15px 2px 5px -5px",
                lg: "15px 2px 5px -5px",
                xl: "15px 2px 5px -5px"
            }
        }}>

            <Box
                sx={{
                backgroundColor: "rgba(245,245,245,255)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px"
                }
            }}>

                <Box width="90%">
                    <Box display="flex" flexDirection="column" alignItems="left">
                        {/* LOGO */}
                        <img src={logo} style={{width:100, height: 'auto', marginTop: 15}}></img>

                        {/* LOGO END */}
                        <Typography
                            color="#96ce00"
                            fontSize="22px"
                            sx={{
                            textAlign: 'left',
                            marginTop: 2,
                            marginBottom: 0
                        }}
                            mt={10}
                            mb={1}>
                            Integración de Presupuestos

                        </Typography>
                        <Typography
                            color="black"
                            fontSize="13px"
                            sx={{
                            textAlign: 'left',
                            marginTop: 1
                        }}
                            mt={7}
                            mb={3}>
                            Plataforma de integración de presupuestos BC3 con ACC
                        </Typography>
                    </Box>
                    <React.Fragment>
                        <CssBaseline/>

                        <Box width="100%" display="flex" flexDirection="column" alignItems="left">
                            <Stepper
                                activeStep={3}
                                sx={{
                                pt: 3,
                                pb: 5
                            }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </React.Fragment>

                    <Box
                        sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        height: "80%"
                    }}>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>

                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={false}>
                                    <StepLabel icon={'1'}>
                                        <Typography color="grey" fontSize="15px">
                                            Conceder Acceso en ACC
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>

                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={false}>
                                    <StepLabel icon={'2'}>
                                        <Typography color="grey" fontSize="15px">
                                            Selecciona tu Proyecto
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>
                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={true}>
                                    <StepLabel icon={'3'}>
                                        <Typography fontSize="15px">
                                            Sube tu Presupuesto
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>

                            <Typography
                                color="black"
                                fontSize="12px"
                                sx={{
                                textAlign: 'left'
                            }}
                                mt={0}
                                pr={3}
                                mb={0}>
                                El presupuesto {' '}
                                <Typography
                            color="#96ce00"
                            fontSize="12px"
                            sx={{
                                display: 'inline', // Hace que el componente se muestre en línea
                                textAlign: 'left',
                            }}
                         >
                            {presupuesto} {' '}
                        </Typography>
                        <Typography
                            color="black"
                            fontSize="12px"
                            sx={{
                                display: 'inline', // Hace que el componente se muestre en línea
                                textAlign: 'left',
                            }}
                         >
                            con un valor de {' '}
                        </Typography>
                        <Typography
                            color="#96ce00"
                            fontSize="12px"
                            sx={{
                                display: 'inline', // Hace que el componente se muestre en línea
                                textAlign: 'left',
                            }}
                         >
                            {coste_total} {' '}
                        </Typography>
                        <Typography
                            color="black"
                            fontSize="12px"
                            sx={{
                                display: 'inline', // Hace que el componente se muestre en línea
                                textAlign: 'left',
                            }}
                         >
                           se ha subido de manera correcta en Autodesk.
                        
                        </Typography>
                            </Typography>
                            <Typography
                                color="black"
                                fontSize="12px"
                                sx={{
                                textAlign: 'left'
                            }}
                                mt={1}
                                mb={3}>
                                Por favor, revisa la correcta creación de todos los elementos, segmentos, y capítulos en la configuración de Autodesk.
                            </Typography>
                            <Typography
                                color="black"
                                fontSize="12px"
                                sx={{
                                textAlign: 'left'
                            }}
                                mb={3}>
                                * Haz click en el botón para ser redirigido al presupuesto en ACC.
                            </Typography>ss
                            <Button
                                            variant="contained"
                                            href={`${url_project}`}
                                            sx={{
                                            mt: 2,
                                            mb: 3,
                                            pt: 1.5,
                                            pb: 1.5,
                                            borderRadius: '30px',
                                            width: "95%"
                                        }}>
                                            <Typography color="white" fontSize="12px">
                                                Ir al Presupuesto
                                            </Typography>
                                        </Button>
                            
                        </Box>

   
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}></Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default UploadSuccessfully;
