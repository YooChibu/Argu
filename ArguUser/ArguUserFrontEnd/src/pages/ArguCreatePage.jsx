/**
 * ArguCreatePage 컴포넌트
 * 
 * 새로운 논쟁을 작성하는 페이지입니다.
 * 
 * 주요 기능:
 * - 논쟁 제목 및 내용 입력
 * - 카테고리 선택
 * - 논쟁 기간 설정 (시작일시 ~ 종료일시)
 * - 폼 유효성 검사
 * - 논쟁 생성 후 상세 페이지로 이동
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import './ArguCreatePage.css'

/**
 * ArguCreatePage 컴포넌트
 * 
 * @returns {JSX.Element} 논쟁 작성 페이지 컴포넌트
 */
const ArguCreatePage = () => {
  // 훅 사용
  const navigate = useNavigate() // 페이지 네비게이션

  // 상태 관리
  const [categories, setCategories] = useState([]) // 카테고리 목록
  const [formData, setFormData] = useState({
    title: '', // 논쟁 제목
    content: '', // 논쟁 내용
    categoryId: '', // 선택된 카테고리 ID
    startDate: '', // 논쟁 시작일시
    endDate: '', // 논쟁 종료일시
  })
  const [error, setError] = useState('') // 에러 메시지
  const [loading, setLoading] = useState(false) // 로딩 상태

  /**
   * 컴포넌트 마운트 시 카테고리 목록 로딩
   */
  useEffect(() => {
    fetchCategories()
  }, [])

  /**
   * 카테고리 목록 가져오기
   * 
   * 서버에서 카테고리 목록을 가져와 폼의 카테고리 선택 옵션에 사용합니다.
   */
  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories()
      // ApiResponse 구조에서 data 추출
      const data = response.data || response
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('카테고리 로딩 실패:', error)
    }
  }

  /**
   * 폼 제출 처리 함수
   * 
   * 논쟁 생성 요청을 보내고 성공 시 논쟁 상세 페이지로 이동합니다.
   * 
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 카테고리 선택 검증
    if (!formData.categoryId) {
      setError('카테고리를 선택해주세요.')
      return
    }

    // 날짜 유효성 검사: 종료일시는 시작일시보다 이후여야 함
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('종료일시는 시작일시보다 이후여야 합니다.')
      return
    }

    setLoading(true)

    try {
      // 논쟁 생성 요청
      const response = await arguService.createArgu({
        title: formData.title,
        content: formData.content,
        categoryId: parseInt(formData.categoryId),
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
      // ApiResponse 구조에서 data 추출
      const arguData = response.data || response
      // 생성된 논쟁의 상세 페이지로 이동
      navigate(`/argu/${arguData.id}`)
    } catch (error) {
      // 에러 메시지 표시
      setError(error.response?.data?.message || '논쟁 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="argu-create-page">
      <div className="container">
        <h1>새 논쟁 작성</h1>
        <form onSubmit={handleSubmit} className="argu-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="form-input"
              placeholder="논쟁 제목을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">카테고리</label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              required
              className="form-select"
            >
              <option value="">카테고리 선택</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              className="form-textarea"
              placeholder="논쟁 내용을 입력하세요"
              rows={10}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">시작일시</label>
              <input
                type="datetime-local"
                id="startDate"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">종료일시</label>
              <input
                type="datetime-local"
                id="endDate"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              취소
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '작성 중...' : '작성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArguCreatePage

