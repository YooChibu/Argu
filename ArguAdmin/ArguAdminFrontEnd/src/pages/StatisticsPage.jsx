/**
 * 통계 및 분석 페이지
 * 
 * 회원 통계, 논쟁 통계, 일별 추이 등의 통계 데이터를 제공합니다.
 */

import { useEffect, useState } from 'react'
import { adminStatisticsService } from '../services/adminStatisticsService'
import { format } from 'date-fns'
import './StatisticsPage.css'

const StatisticsPage = () => {
  const [userStats, setUserStats] = useState(null)
  const [arguStats, setArguStats] = useState(null)
  const [dailyUsers, setDailyUsers] = useState([])
  const [dailyArgus, setDailyArgus] = useState([])
  const [loading, setLoading] = useState(true)
  const [daysFilter, setDaysFilter] = useState(7)

  useEffect(() => {
    loadStatistics()
  }, [daysFilter])

  const loadStatistics = async () => {
    try {
      setLoading(true)
      const [userStatsRes, arguStatsRes, dailyUsersRes, dailyArgusRes] =
        await Promise.all([
          adminStatisticsService.getUserStatistics(),
          adminStatisticsService.getArguStatistics(),
          adminStatisticsService.getDailyUserRegistrations(daysFilter),
          adminStatisticsService.getDailyArguCreations(daysFilter)
        ])

      setUserStats(userStatsRes.data?.data || userStatsRes.data || userStatsRes)
      setArguStats(arguStatsRes.data?.data || arguStatsRes.data || arguStatsRes)
      setDailyUsers(
        dailyUsersRes.data?.data || dailyUsersRes.data || dailyUsersRes || []
      )
      setDailyArgus(
        dailyArgusRes.data?.data || dailyArgusRes.data || dailyArgusRes || []
      )
    } catch (error) {
      console.error('통계 데이터 로딩 실패:', error)
      alert('통계 데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const getMaxValue = (data) => {
    if (!Array.isArray(data) || data.length === 0) return 1
    return Math.max(...data.map((item) => item.count || 0), 1)
  }

  const renderBarChart = (data, labelKey, valueKey) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div className="chart-empty">데이터가 없습니다</div>
    }

    const maxValue = getMaxValue(data)

    return (
      <div className="bar-chart">
        {data.map((item, index) => {
          const value = item[valueKey] || 0
          const percentage = (value / maxValue) * 100

          return (
            <div key={index} className="bar-item">
              <div className="bar-label">{item[labelKey]}</div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${percentage}%` }}
                  title={value}
                >
                  <span className="bar-value">{value}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return <div className="admin-loading">로딩 중...</div>
  }

  return (
    <div className="statistics-page">
      {/* 헤더 */}
      <div className="page-header">
        <h1>통계 및 분석</h1>
        <div className="filter-bar">
          <label>기간:</label>
          <select
            className="filter-select"
            value={daysFilter}
            onChange={(e) => setDaysFilter(parseInt(e.target.value))}
          >
            <option value="7">최근 7일</option>
            <option value="14">최근 14일</option>
            <option value="30">최근 30일</option>
            <option value="90">최근 90일</option>
          </select>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">전체 회원</div>
            <div className="stat-value">
              {userStats?.totalUsers || 0}
            </div>
            <div className="stat-detail">
              활성: {userStats?.activeUsers || 0} | 정지: {userStats?.suspendedUsers || 0}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <div className="stat-label">전체 논쟁</div>
            <div className="stat-value">
              {arguStats?.totalArgus || 0}
            </div>
            <div className="stat-detail">
              진행중: {arguStats?.activeArgus || 0} | 종료: {arguStats?.endedArgus || 0}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💭</div>
          <div className="stat-content">
            <div className="stat-label">전체 댓글</div>
            <div className="stat-value">
              {arguStats?.totalComments || 0}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👍</div>
          <div className="stat-content">
            <div className="stat-label">전체 좋아요</div>
            <div className="stat-value">
              {arguStats?.totalLikes || 0}
            </div>
          </div>
        </div>
      </div>

      {/* 일별 추이 차트 */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="card-header">
            <h3>일별 회원 가입 추이</h3>
          </div>
          <div className="chart-content">
            {renderBarChart(dailyUsers, 'date', 'count')}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>일별 논쟁 생성 추이</h3>
          </div>
          <div className="chart-content">
            {renderBarChart(dailyArgus, 'date', 'count')}
          </div>
        </div>
      </div>

      {/* 상세 통계 테이블 */}
      <div className="content-card">
        <h3>일별 상세 통계</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>회원 가입</th>
              <th>논쟁 생성</th>
            </tr>
          </thead>
          <tbody>
            {dailyUsers.length > 0 ? (
              dailyUsers.map((item, index) => {
                const arguItem = dailyArgus[index] || { count: 0 }
                return (
                  <tr key={index}>
                    <td>{item.date || '-'}</td>
                    <td>{item.count || 0}</td>
                    <td>{arguItem.count || 0}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>
                  데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StatisticsPage
