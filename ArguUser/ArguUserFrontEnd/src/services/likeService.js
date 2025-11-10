import api from './api'

export const likeService = {
  async toggleLike(arguId) {
    const response = await api.post(`/likes/argu/${arguId}`)
    return response.data
  },

  async isLiked(arguId) {
    const response = await api.get(`/likes/argu/${arguId}`)
    return response.data
  },
}








