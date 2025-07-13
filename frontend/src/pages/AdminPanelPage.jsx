import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUserById,
  toggleAdminStatus,
} from "../services/users";
import "../styles/admin.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("full_name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      const sorted = [...data].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
  
        if (sortBy === "full_name") {
          valA = a.full_name?.toLowerCase();
          valB = b.full_name?.toLowerCase();
        }
  
        if (sortBy === "is_admin") {
          valA = a.is_admin ? 1 : 0;
          valB = b.is_admin ? 1 : 0;
        }
  
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setUsers(sorted);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sortBy, sortOrder]);

  const toggleAdmin = async (id) => {
    try {
      await toggleAdminStatus(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Не удалось изменить статус администратора");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Удалить пользователя?")) return;

    try {
      await deleteUserById(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Ошибка удаления");
    }
  };

  const openStorage = (userId) => {
    navigate(`/storage?user_id=${userId}`);
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="admin-panel">
      <h2>👑 Панель администратора</h2>
      <div className="controls">
        <label>
          Сортировка:{" "}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="full_name">По имени</option>
            <option value="storage_size">По размеру хранилища</option>
            <option value="is_admin">По статусу администратора</option>
          </select>
        </label>{" "}
        <label>
          Порядок:{" "}
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">↑ по возрастанию</option>
            <option value="desc">↓ по убыванию</option>
          </select>
        </label>
      </div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Логин</th>
            <th>Email</th>
            <th>Админ</th>
            <th>Файлы</th>
            <th>Размер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.full_name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.is_admin ? "✔️" : "—"}</td>
              <td>{u.file_count}</td>
              <td>{(u.storage_size / 1024).toFixed(2)} КБ</td>
              <td>
                <button onClick={() => toggleAdmin(u.id)}>
                  {u.is_admin ? "Разжаловать" : "Сделать админом"}
                </button>{" "}
                <button onClick={() => openStorage(u.id)}>📁 Хранилище</button>{" "}
                <button onClick={() => deleteUser(u.id)}>🗑 Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;