import { useState } from "react";
import { uploadFile } from "../services/files";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Выберите файл");
      return;
    }

    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("comment", comment);
    formData.append("size", parseInt(file.size));
    formData.append("original_name", file.name);

    try {
        await uploadFile(formData);
        setFile(null);
        setComment("");
        onUpload();
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить файл");
      }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {file ? <p>📄 {file.name}</p> : <p>Перетащите файл сюда или выберите ниже</p>}
      </div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Загрузить</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UploadForm;