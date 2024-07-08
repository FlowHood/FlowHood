import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SecurityHome from "./pages/home/SecurityHome";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PageTest from "./pages/PageTest";
import PageNotFound from "./pages/PageNotFound";
import CreateQRHome from "./pages/qr/CreateQRHome";
import ScanQR from "./pages/qr/ScanQR";
import { AuthProvider } from "./context/AuthContext";
import ModalTest from "./pages/ModalTest";
import ResidentAccountView from "./pages/account/ResidentAccountView";
import AllRequest from "./pages/home/AllRequest";
import { VIEWS } from "./lib/views";
import UserList from "./pages/admin/UserList";
import HouseList from "./pages/admin/HouseList";
import RequestList from "./pages/admin/RequestList";
import Loading from "./components/Loading";
import CreateRequestHome from "./pages/form/CreateRequestHome";
import RequestDetail from "./pages/request/RequestDetail";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ROL } from "./lib/rol";
import CreateHouse from "./pages/admin/CreateHouse";
import ScrollToTop from "./components/ScrollToTop";
import ChartsPage from "./pages/admin/ChartsPage";
import UpdateUser from "./pages/admin/UpdateUser";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIEND_ID}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={VIEWS.pageNotFound} element={<PageNotFound />} />
            <Route path={VIEWS.login} element={<Login />} />
            <Route path={VIEWS.test} element={<PageTest />} />

            <Route path={VIEWS.scanQR} element={<ScanQR />} />

            <Route path={VIEWS.loader} element={<Loading />} />
            <Route path={VIEWS.modal} element={<ModalTest />} />
            {/* Rutas publicas para usuarios logeados */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROL.OWNER,
                    ROL.RESIDENT,
                    ROL.VISITOR,
                    ROL.VIGILANT,
                    ROL.ADMIN,
                  ]}
                />
              }
            >
              <Route path="/" element={<SecurityHome />} />
              <Route path={VIEWS.myAccount} element={<ResidentAccountView />} />
            </Route>

            {/* TODOS logeados menos el vigilante*/}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROL.OWNER,
                    ROL.RESIDENT,
                    ROL.VISITOR,
                    ROL.ADMIN,
                  ]}
                />
              }
            >
              <Route path={VIEWS.request} element={<AllRequest />} />
              <Route path={VIEWS.requestDetail} element={<RequestDetail />} />
              <Route path={VIEWS.createQR} element={<CreateQRHome />} />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROL.OWNER,
                    ROL.RESIDENT,
                    ROL.VIGILANT,
                    ROL.ADMIN,
                  ]}
                />
              }
            >
              <Route
                path={VIEWS.CreateRequestHome}
                element={<CreateRequestHome />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROL.ADMIN]} />}>
              <Route path={VIEWS.dashboard} element={<AdminDashboard />} />
              <Route path={VIEWS.manageHouse} element={<CreateHouse />} />
              <Route path={VIEWS.manageUser} element={<UpdateUser />} />
              <Route path={VIEWS.houseList} element={<HouseList />} />
              <Route path={VIEWS.userList} element={<UserList />} />
              <Route path={VIEWS.requestList} element={<RequestList />} />
              <Route path={VIEWS.charts} element={<ChartsPage />} />
              <Route
                path={VIEWS.CreateRequestHome}
                element={<CreateRequestHome />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
