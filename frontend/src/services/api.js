const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const request = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const finalToken = token || localStorage.getItem("token");

  if (finalToken) {
    headers['Authorization'] = `Bearer ${finalToken}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Произошла ошибка');
  }

  return result;
};
