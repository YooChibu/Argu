/**
 * 관리자 카테고리 관리 서비스
 */

import api from './api'

export const getCategories = async () => {
  const response = await api.get('/admin/categories')
  return response
}

export const getCategoryDetail = async (id) => {
  const response = await api.get(`/admin/categories/${id}`)
  return response
}

export const createCategory = async (data) => {
  const { name, description, orderNum } = data
  const response = await api.post('/admin/categories', null, {
    params: { name, description, orderNum }
  })
  return response
}

export const updateCategory = async (id, data) => {
  const { name, description, orderNum } = data
  const response = await api.put(`/admin/categories/${id}`, null, {
    params: { name, description, orderNum }
  })
  return response
}

export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`)
  return response
}

export const adminCategoryService = {
  getCategories,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory
}

