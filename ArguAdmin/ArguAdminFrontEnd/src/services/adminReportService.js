/**
 * 관리자 신고 관리 서비스
 */

import api from './api'

export const getReports = async (params = {}) => {
  const { status, page = 0, size = 20 } = params
  const response = await api.get('/admin/reports', {
    params: { status, page, size }
  })
  return response
}

export const getReportDetail = async (id) => {
  const response = await api.get(`/admin/reports/${id}`)
  return response
}

export const processReport = async (id, status) => {
  const response = await api.put(`/admin/reports/${id}/process`, null, {
    params: { status }
  })
  return response
}

export const adminReportService = {
  getReports,
  getReportDetail,
  processReport
}

