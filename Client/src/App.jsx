import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SecurityHome from "./pages/home/SecurityHome";
import CreateQR from "./pages/qr/CreateQR";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/security-home" element={<SecurityHome />} />
          <Route path="/create-qr" element={<CreateQR />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
