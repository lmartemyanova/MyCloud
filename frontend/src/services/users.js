import { request } from './api';

export const getAllUsers = (token) =>
  request('/users/users/', 'GET', null, token);

export const deleteUserById = (id, token) =>
  request(`/users/users/${id}/`, 'DELETE', null, token);

export const toggleAdminStatus = (id, token) =>
  request(`/users/users/${id}/toggle-admin/`, 'PATCH', null, token);