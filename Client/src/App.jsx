import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SecurityHome from "./pages/home/SecurityHome";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PageTest from "./pages/PageTest";
import PageNotFound from "./pages/PageNotFound";
import CreateQRHome from "./pages/qr/CreateQRHome";
import ScanQR from "./pages/qr/ScanQR";
import AllRequest from "./pages/home/AllRequest";
import { VIEWS } from "./lib/views";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={VIEWS.login} element={<Login />} />
          <Route path={VIEWS.dashboard} element={<AdminDashboard />} />
          <Route path={VIEWS.test} element={<PageTest />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path={VIEWS.securityHome} element={<SecurityHome />} />
          <Route path={VIEWS.createQR} element={<CreateQRHome />} />
          <Route path={VIEWS.scanQR} element={<ScanQR />} />
          <Route path={VIEWS.request} element={<AllRequest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
