import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import "../styles/form.css";
import { validateRegisterForm } from "../utils/validate";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegisterForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await register({
        username: form.username,
        password: form.password,
        full_name: form.fullName,
        email: form.email,
      });

      navigate("/login");
    } catch (error) {
      setServerError(
        error?.response?.data?.detail || "Ошибка при регистрации"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Логин"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          name="fullName"
          placeholder="Полное имя"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Зарегистрироваться</button>
        {serverError && <p className="error">{serverError}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;