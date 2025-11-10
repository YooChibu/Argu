import api from './api'

export const commentService = {
  async getCommentsByArgu(arguId, page = 0, size = 20) {
    const response = await api.get(`/comments/argu/${arguId}`, {
      params: { page, size },
    })
    return response.data
  },

  async createComment(commentData) {
    const response = await api.post('/comments', commentData)
    return response.data
  },

  async deleteComment(id) {
    const response = await api.delete(`/comments/${id}`)
    return response.data
  },
}








