import api from './api'

export const opinionService = {
  async createOpinion(opinionData) {
    const response = await api.post('/opinions', opinionData)
    return response.data
  },

  async getOpinionsByArgu(arguId) {
    const response = await api.get(`/opinions/argu/${arguId}`)
    return response.data
  },
}








