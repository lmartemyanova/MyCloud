import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");
  
    const handleLogout = () => {
      localStorage.removeItem("token");
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
          <button onClick={handleLogout}>Выйти</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;