import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUserById,
  toggleAdminStatus,
} from "../services/users";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      // const token = localStorage.getItem("token");
      // const data = await getAllUsers(token);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // await toggleAdminStatus(id, token);
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
      // const token = localStorage.getItem("token");
      // await deleteUserById(id, token);
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
    <div style={{ padding: "2rem" }}>
      <h2>👑 Панель администратора</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
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