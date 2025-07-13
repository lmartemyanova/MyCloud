import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import FileCard from "../components/FileCard";
import UploadForm from "../components/UploadForm";
import { getFiles, getUserFiles } from "../services/files";
import "../styles/storage.css";

const StoragePage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("uploaded_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  const fetchFiles = useCallback(async () => {

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Требуется авторизация");
      const data = userId
        ? await getUserFiles(token, userId)
        : await getFiles(token);
      
      const sorted = [...data].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
  
        if (sortBy === "original_name") {
          valA = valA?.toLowerCase();
          valB = valB?.toLowerCase();
        }
  
        if (sortBy === "uploaded_at") {
          valA = new Date(valA);
          valB = new Date(valB);
        }
  
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setFiles(sorted);
    } catch (err) {
      setError(err.message);
    }
  }, [userId, sortBy, sortOrder]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="storage-page">
      <h2>{userId ? "📁 Хранилище пользователя" : "📂 Мои файлы"}</h2>
      {!userId && <UploadForm onUpload={fetchFiles} />}
      {error && <p className="error">{error}</p>}
      <div className="sorting">
        <label>
          Сортировка:{" "}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="uploaded_at">По дате загрузки</option>
            <option value="original_name">По имени</option>
            <option value="size">По размеру</option>
          </select>
        </label>
        <label>
          Порядок:{" "}
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">↑ по возрастанию</option>
            <option value="desc">↓ по убыванию</option>
          </select>
        </label>
      </div>
      <div className="file-list">
        {files.length > 0 ? (
          files.map((file) => (
            <FileCard key={file.id} file={file} onAction={fetchFiles} />
          ))
        ) : (
          <p>Нет загруженных файлов.</p>
        )}
      </div>
    </div>
  );
};

export default StoragePage;