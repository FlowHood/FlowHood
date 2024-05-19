import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SecurityHome from "./pages/home/SecurityHome";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PageTest from "./pages/PageTest";
import PageNotFound from "./pages/PageNotFound";
import CreateQR from "./pages/qr/CreateQR";
import ScanQR from "./pages/qr/ScanQR";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/securityHome" element={<SecurityHome />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/test" element={<PageTest />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/security-home" element={<SecurityHome />} />
          <Route path="/create-qr" element={<CreateQR />} />
          <Route path="/scan-qr" element={<ScanQR />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
