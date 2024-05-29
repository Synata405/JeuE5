import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Creerpersonnage from './Creerpersonnage'
import Creermonstre from './Creermonstre'
import './index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
