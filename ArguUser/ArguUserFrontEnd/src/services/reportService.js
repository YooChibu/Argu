import api from './api'

export const reportService = {
  async createReport(reportData) {
    const response = await api.post('/reports', reportData)
    return response.data
  },
}








