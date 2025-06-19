import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import UploadForm from "./UploadForm";
import "./storage.css";

const StoragePage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/storage/my-files/", {
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
  }, []);

  return (
    <div className="storage-page">
      <h2>📂 Мои файлы</h2>
      <UploadForm onUpload={fetchFiles} />
      {error && <p className="error">{error}</p>}
      <div className="file-list">
        {files.length > 0 ? (
          files.map((file) => <FileCard key={file.id} file={file} onAction={fetchFiles} />)
        ) : (
          <p>Нет загруженных файлов.</p>
        )}
      </div>
    </div>
  );
};

export default StoragePage;