import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HomeRedirect from "./pages/HomeRedirect";
import Navbar from "./components/Navbar";
import StoragePage from "./pages/StoragePage";
import PublicDownloadPage from "./pages/PublicDownloadPage";
import AdminPanel from "./pages/AdminPanelPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/public/:uuid" element={<PublicDownloadPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
