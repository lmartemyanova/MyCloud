import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");

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
          <button onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;