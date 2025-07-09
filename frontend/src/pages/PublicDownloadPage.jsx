import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicDownloadPage = () => {
  const { uuid } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/storage/public/${uuid}/metadata/`);
        if (!res.ok) throw new Error("Файл не найден");
        const data = await res.json();
        setFile(data);
      } catch (err) {
        setError("Файл не найден или недоступен");
      }
    };

    fetchFile();
  }, [uuid]);


  const handleDownload = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/storage/public/${uuid}`);
      if (!res.ok) throw new Error("Ошибка скачивания");

      const blob = await res.blob();

      const contentDisposition = res.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
      const filename = filenameMatch?.[1] ? decodeURIComponent(filenameMatch[1]) : "downloaded-file";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Файл не найден или срок действия ссылки истёк");
    }
  };

  if (error) return <div>{error}</div>;

  if (!file) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>📄 {file.original_name}</h2>
      <p>Комментарий: {file.comment || "—"}</p>
      <p>Размер: {(file.size / 1024).toFixed(2)} КБ</p>
      <button onClick={handleDownload}>⬇️ Скачать файл</button>
    </div>
  );
};

export default PublicDownloadPage;