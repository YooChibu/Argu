import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { arguService } from '../services/arguService'
import { categoryService } from '../services/categoryService'
import ArguCard from '../components/argu/ArguCard'
import './CategoryDetailPage.css'

const CategoryDetailPage = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [argus, setArgus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [categoryResponse, argusResponse] = await Promise.all([
        categoryService.getCategoryById(id),
        arguService.getArgusByCategory(id, 0, 20),
      ])

      // ApiResponse 구조에서 data 추출
      setCategory(categoryResponse.data || categoryResponse)
      const argusPageData = argusResponse.data || argusResponse
      setArgus(argusPageData.content || [])
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  if (!category) {
    return <div className="container">카테고리를 찾을 수 없습니다.</div>
  }

  return (
    <div className="category-detail-page">
      <div className="container">
        <div className="category-header">
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
        </div>
        <div className="argu-list">
          {argus.length === 0 ? (
            <div className="empty-state">
              <p>이 카테고리에 논쟁이 없습니다.</p>
            </div>
          ) : (
            argus.map((argu) => <ArguCard key={argu.id} argu={argu} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryDetailPage

