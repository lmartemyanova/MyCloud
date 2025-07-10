import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");
    const isAdmin = localStorage.getItem("is_admin") === "true";
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("is_admin");
      navigate("/"); // <- перенаправление на главную
    };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">☁️ My Cloud</Link>
      <div className="nav-links">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        ) : (
          <>
            {isAdmin && <Link to="/admin">Админка</Link>}
            <Link to="/storage">Хранилище</Link>
            <button onClick={handleLogout}>Выйти</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;