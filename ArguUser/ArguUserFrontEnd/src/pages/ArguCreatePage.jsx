import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import './ArguCreatePage.css'

const ArguCreatePage = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    startDate: '',
    endDate: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.categoryId) {
      setError('카테고리를 선택해주세요.')
      return
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('종료일시는 시작일시보다 이후여야 합니다.')
      return
    }

    setLoading(true)

    try {
      const response = await arguService.createArgu({
        title: formData.title,
        content: formData.content,
        categoryId: parseInt(formData.categoryId),
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
      // ApiResponse 구조에서 data 추출
      const arguData = response.data || response
      navigate(`/argu/${arguData.id}`)
    } catch (error) {
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

