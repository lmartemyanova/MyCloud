import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicDownloadPage = () => {
  const { uuid } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/storage/public/${uuid}/`);
        if (!res.ok) throw new Error("Файл не найден");

        const blob = await res.blob();
        const contentDisposition = res.headers.get("Content-Disposition");
        const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
        const filename = filenameMatch?.[1] || "downloaded-file";

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        setError("Файл не найден или срок действия ссылки истёк");
      }
    };

    fetchFile();
  }, [uuid]);

  return (
    <div style={{ padding: "2rem" }}>
      {error ? <h2>{error}</h2> : <h2>Загрузка файла...</h2>}
    </div>
  );
};

export default PublicDownloadPage;