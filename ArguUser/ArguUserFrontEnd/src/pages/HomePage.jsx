/**
 * HomePage 컴포넌트
 * 
 * 애플리케이션의 메인 페이지입니다.
 * 
 * 주요 기능:
 * - 통합 검색 기능
 * - 인기 논쟁 미리보기
 * - 최신 논쟁 목록
 * - 카테고리별 미리보기
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import ArguCard from '../components/argu/ArguCard'
import './HomePage.css'

/**
 * HomePage 컴포넌트
 * 
 * @returns {JSX.Element} 홈페이지 컴포넌트
 */
const HomePage = () => {
  // 상태 관리
  const [popularArgus, setPopularArgus] = useState([]) // 인기 논쟁 목록
  const [latestArgus, setLatestArgus] = useState([]) // 최신 논쟁 목록
  const [categories, setCategories] = useState([]) // 카테고리 목록
  const [loading, setLoading] = useState(true) // 로딩 상태
  const [searchKeyword, setSearchKeyword] = useState('') // 검색 키워드

  /**
   * 컴포넌트 마운트 시 데이터 로딩
   */
  useEffect(() => {
    fetchData()
  }, [])

  /**
   * 데이터 가져오기
   * 
   * 논쟁 목록과 카테고리 목록을 병렬로 가져옵니다.
   */
  const fetchData = async () => {
    try {
      setLoading(true)
      // 논쟁 목록과 카테고리 목록을 병렬로 가져오기
      const [argusRes, categoriesRes] = await Promise.all([
        arguService.getAllArgus(0, 6), // 최대 6개 논쟁 가져오기
        categoryService.getAllCategories(),
      ])
      
      // ApiResponse 구조에서 data 추출
      const argusData = argusRes.data || argusRes
      const categoriesData = categoriesRes.data || categoriesRes
      
      // 인기 논쟁과 최신 논쟁을 동일한 데이터로 설정 (실제로는 정렬 기준에 따라 다를 수 있음)
      setPopularArgus(argusData.content || [])
      setLatestArgus(argusData.content || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 검색 처리 함수
   * 
   * 검색어를 입력하고 검색 페이지로 이동합니다.
   * 
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      // 검색 페이지로 이동 (쿼리 파라미터로 검색어 전달)
      window.location.href = `/search?q=${encodeURIComponent(searchKeyword)}`
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  return (
    <div className="home-page">
      {/* 검색 영역 */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <h1 className="search-title">논쟁을 검색하고 참여하세요</h1>
            <p className="search-subtitle">
              관심 있는 주제의 논쟁을 찾아 건설적인 토론에 참여해보세요
            </p>
            <form onSubmit={handleSearch} className="search-form-main">
              <div className="search-box-main">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="논쟁 제목, 내용, 작성자, 카테고리로 검색..."
                  className="search-input-main"
                />
                <button type="submit" className="search-btn-main">
                  🔍 검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="container">
        {/* 인기 논쟁 */}
        <section className="section">
          <div className="section-header">
            <h2>🔥 인기 논쟁</h2>
            <Link to="/argu?sort=popular" className="more-link">
              더보기 →
            </Link>
          </div>
          <div className="argu-grid">
            {popularArgus.slice(0, 3).map((argu) => (
              <ArguCard key={argu.id} argu={argu} />
            ))}
          </div>
        </section>

        {/* 최신 논쟁 */}
        <section className="section">
          <div className="section-header">
            <h2>📢 최신 논쟁</h2>
            <Link to="/argu?sort=latest" className="more-link">
              더보기 →
            </Link>
          </div>
          <div className="argu-list">
            {latestArgus.map((argu) => (
              <div key={argu.id} className="argu-item">
                <div className="argu-item-header">
                  {argu.category && (
                    <span className="category-badge">{argu.category.name}</span>
                  )}
                  <span className={`status-badge status-${argu.status?.toLowerCase()}`}>
                    {argu.status === 'ACTIVE' ? '진행중' : argu.status === 'SCHEDULED' ? '예정' : '종료'}
                  </span>
                </div>
                <h3 className="argu-item-title">
                  <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
                </h3>
                <div className="argu-item-meta">
                  <span className="author">
                    작성자: <Link to={`/users/${argu.user?.username}`}>{argu.user?.nickname || argu.user?.username}</Link>
                  </span>
                  <span className="stat">👍 {argu.likeCount || 0} | 💬 {argu.commentCount || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 카테고리별 미리보기 */}
        <section className="section">
          <div className="section-header">
            <h2>📂 카테고리별 논쟁</h2>
            <Link to="/categories" className="more-link">
              전체 보기 →
            </Link>
          </div>
          <div className="category-preview">
            {categories.slice(0, 4).map((category) => (
              <div key={category.id} className="category-card">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.arguCount || 0}개 논쟁</p>
                <Link to={`/categories/${category.id}`} className="category-link">
                  보기 →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage

