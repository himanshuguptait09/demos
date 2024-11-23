import React from "react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createRoot } from "react-dom/client";
import 'sweetalert2/src/sweetalert2.scss'
import "primereact/resources/themes/lara-light-cyan/theme.css";
 
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
