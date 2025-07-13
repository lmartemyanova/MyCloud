import { request } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const uploadFile = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/storage/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Ошибка загрузки:", text);
    throw new Error('Ошибка при загрузке файла');
  }

  return await response.json();
};

export const getFiles = (token) =>
  request('/storage/my-files/', 'GET', null, token);

export const deleteFile = (id, token) =>
  request(`/storage/delete/${id}/`, 'DELETE', null, token);

export const renameFile = (id, name, token) =>
  request(`/storage/rename/${id}/`, 'PATCH', { name }, token);

export const updateComment = (id, comment, token) =>
  request(`/storage/comment/${id}/`, 'PATCH', { comment }, token);

export const getPublicFileMetadata = (uuid) =>
  request(`/storage/public/${uuid}/metadata/`);

export const markAsDownloaded = (id, token) =>
  request(`/storage/mark-downloaded/${id}/`, 'PATCH', null, token);

export const getUserFiles = (token, userId) =>
  request(`/storage/user-files/?user_id=${userId}`, 'GET', null, token);