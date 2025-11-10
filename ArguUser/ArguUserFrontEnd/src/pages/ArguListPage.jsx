import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import ArguCard from '../components/argu/ArguCard'
import './ArguListPage.css'

const ArguListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [argus, setArgus] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const categoryId = searchParams.get('category')
  const status = searchParams.get('status')
  const sort = searchParams.get('sort') || 'latest'

  useEffect(() => {
    fetchArgus()
    fetchCategories()
  }, [categoryId, status, sort, page])

  const fetchArgus = async () => {
    try {
      setLoading(true)
      let response
      
      if (categoryId) {
        response = await arguService.getArgusByCategory(categoryId, page, 20)
      } else {
        response = await arguService.getAllArgus(page, 20)
      }
      
      // ApiResponse 구조에서 data 추출
      const pageData = response.data || response
      setArgus(pageData.content || [])
      setTotalPages(pageData.totalPages || 0)
    } catch (error) {
      console.error('논쟁 목록 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    newParams.delete('page')
    setSearchParams(newParams)
    setPage(0)
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  return (
    <div className="argu-list-page">
      <div className="container">
        <div className="page-header">
          <h1>논쟁 목록</h1>
          <Link to="/argu/create" className="btn btn-primary">
            새 논쟁 작성
          </Link>
        </div>

        {/* 필터 및 정렬 */}
        <div className="filter-section">
          <div className="filters">
            <select
              className="form-select"
              value={categoryId || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">전체 카테고리</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">전체 상태</option>
              <option value="SCHEDULED">예정</option>
              <option value="ACTIVE">진행중</option>
              <option value="ENDED">종료</option>
            </select>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="latest">정렬: 최신순</option>
              <option value="popular">인기순</option>
              <option value="comments">댓글 많은순</option>
              <option value="views">조회수순</option>
            </select>
          </div>
        </div>

        {/* 논쟁 목록 */}
        <div className="argu-list">
          {argus.length === 0 ? (
            <div className="empty-state">
              <p>논쟁이 없습니다.</p>
            </div>
          ) : (
            argus.map((argu) => <ArguCard key={argu.id} argu={argu} />)
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-link"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-link ${page === i ? 'active' : ''}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-link"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArguListPage

