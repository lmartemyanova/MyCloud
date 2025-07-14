import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const FilePreview = ({ file, isPublic = false }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [error, setError] = useState("");
  const extension = file.original_name.split(".").pop().toLowerCase();

  const previewUrl = isPublic
    ? `${API_BASE_URL}/storage/public-preview/${file.unique_link}/`
    : `${API_BASE_URL}/storage/preview/${file.unique_link}/`;

  const downloadUrl = isPublic
    ? `${API_BASE_URL}/storage/public/${file.unique_link}`
    : `${API_BASE_URL}/storage/download/${file.unique_link}/`;

  useEffect(() => {
    if (["doc", "docx", "xls", "xlsx"].includes(extension)) {
      // Google Docs Viewer обрабатывает URL напрямую, не нужен blob
      return;
    }

    const fetchBlob = async () => {
      try {
        const headers = {};
        if (!isPublic) {
          const token = localStorage.getItem("token");
          if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(previewUrl, { headers });
        if (!response.ok) throw new Error("Ошибка при получении предпросмотра");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (err) {
        console.error("Ошибка предпросмотра файла:", err);
        setError("Не удалось загрузить предпросмотр.");
      }
    };

    fetchBlob();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [previewUrl]);

  if (error) return <p>{error}</p>;
  if (!blobUrl && !["doc", "docx", "xls", "xlsx"].includes(extension))
    return <p>Загрузка предпросмотра...</p>;

  if (["png", "jpg", "jpeg", "heic"].includes(extension)) {
    return <img src={blobUrl} alt="preview" style={{ maxWidth: "100%" }} />;
  }

  if (["pdf", "txt"].includes(extension)) {
    return (
      <iframe
        src={blobUrl}
        width="100%"
        height="500px"
        title="Preview"
        style={{ border: "none" }}
      />
    );
  }

  if (["mov", "mp4"].includes(extension)) {
    return <video src={blobUrl} controls width="100%" />;
  }

  if (["doc", "docx", "xls", "xlsx"].includes(extension)) {
    return (
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`}
        width="100%"
        height="500px"
        title="Office Preview"
      />
    );
  }

  return (
    <p>
      Невозможно открыть файл в браузере.{" "}
      <a href={downloadUrl} target="_blank" rel="noreferrer">
        Скачайте
      </a>{" "}
      для просмотра.
    </p>
  );
};

export default FilePreview;