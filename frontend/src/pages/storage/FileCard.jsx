const FileCard = ({ file, onAction }) => {
    // const downloadUrl = `http://localhost:8000/api/storage/download/${file.uuid}/`;
    const publicUrl = `http://localhost:8000/api/storage/public/${file.unique_link}/`;
  
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
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        link.click();
        window.URL.revokeObjectURL(url);
    
        await fetch(`http://localhost:8000/api/storage/mark-downloaded/${file.id}/`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        onAction(); 
      } 
      catch (err) {
        console.error(err);
        alert("Не удалось скачать файл");
      }
    };    
  
    return (
      <div className="file-card">
        <h4>{file.original_name}</h4>
        <p>Комментарий: {file.comment || "–"}</p>
        <p>Размер: {(file.size / 1024).toFixed(2)} КБ</p>
        <p>Загружен: {new Date(file.uploaded_at).toLocaleString()}</p>
        <p>Последнее скачивание: {file.last_downloaded_at ? new Date(file.last_downloaded_at).toLocaleString() : "—"}</p>
        <div className="actions">
          <button onClick={handleDownload}>Скачать</button>
          <button onClick={() => navigator.clipboard.writeText(publicUrl)}>🔗 Скопировать ссылку</button>
          <button onClick={handleDelete}>🗑 Удалить</button>
        </div>
      </div>
    );
  };
  
  export default FileCard;