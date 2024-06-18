import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>,
);
