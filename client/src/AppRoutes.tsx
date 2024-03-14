// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AutenticaAcc from "./components/AutenticaAcc";
import SelectProject from "./components/SelectProject";
import UploadSuccessfully from "./components/UploadSuccessfully";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AutenticaAcc />} />
      <Route path="/SelectProject" element={<SelectProject />} />
      <Route path="/UploadSuccessfully" element={<UploadSuccessfully />} />
    </Routes>
  );
};

export default AppRoutes;