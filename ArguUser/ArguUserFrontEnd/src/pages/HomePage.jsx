import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import ArguCard from '../components/argu/ArguCard'
import './HomePage.css'

const HomePage = () => {
  const [popularArgus, setPopularArgus] = useState([])
  const [latestArgus, setLatestArgus] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [argusRes, categoriesRes] = await Promise.all([
        arguService.getAllArgus(0, 6),
        categoryService.getAllCategories(),
      ])
      
      // ApiResponse 구조에서 data 추출
      const argusData = argusRes.data || argusRes
      const categoriesData = categoriesRes.data || categoriesRes
      
      setPopularArgus(argusData.content || [])
      setLatestArgus(argusData.content || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
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

