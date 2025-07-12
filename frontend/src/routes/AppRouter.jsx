import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
import AdminPanel from "../pages/AdminPanelPage";
import StoragePage from "../pages/storage/StoragePage";
// import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/storage/:userId" element={<StoragePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}