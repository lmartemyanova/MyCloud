import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
// import AdminPanelPage from "../pages/AdminPanelPage";
import StoragePage from "../pages/storage/StoragePage";
// import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      {/* <Route path="/admin" element={<AdminPanelPage />} /> */}
      <Route path="/storage/:userId" element={<StoragePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}