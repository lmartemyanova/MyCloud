import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractFilename } from "../utils/extractFilename";
import { getPublicFileMetadata } from "../services/files";
import FilePreview from "../components/FilePreview";
import "../styles/public.css";


const PublicDownloadPage = () => {
  const { uuid } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await getPublicFileMetadata(uuid);
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
      const filename = extractFilename(contentDisposition, file.original_name || "downloaded-file");

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
    <div className="public-download">
      <h2>📄 {file.original_name}</h2>
      <p>Комментарий: {file.comment || "—"}</p>
      <p>Размер: {(file.size / 1024).toFixed(2)} КБ</p>
      <div className="actions">
      <button onClick={() => setPreviewOpen(true)}>👁 Предпросмотр</button>
        {previewOpen && (
          <div className="preview-modal">
            <button onClick={() => setPreviewOpen(false)}>❌ Закрыть</button>
            <FilePreview file={file} isPublic={true} />
          </div>
        )}

      <button onClick={handleDownload}>⬇️ Скачать файл</button>
      </div>
    </div>
  );
};

export default PublicDownloadPage;