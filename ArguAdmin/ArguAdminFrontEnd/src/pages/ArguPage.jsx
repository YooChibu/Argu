/**
 * 논쟁 관리 페이지
 * 
 * 논쟁 목록 조회, 검색/필터링, 수정/삭제, 숨김 처리, 상태 변경 기능을 제공합니다.
 */

import { useEffect, useState } from 'react'
import { adminArguService } from '../services/adminArguService'
import { format } from 'date-fns'
import './ArguPage.css'

const ArguPage = () => {
  const [argus, setArgus] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [hiddenFilter, setHiddenFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [selectedArgu, setSelectedArgu] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    loadArgus()
  }, [currentPage, statusFilter, hiddenFilter])

  const loadArgus = async () => {
    try {
      setLoading(true)
      const response = await adminArguService.getArgus({
        keyword: searchKeyword || undefined,
        status: statusFilter || undefined,
        isHidden: hiddenFilter || undefined,
        page: currentPage,
        size: 20
      })

      const data = response.data?.data || response.data || response
      if (data.content) {
        setArgus(data.content)
        setTotalPages(data.totalPages || 0)
        setTotalElements(data.totalElements || 0)
      } else if (Array.isArray(data)) {
        setArgus(data)
        setTotalPages(1)
        setTotalElements(data.length)
      }
    } catch (error) {
      console.error('논쟁 목록 로딩 실패:', error)
      alert('논쟁 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(0)
    loadArgus()
  }

  const handleViewDetail = async (id) => {
    try {
      const response = await adminArguService.getArguDetail(id)
      const data = response.data?.data || response.data || response
      setSelectedArgu(data)
      setShowDetailModal(true)
    } catch (error) {
      console.error('논쟁 상세 조회 실패:', error)
      alert('논쟁 정보를 불러오는데 실패했습니다.')
    }
  }

  const handleEdit = (argu) => {
    setSelectedArgu(argu)
    setEditFormData({
      title: argu.title || '',
      content: argu.content || '',
      startDate: argu.startDate
        ? format(new Date(argu.startDate), "yyyy-MM-dd'T'HH:mm")
        : '',
      endDate: argu.endDate
        ? format(new Date(argu.endDate), "yyyy-MM-dd'T'HH:mm")
        : ''
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    if (!selectedArgu) return

    try {
      await adminArguService.updateArgu(selectedArgu.id, editFormData)
      alert('논쟁이 수정되었습니다.')
      loadArgus()
      setShowEditModal(false)
    } catch (error) {
      console.error('논쟁 수정 실패:', error)
      alert('논쟁 수정에 실패했습니다.')
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`논쟁 상태를 ${getStatusLabel(newStatus)}로 변경하시겠습니까?`)) {
      return
    }

    try {
      await adminArguService.updateArguStatus(id, newStatus)
      alert('논쟁 상태가 변경되었습니다.')
      loadArgus()
    } catch (error) {
      console.error('논쟁 상태 변경 실패:', error)
      alert('논쟁 상태 변경에 실패했습니다.')
    }
  }

  const handleToggleHidden = async (id) => {
    try {
      await adminArguService.toggleArguHidden(id)
      alert('숨김 상태가 변경되었습니다.')
      loadArgus()
    } catch (error) {
      console.error('숨김 상태 변경 실패:', error)
      alert('숨김 상태 변경에 실패했습니다.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 논쟁을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      await adminArguService.deleteArgu(id)
      alert('논쟁이 삭제되었습니다.')
      loadArgus()
    } catch (error) {
      console.error('논쟁 삭제 실패:', error)
      alert('논쟁 삭제에 실패했습니다.')
    }
  }

  const getStatusLabel = (status) => {
    const statusMap = {
      SCHEDULED: '예정',
      ACTIVE: '진행중',
      ENDED: '종료'
    }
    return statusMap[status] || status
  }

  const getStatusBadgeClass = (status) => {
    const classMap = {
      SCHEDULED: 'status-scheduled',
      ACTIVE: 'status-active',
      ENDED: 'status-ended'
    }
    return classMap[status] || ''
  }

  return (
    <div className="argu-page">
      {/* 검색 및 필터 */}
      <div className="page-header">
        <h1>논쟁 관리</h1>
        <div className="search-filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="제목 또는 내용으로 검색..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(0)
            }}
          >
            <option value="">전체 상태</option>
            <option value="SCHEDULED">예정</option>
            <option value="ACTIVE">진행중</option>
            <option value="ENDED">종료</option>
          </select>
          <select
            className="filter-select"
            value={hiddenFilter}
            onChange={(e) => {
              setHiddenFilter(e.target.value)
              setCurrentPage(0)
            }}
          >
            <option value="">전체</option>
            <option value="false">공개</option>
            <option value="true">숨김</option>
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>

      {/* 논쟁 목록 */}
      <div className="content-card">
        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : (
          <>
            <div className="table-info">
              <span>총 {totalElements}개</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>상태</th>
                  <th>시작일시</th>
                  <th>종료일시</th>
                  <th>조회수</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {argus.length > 0 ? (
                  argus.map((argu) => (
                    <tr key={argu.id} className={argu.isHidden ? 'hidden-row' : ''}>
                      <td>{argu.id}</td>
                      <td>
                        <div className="title-cell">
                          {argu.isHidden && <span className="hidden-badge">숨김</span>}
                          {argu.title}
                        </div>
                      </td>
                      <td>{argu.user?.nickname || argu.userId || '-'}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(argu.status)}`}>
                          {getStatusLabel(argu.status)}
                        </span>
                      </td>
                      <td>
                        {argu.startDate
                          ? format(new Date(argu.startDate), 'yyyy-MM-dd HH:mm')
                          : '-'}
                      </td>
                      <td>
                        {argu.endDate
                          ? format(new Date(argu.endDate), 'yyyy-MM-dd HH:mm')
                          : '-'}
                      </td>
                      <td>{argu.viewCount || 0}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleViewDetail(argu.id)}
                          >
                            상세
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(argu)}
                          >
                            수정
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleToggleHidden(argu.id)}
                          >
                            {argu.isHidden ? '공개' : '숨김'}
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(argu.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                      논쟁이 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 페이징 */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                >
                  이전
                </button>
                <span className="page-info">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                  }
                  disabled={currentPage >= totalPages - 1}
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 논쟁 상세 모달 */}
      {showDetailModal && selectedArgu && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>논쟁 상세 정보</h2>
              <button
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>ID:</label>
                <span>{selectedArgu.id}</span>
              </div>
              <div className="detail-row">
                <label>제목:</label>
                <span>{selectedArgu.title}</span>
              </div>
              <div className="detail-row">
                <label>내용:</label>
                <div className="content-display">{selectedArgu.content}</div>
              </div>
              <div className="detail-row">
                <label>작성자:</label>
                <span>{selectedArgu.user?.nickname || selectedArgu.userId || '-'}</span>
              </div>
              <div className="detail-row">
                <label>상태:</label>
                <span className={`status-badge ${getStatusBadgeClass(selectedArgu.status)}`}>
                  {getStatusLabel(selectedArgu.status)}
                </span>
              </div>
              <div className="detail-row">
                <label>숨김 여부:</label>
                <span>{selectedArgu.isHidden ? '숨김' : '공개'}</span>
              </div>
              <div className="detail-row">
                <label>시작일시:</label>
                <span>
                  {selectedArgu.startDate
                    ? format(new Date(selectedArgu.startDate), 'yyyy-MM-dd HH:mm:ss')
                    : '-'}
                </span>
              </div>
              <div className="detail-row">
                <label>종료일시:</label>
                <span>
                  {selectedArgu.endDate
                    ? format(new Date(selectedArgu.endDate), 'yyyy-MM-dd HH:mm:ss')
                    : '-'}
                </span>
              </div>
              <div className="detail-row">
                <label>조회수:</label>
                <span>{selectedArgu.viewCount || 0}</span>
              </div>
              <div className="detail-row">
                <label>생성일시:</label>
                <span>
                  {selectedArgu.createdAt
                    ? format(new Date(selectedArgu.createdAt), 'yyyy-MM-dd HH:mm:ss')
                    : '-'}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetailModal(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 논쟁 수정 모달 */}
      {showEditModal && selectedArgu && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>논쟁 수정</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>제목:</label>
                <input
                  type="text"
                  className="form-input"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>내용:</label>
                <textarea
                  className="form-textarea"
                  rows="10"
                  value={editFormData.content}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, content: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>시작일시:</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={editFormData.startDate}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>종료일시:</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={editFormData.endDate}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                취소
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArguPage
