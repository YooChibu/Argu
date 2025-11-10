import api from './api'

export const arguService = {
  async getAllArgus(page = 0, size = 20) {
    const response = await api.get('/argu', {
      params: { page, size },
    })
    return response.data
  },

  async getArguById(id) {
    const response = await api.get(`/argu/${id}`)
    return response.data
  },

  async createArgu(arguData) {
    const response = await api.post('/argu', arguData)
    return response.data
  },

  async deleteArgu(id) {
    const response = await api.delete(`/argu/${id}`)
    return response.data
  },

  async getArgusByCategory(categoryId, page = 0, size = 20) {
    const response = await api.get(`/argu/category/${categoryId}`, {
      params: { page, size },
    })
    return response.data
  },

  async searchArgus(keyword, page = 0, size = 20) {
    const response = await api.get('/argu/search', {
      params: { keyword, page, size },
    })
    return response.data
  },
}








