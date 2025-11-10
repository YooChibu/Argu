/**
 * ArguListPage 컴포넌트
 * 
 * 논쟁 목록 페이지입니다.
 * 
 * 주요 기능:
 * - 논쟁 목록 표시 (페이징)
 * - 카테고리별 필터링
 * - 상태별 필터링 (예정, 진행중, 종료)
 * - 정렬 기능 (최신순, 인기순, 댓글 많은순, 조회수순)
 * - 페이지네이션
 */

import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import ArguCard from '../components/argu/ArguCard'
import './ArguListPage.css'

/**
 * ArguListPage 컴포넌트
 * 
 * @returns {JSX.Element} 논쟁 목록 페이지 컴포넌트
 */
const ArguListPage = () => {
  // 훅 사용
  const [searchParams, setSearchParams] = useSearchParams() // URL 쿼리 파라미터 관리

  // 상태 관리
  const [argus, setArgus] = useState([]) // 논쟁 목록
  const [categories, setCategories] = useState([]) // 카테고리 목록
  const [loading, setLoading] = useState(true) // 로딩 상태
  const [page, setPage] = useState(0) // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0) // 전체 페이지 수

  // URL 쿼리 파라미터에서 필터 값 가져오기
  const categoryId = searchParams.get('category')
  const status = searchParams.get('status')
  const sort = searchParams.get('sort') || 'latest'

  /**
   * 필터 또는 페이지 변경 시 데이터 로딩
   */
  useEffect(() => {
    fetchArgus()
    fetchCategories()
  }, [categoryId, status, sort, page])

  /**
   * 논쟁 목록 가져오기
   * 
   * 카테고리 필터가 있으면 카테고리별 논쟁을 가져오고,
   * 없으면 전체 논쟁 목록을 가져옵니다.
   */
  const fetchArgus = async () => {
    try {
      setLoading(true)
      let response
      
      // 카테고리 필터가 있으면 카테고리별 논쟁 가져오기
      if (categoryId) {
        response = await arguService.getArgusByCategory(categoryId, page, 20)
      } else {
        // 전체 논쟁 목록 가져오기
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

  /**
   * 카테고리 목록 가져오기
   * 
   * 필터 옵션에 사용할 카테고리 목록을 가져옵니다.
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
   * 필터 변경 처리
   * 
   * 필터 값이 변경되면 URL 쿼리 파라미터를 업데이트하고 페이지를 초기화합니다.
   * 
   * @param {string} key - 필터 키 (category, status, sort)
   * @param {string} value - 필터 값
   */
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    // 필터 변경 시 페이지를 첫 페이지로 초기화
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

