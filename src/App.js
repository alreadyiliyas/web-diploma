import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ServicesPage from './pages/ServicesPage';
import ClientPage from "./pages/ClientPage";
import WorkerPage from "./pages/WorkerPage";
import AdminPage from "./pages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import {useCookies} from "react-cookie";
import RegisterPage from "./pages/RegisterPage";
import UserInfoPage from "./pages/UserInfoPage";
import {ToastContainer} from "react-toastify";

function App() {
    const [cookies] = useCookies(['UserRole', 'UserGuid']);
    const UserRole = cookies.UserRole;
    const UserGuid = cookies.UserGuid;

    return (
        <Router>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/userinfo/:userId" element={<UserInfoPage />} />
                {UserRole === 'client' && <Route path="/client/:UserGuid" element={<ClientPage />} />}
                {UserRole === 'worker' && <Route path="/worker" element={<WorkerPage />} />}
                {UserRole === 'admin' && <Route path="/admin" element={<AdminPage />} />}
                {UserRole === 'moderator' && <Route path="/moderator" element={<ModeratorPage />} />}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}
export default App;