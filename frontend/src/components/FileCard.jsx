import { useState } from "react";
import { extractFilename } from "../utils/extractFilename";
import {
  deleteFile,
  updateComment,
  markAsDownloaded,
  renameFile 
} from "../services/files";
import "../styles/storage.css";
import FilePreview from "./FilePreview";
import { preserveFileExtension } from "../utils/filename";

const FileCard = ({ file, onAction }) => {
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(file.original_name);
    
    const [editingComment, setEditingComment] = useState(false);
    const [newComment, setNewComment] = useState(file.comment || "");

    const [previewOpen, setPreviewOpen] = useState(false);

    const publicUrl = `http://localhost:5173/public/${file.unique_link}`;

  
    const handleDelete = async () => {
      const confirmed = window.confirm("Удалить файл?");
      if (!confirmed) return;
  
      await deleteFile(file.id);
  
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
    
        await markAsDownloaded(file.id);
    
        onAction();
      } catch (err) {
        console.error(err);
        alert("Не удалось скачать файл");
      }
    };


    const handleRename = async () => {
      try {
        const fixedName = preserveFileExtension(file.original_name, newName);
        await renameFile(file.id, fixedName);
        setEditingName(false);
        onAction();
      } catch {
        alert("Не удалось переименовать файл");
      }
    };


    const handleCommentSave = async () => {
      try {
        await updateComment(file.id, newComment);
          setEditingComment(false);
          onAction();
        } catch {
          alert("Не удалось сохранить комментарий");
        }
    };
  

    return (
      <div className="file-card">
        {editingName ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleRename}>💾 Сохранить</button>
            <button
              onClick={() => {
                setEditingName(false);
                setNewName(file.original_name); 
              }}
            >
              ✖
            </button>
          </>
        ) : (
          <h4>
            {file.original_name}{" "}
            <button onClick={() => setEditingName(true)}>✏️</button>
          </h4>
        )}

        {editingComment ? (
          <>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSave}>💾 Сохранить</button>
            <button
              onClick={() => {
                setEditingComment(false);
                setNewComment(file.comment);
              }}
            >
              ✖
            </button>
          </>
        ) : (
          <p>
            Комментарий: {file.comment || "–"}{" "}
            <button onClick={() => setEditingComment(true)}>✏️</button>
          </p>
        )}
      
        <p>Размер: {(file.size / 1024).toFixed(2)} КБ</p>
        <p>Загружен: {new Date(file.uploaded_at).toLocaleString()}</p>
        <p>Последнее скачивание: {file.last_downloaded_at 
          ? new Date(file.last_downloaded_at).toLocaleString() 
          : "—"}
        </p>
        <div className="actions">
        
          <button onClick={() => setPreviewOpen(true)}>👁 Предпросмотр</button>
          {previewOpen && (
            <div className="preview-modal">
              <button onClick={() => setPreviewOpen(false)}>❌ Закрыть</button>
              <FilePreview file={file} isPublic={false} />
            </div>
          )}

          <button onClick={handleDownload}>⬇️ Скачать</button>
          <button onClick={() => navigator.clipboard.writeText(publicUrl)}>🔗 Скопировать ссылку</button>
          <button onClick={handleDelete}>🗑 Удалить</button>
        </div>
      </div>
    );
  };
  
  export default FileCard;