import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getProfile } from "../services/auth";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username: form.username, password: form.password });
      localStorage.setItem("token", data.access);

      const profile = await getProfile(data.access);
      localStorage.setItem("is_admin", profile.is_admin);
      navigate("/storage"); 
    } catch {
      setError("Сервер недоступен");
    }
  };

  return (
    <div className="form-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Логин"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Войти</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;