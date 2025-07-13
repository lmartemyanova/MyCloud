import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileCard from "../components/FileCard";
import UploadForm from "../components/UploadForm";
import "../styles/storage.css";
import { getFiles, getUserFiles } from "../services/files";

const StoragePage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  const fetchFiles = async () => {

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Требуется авторизация");
      const data = userId
        ? await getUserFiles(token, userId)
        : await getFiles(token);

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