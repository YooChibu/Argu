/**
 * 관리자 대시보드 페이지
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminDashboardService } from '../services/adminDashboardService'
import { format } from 'date-fns'
import './DashboardPage.css'

const DashboardPage = () => {
  const [stats, setStats] = useState(null)
  const [recentUsers, setRecentUsers] = useState([])
  const [topArgus, setTopArgus] = useState([])
  const [pendingReports, setPendingReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsRes, usersRes, argusRes, reportsRes] = await Promise.all([
        adminDashboardService.getStats(),
        adminDashboardService.getRecentUsers(10),
        adminDashboardService.getTopArgus(5),
        adminDashboardService.getPendingReports(10)
      ])

      setStats(statsRes.data || statsRes)
      setRecentUsers(usersRes.data?.content || usersRes.data || usersRes || [])
      setTopArgus(argusRes.data?.content || argusRes.data || argusRes || [])
      setPendingReports(reportsRes.data?.content || reportsRes.data || reportsRes || [])
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="admin-loading">로딩 중...</div>
  }

  return (
    <div className="dashboard-page">
      {/* 통계 카드 */}
      <div className="stats-grid-admin">
        <div className="stat-card-admin">
          <div className="stat-icon-admin">👥</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">전체 회원</div>
            <div className="stat-value-admin">{stats?.totalUsers || 0}</div>
            <div className="stat-change positive">
              +{stats?.todayUsers || 0} 오늘
            </div>
          </div>
        </div>
        <div className="stat-card-admin">
          <div className="stat-icon-admin">💬</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">전체 논쟁</div>
            <div className="stat-value-admin">{stats?.totalArgus || 0}</div>
            <div className="stat-change positive">
              +{stats?.todayArgus || 0} 오늘
            </div>
          </div>
        </div>
        <div className="stat-card-admin">
          <div className="stat-icon-admin">💭</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">전체 댓글</div>
            <div className="stat-value-admin">{stats?.totalComments || 0}</div>
            <div className="stat-change positive">
              +{stats?.todayComments || 0} 오늘
            </div>
          </div>
        </div>
        <div className="stat-card-admin">
          <div className="stat-icon-admin">🔥</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">활성 논쟁</div>
            <div className="stat-value-admin">{stats?.activeArgus || 0}</div>
            <div className="stat-change neutral">진행중</div>
          </div>
        </div>
        <div className="stat-card-admin">
          <div className="stat-icon-admin">🚨</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">미처리 신고</div>
            <div className="stat-value-admin">{stats?.pendingReports || 0}</div>
            <div className="stat-change warning">처리 필요</div>
          </div>
        </div>
        <div className="stat-card-admin">
          <div className="stat-icon-admin">📊</div>
          <div className="stat-info-admin">
            <div className="stat-label-admin">오늘 방문자</div>
            <div className="stat-value-admin">{stats?.todayVisitors || 0}</div>
            <div className="stat-change positive">+234 어제 대비</div>
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>최근 가입 회원</h3>
            <Link to="/users" className="more-link">
              전체 보기 →
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>가입일시</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.nickname}</td>
                    <td>
                      {format(
                        new Date(user.createdAt),
                        'yyyy-MM-dd HH:mm'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    데이터가 없습니다
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>인기 논쟁 TOP 5</h3>
            <Link to="/argu" className="more-link">
              전체 보기 →
            </Link>
          </div>
          <div className="top-list">
            {topArgus.length > 0 ? (
              topArgus.map((argu, index) => (
                <div key={argu.id} className="top-item">
                  <span className="rank">{index + 1}</span>
                  <div className="top-content">
                    <div className="top-title">{argu.title}</div>
                    <div className="top-meta">
                      조회수: {argu.viewCount || 0} | 좋아요: {argu.likeCount || 0}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                데이터가 없습니다
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 미처리 신고 */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>미처리 신고 (우선 처리 필요)</h3>
          <Link to="/reports" className="more-link">
            전체 보기 →
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>신고일시</th>
              <th>신고자</th>
              <th>대상 타입</th>
              <th>신고 사유</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {pendingReports.length > 0 ? (
              pendingReports.map((report) => (
                <tr key={report.id} className="urgent">
                  <td>
                    {format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td>{report.reporter?.username || 'N/A'}</td>
                  <td>{report.targetType}</td>
                  <td>{report.reason}</td>
                  <td>
                    <Link
                      to={`/reports/${report.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      처리하기
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  처리할 신고가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardPage

