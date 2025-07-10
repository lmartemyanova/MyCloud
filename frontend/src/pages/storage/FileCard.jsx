import { useState } from "react";
import { extractFilename } from "../../utils/extractFilename";

const FileCard = ({ file, onAction }) => {
    const [editing, setEditing] = useState(false);
    const [newComment, setNewComment] = useState(file.comment || "");

    // const publicUrl = `http://localhost:8000/api/storage/public/${file.unique_link}/`;
    const publicUrl = `http://localhost:5173/public/${file.unique_link}`;

  
    const handleDelete = async () => {
      const confirmed = window.confirm("Удалить файл?");
      if (!confirmed) return;
  
      await fetch(`http://localhost:8000/api/storage/delete/${file.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      onAction();
    };

    const handleDownload = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/storage/download/${file.unique_link}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
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
    
        await fetch(`http://localhost:8000/api/storage/mark-downloaded/${file.id}/`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        onAction();
      } catch (err) {
        console.error(err);
        alert("Не удалось скачать файл");
      }
    };

    const handleCommentSave = async () => {
      const res = await fetch(`http://localhost:8000/api/storage/comment/${file.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });
  
      if (res.ok) {
        setEditing(false);
        onAction(); // обновим список
      } else {
        alert("Не удалось сохранить комментарий");
      }
    };
  
    return (
      <div className="file-card">
        <h4>{file.original_name}</h4>

        {editing ? (
          <>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSave}>💾 Сохранить</button>
          </>
        ) : (
          <p>
            Комментарий: {file.comment || "–"}{" "}
            <button onClick={() => setEditing(true)}>✏️</button>
          </p>
        )}
      
        <p>Размер: {(file.size / 1024).toFixed(2)} КБ</p>
        <p>Загружен: {new Date(file.uploaded_at).toLocaleString()}</p>
        <p>Последнее скачивание: {file.last_downloaded_at 
          ? new Date(file.last_downloaded_at).toLocaleString() 
          : "—"}
        </p>
        <div className="actions">
          <button onClick={handleDownload}>⬇️ Скачать</button>
          <button onClick={() => navigator.clipboard.writeText(publicUrl)}>🔗 Скопировать ссылку</button>
          <button onClick={handleDelete}>🗑 Удалить</button>
        </div>
      </div>
    );
  };
  
  export default FileCard;