/**
 * 관리자 관리 서비스
 */

import api from './api'

export const getAdmins = async () => {
  const response = await api.get('/admin/admins')
  return response
}

export const getAdminDetail = async (id) => {
  const response = await api.get(`/admin/admins/${id}`)
  return response
}

export const createAdmin = async (data) => {
  const response = await api.post('/admin/admins', data)
  return response
}

export const updateAdmin = async (id, data) => {
  const { name, role, status } = data
  const response = await api.put(`/admin/admins/${id}`, null, {
    params: { name, role, status }
  })
  return response
}

export const updateAdminPassword = async (id, newPassword) => {
  const response = await api.put(`/admin/admins/${id}/password`, null, {
    params: { newPassword }
  })
  return response
}

export const deleteAdmin = async (id) => {
  const response = await api.delete(`/admin/admins/${id}`)
  return response
}

export const adminManagementService = {
  getAdmins,
  getAdminDetail,
  createAdmin,
  updateAdmin,
  updateAdminPassword,
  deleteAdmin
}

