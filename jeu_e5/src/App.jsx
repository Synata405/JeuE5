import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Routes/Navigation.jsx";
import Creerpersonnage from "./Creerpersonnage.jsx";
import Creermonstre from "./Creermonstre.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Creermonstre" element={<Creermonstre />} />
        <Route path="/" element={<Creerpersonnage />} />
      </Routes>
    </>
  );
}

export default App;
