/**
 * 관리자 통계 서비스
 */

import api from './api'

export const getUserStatistics = async () => {
  const response = await api.get('/admin/statistics/users')
  return response
}

export const getArguStatistics = async () => {
  const response = await api.get('/admin/statistics/argus')
  return response
}

export const getDailyUserRegistrations = async (days = 7) => {
  const response = await api.get('/admin/statistics/users/daily', {
    params: { days }
  })
  return response
}

export const getDailyArguCreations = async (days = 7) => {
  const response = await api.get('/admin/statistics/argus/daily', {
    params: { days }
  })
  return response
}

export const adminStatisticsService = {
  getUserStatistics,
  getArguStatistics,
  getDailyUserRegistrations,
  getDailyArguCreations
}

