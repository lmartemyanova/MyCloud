import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileCard from "./FileCard";
import UploadForm from "./UploadForm";
import "./storage.css";

const StoragePage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  const fetchFiles = async () => {
    const url = userId
      ? `http://localhost:8000/api/storage/user-files/?user_id=${userId}`
      : `http://localhost:8000/api/storage/my-files/`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка при загрузке файлов");

      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [userId]);

  return (
    <div className="storage-page">
      <h2>{userId ? "📁 Хранилище пользователя" : "📂 Мои файлы"}</h2>
      {!userId && <UploadForm onUpload={fetchFiles} />}
      {error && <p className="error">{error}</p>}
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