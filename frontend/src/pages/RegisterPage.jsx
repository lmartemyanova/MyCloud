import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

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

  const validate = () => {
    const errs = {};

    if (!/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(form.username)) {
      errs.username = "Логин: латиница, от 4 до 20 символов, начинается с буквы";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Неверный формат email";
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/.test(form.password)
    ) {
      errs.password =
        "Пароль: ≥6 символов, 1 заглавная, 1 цифра, 1 спецсимвол";
    }

    if (!form.fullName.trim()) {
      errs.fullName = "Укажите полное имя";
    }

    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const body = {
        username: form.username,
        password: form.password,
        full_name: form.fullName, // здесь вручную переименовываешь
        email: form.email,
      };
      const res = await fetch("http://localhost:8000/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("Status:", res.status);
      console.log("Raw response:", await res.text());

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.detail || "Ошибка регистрации");
        return;
      }

      navigate("/login");
    } catch (error) {
      setServerError("Ошибка подключения к серверу");
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