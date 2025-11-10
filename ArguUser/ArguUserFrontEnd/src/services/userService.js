import api from './api'

export const userService = {
  async getUserById(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  async getUserByUsername(username) {
    const response = await api.get(`/users/username/${username}`)
    return response.data
  },

  async updateProfile(nickname, bio, profileImage) {
    const response = await api.put('/users/me', null, {
      params: { nickname, bio, profileImage },
    })
    return response.data
  },
}








