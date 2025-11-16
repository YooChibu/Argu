/**
 * 관리자 관리 페이지
 * 
 * 관리자 목록, 생성/수정/삭제, 권한 관리 기능을 제공합니다.
 */

import { useEffect, useState } from 'react'
import { adminManagementService } from '../services/adminManagementService'
import { format } from 'date-fns'
import './AdminsPage.css'

const AdminsPage = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [formData, setFormData] = useState({
    adminId: '',
    password: '',
    name: '',
    role: 'ADMIN'
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    try {
      setLoading(true)
      const response = await adminManagementService.getAdmins()
      const data = response.data?.data || response.data || response
      if (Array.isArray(data)) {
        setAdmins(data)
      }
    } catch (error) {
      console.error('관리자 목록 로딩 실패:', error)
      alert('관리자 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      adminId: '',
      password: '',
      name: '',
      role: 'ADMIN'
    })
    setShowCreateModal(true)
  }

  const handleEdit = (admin) => {
    setSelectedAdmin(admin)
    setFormData({
      adminId: admin.adminId || '',
      password: '',
      name: admin.name || '',
      role: admin.role || 'ADMIN'
    })
    setShowEditModal(true)
  }

  const handleChangePassword = (admin) => {
    setSelectedAdmin(admin)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowPasswordModal(true)
  }

  const handleCreateSubmit = async () => {
    if (!formData.adminId.trim() || !formData.password.trim() || !formData.name.trim()) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    try {
      await adminManagementService.createAdmin(formData)
      alert('관리자가 생성되었습니다.')
      loadAdmins()
      setShowCreateModal(false)
    } catch (error) {
      console.error('관리자 생성 실패:', error)
      alert('관리자 생성에 실패했습니다.')
    }
  }

  const handleUpdateSubmit = async () => {
    if (!formData.adminId.trim() || !formData.name.trim()) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    if (!selectedAdmin) return

    try {
      await adminManagementService.updateAdmin(selectedAdmin.id, formData)
      alert('관리자 정보가 수정되었습니다.')
      loadAdmins()
      setShowEditModal(false)
    } catch (error) {
      console.error('관리자 수정 실패:', error)
      alert('관리자 수정에 실패했습니다.')
    }
  }

  const handlePasswordSubmit = async () => {
    if (!passwordData.newPassword.trim()) {
      alert('새 비밀번호를 입력해주세요.')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.')
      return
    }

    if (!selectedAdmin) return

    try {
      await adminManagementService.updateAdminPassword(
        selectedAdmin.id,
        passwordData.newPassword
      )
      alert('비밀번호가 변경되었습니다.')
      setShowPasswordModal(false)
    } catch (error) {
      console.error('비밀번호 변경 실패:', error)
      alert('비밀번호 변경에 실패했습니다.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 관리자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      await adminManagementService.deleteAdmin(id)
      alert('관리자가 삭제되었습니다.')
      loadAdmins()
    } catch (error) {
      console.error('관리자 삭제 실패:', error)
      alert('관리자 삭제에 실패했습니다.')
    }
  }

  const getRoleLabel = (role) => {
    const roleMap = {
      SUPER_ADMIN: '슈퍼 관리자',
      ADMIN: '일반 관리자'
    }
    return roleMap[role] || role
  }

  const getRoleBadgeClass = (role) => {
    return role === 'SUPER_ADMIN' ? 'role-super' : 'role-admin'
  }

  const getStatusLabel = (status) => {
    const statusMap = {
      ACTIVE: '활성',
      INACTIVE: '비활성'
    }
    return statusMap[status] || status
  }

  return (
    <div className="admins-page">
      {/* 헤더 */}
      <div className="page-header">
        <h1>관리자 관리</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + 관리자 추가
        </button>
      </div>

      {/* 관리자 목록 */}
      <div className="content-card">
        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : (
          <>
            <div className="table-info">
              <span>총 {admins.length}명</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>관리자 ID</th>
                  <th>이름</th>
                  <th>권한</th>
                  <th>상태</th>
                  <th>생성일시</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>{admin.adminId}</td>
                      <td>{admin.name}</td>
                      <td>
                        <span className={`role-badge ${getRoleBadgeClass(admin.role)}`}>
                          {getRoleLabel(admin.role)}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge">
                          {getStatusLabel(admin.status)}
                        </span>
                      </td>
                      <td>
                        {admin.createdAt
                          ? format(new Date(admin.createdAt), 'yyyy-MM-dd HH:mm')
                          : '-'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(admin)}
                          >
                            수정
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleChangePassword(admin)}
                          >
                            비밀번호
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(admin.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                      관리자가 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* 관리자 생성 모달 */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>관리자 생성</h2>
              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>관리자 ID *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.adminId}
                  onChange={(e) =>
                    setFormData({ ...formData, adminId: e.target.value })
                  }
                  placeholder="관리자 아이디"
                />
              </div>
              <div className="form-group">
                <label>비밀번호 *</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="비밀번호"
                />
              </div>
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="관리자 이름"
                />
              </div>
              <div className="form-group">
                <label>권한</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="ADMIN">일반 관리자</option>
                  <option value="SUPER_ADMIN">슈퍼 관리자</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                취소
              </button>
              <button className="btn btn-primary" onClick={handleCreateSubmit}>
                생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 수정 모달 */}
      {showEditModal && selectedAdmin && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>관리자 수정</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>관리자 ID *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.adminId}
                  onChange={(e) =>
                    setFormData({ ...formData, adminId: e.target.value })
                  }
                  placeholder="관리자 아이디"
                />
              </div>
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="관리자 이름"
                />
              </div>
              <div className="form-group">
                <label>권한</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="ADMIN">일반 관리자</option>
                  <option value="SUPER_ADMIN">슈퍼 관리자</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                취소
              </button>
              <button className="btn btn-primary" onClick={handleUpdateSubmit}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && selectedAdmin && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>비밀번호 변경</h2>
              <button
                className="modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>관리자:</label>
                <span>{selectedAdmin.name} ({selectedAdmin.adminId})</span>
              </div>
              <div className="form-group">
                <label>새 비밀번호 *</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  placeholder="새 비밀번호"
                />
              </div>
              <div className="form-group">
                <label>비밀번호 확인 *</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })
                  }
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                취소
              </button>
              <button className="btn btn-primary" onClick={handlePasswordSubmit}>
                변경
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminsPage
