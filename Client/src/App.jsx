import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SecurityHome from "./pages/home/SecurityHome";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PageTest from "./pages/PageTest";
import PageNotFound from "./pages/PageNotFound";
import CreateQR from "./pages/qr/CreateQR";
import ScanQR from "./pages/qr/ScanQR";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/Loading";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIEND_ID}>
      <AuthProvider>
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
            <Route path="/loader" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
