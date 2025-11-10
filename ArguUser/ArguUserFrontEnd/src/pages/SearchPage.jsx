import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { arguService } from '../services/arguService'
import ArguCard from '../components/argu/ArguCard'
import './SearchPage.css'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const [argus, setArgus] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState(keyword)

  useEffect(() => {
    if (keyword) {
      performSearch(keyword)
    }
  }, [keyword])

  const performSearch = async (query) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      const response = await arguService.searchArgus(query, 0, 20)
      // ApiResponse 구조에서 data 추출
      const pageData = response.data || response
      setArgus(pageData.content || [])
    } catch (error) {
      console.error('검색 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchKeyword)}`
    }
  }

  return (
    <div className="search-page">
      <div className="container">
        <h1>검색</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-box">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              검색
            </button>
          </div>
        </form>

        {keyword && (
          <div className="search-results">
            <h2>'{keyword}' 검색 결과</h2>
            {loading ? (
              <div>검색 중...</div>
            ) : argus.length === 0 ? (
              <div className="empty-state">검색 결과가 없습니다.</div>
            ) : (
              <div className="argu-list">
                {argus.map((argu) => (
                  <ArguCard key={argu.id} argu={argu} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage

