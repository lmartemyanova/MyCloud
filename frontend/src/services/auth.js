import { request } from './api';

export const login = (credentials) => request('/users/token/', 'POST', credentials);

export const refreshToken = (refresh) =>
  request('/users/token/refresh/', 'POST', { refresh });

export const register = (userData) =>
  request('/users/register/', 'POST', userData);

export const logout = (token) =>
  request('/users/logout/', 'POST', null, token);

export const getProfile = (token) =>
  request('/users/me/', 'GET', null, token);