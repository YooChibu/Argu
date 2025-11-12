/**
 * 카테고리 관리 페이지
 * 
 * 카테고리 목록, 생성/수정/삭제, 순서 조정 기능을 제공합니다.
 */

import { useEffect, useState } from 'react'
import { adminCategoryService } from '../services/adminCategoryService'
import { format } from 'date-fns'
import './CategoriesPage.css'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    orderNum: 0
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await adminCategoryService.getCategories()
      const data = response.data?.data || response.data || response
      if (Array.isArray(data)) {
        // orderNum으로 정렬
        const sorted = [...data].sort((a, b) => (a.orderNum || 0) - (b.orderNum || 0))
        setCategories(sorted)
      }
    } catch (error) {
      console.error('카테고리 목록 로딩 실패:', error)
      alert('카테고리 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      name: '',
      description: '',
      orderNum: categories.length
    })
    setShowCreateModal(true)
  }

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name || '',
      description: category.description || '',
      orderNum: category.orderNum || 0
    })
    setShowEditModal(true)
  }

  const handleCreateSubmit = async () => {
    if (!formData.name.trim()) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }

    try {
      await adminCategoryService.createCategory(formData)
      alert('카테고리가 생성되었습니다.')
      loadCategories()
      setShowCreateModal(false)
    } catch (error) {
      console.error('카테고리 생성 실패:', error)
      alert('카테고리 생성에 실패했습니다.')
    }
  }

  const handleUpdateSubmit = async () => {
    if (!formData.name.trim()) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }

    if (!selectedCategory) return

    try {
      await adminCategoryService.updateCategory(selectedCategory.id, formData)
      alert('카테고리가 수정되었습니다.')
      loadCategories()
      setShowEditModal(false)
    } catch (error) {
      console.error('카테고리 수정 실패:', error)
      alert('카테고리 수정에 실패했습니다.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      await adminCategoryService.deleteCategory(id)
      alert('카테고리가 삭제되었습니다.')
      loadCategories()
    } catch (error) {
      console.error('카테고리 삭제 실패:', error)
      alert('카테고리 삭제에 실패했습니다.')
    }
  }

  const handleOrderChange = async (id, newOrder) => {
    try {
      const category = categories.find((c) => c.id === id)
      if (!category) return

      await adminCategoryService.updateCategory(id, {
        name: category.name,
        description: category.description,
        orderNum: newOrder
      })
      loadCategories()
    } catch (error) {
      console.error('순서 변경 실패:', error)
      alert('순서 변경에 실패했습니다.')
    }
  }

  return (
    <div className="categories-page">
      {/* 헤더 */}
      <div className="page-header">
        <h1>카테고리 관리</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + 카테고리 추가
        </button>
      </div>

      {/* 카테고리 목록 */}
      <div className="content-card">
        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : (
          <>
            <div className="table-info">
              <span>총 {categories.length}개</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>순서</th>
                  <th>ID</th>
                  <th>이름</th>
                  <th>설명</th>
                  <th>생성일시</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>
                        <div className="order-controls">
                          <button
                            className="btn-icon"
                            onClick={() => handleOrderChange(category.id, category.orderNum - 1)}
                            disabled={index === 0}
                            title="위로"
                          >
                            ↑
                          </button>
                          <span className="order-num">{category.orderNum || 0}</span>
                          <button
                            className="btn-icon"
                            onClick={() => handleOrderChange(category.id, category.orderNum + 1)}
                            disabled={index === categories.length - 1}
                            title="아래로"
                          >
                            ↓
                          </button>
                        </div>
                      </td>
                      <td>{category.id}</td>
                      <td>
                        <strong>{category.name}</strong>
                      </td>
                      <td>
                        <span className="description-text">
                          {category.description || '-'}
                        </span>
                      </td>
                      <td>
                        {category.createdAt
                          ? format(new Date(category.createdAt), 'yyyy-MM-dd HH:mm')
                          : '-'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(category)}
                          >
                            수정
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      카테고리가 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* 카테고리 생성 모달 */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>카테고리 생성</h2>
              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="카테고리 이름"
                />
              </div>
              <div className="form-group">
                <label>설명</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="카테고리 설명 (선택사항)"
                />
              </div>
              <div className="form-group">
                <label>순서</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.orderNum}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNum: parseInt(e.target.value) || 0 })
                  }
                  min="0"
                />
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

      {/* 카테고리 수정 모달 */}
      {showEditModal && selectedCategory && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>카테고리 수정</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="카테고리 이름"
                />
              </div>
              <div className="form-group">
                <label>설명</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="카테고리 설명 (선택사항)"
                />
              </div>
              <div className="form-group">
                <label>순서</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.orderNum}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNum: parseInt(e.target.value) || 0 })
                  }
                  min="0"
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
              <button className="btn btn-primary" onClick={handleUpdateSubmit}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesPage
