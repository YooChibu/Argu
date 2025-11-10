import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryService } from '../services/categoryService'
import './CategoryListPage.css'

const CategoryListPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  return (
    <div className="category-list-page">
      <div className="container">
        <h1>카테고리 목록</h1>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category-card"
            >
              <h3>{category.name}</h3>
              {category.description && <p>{category.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryListPage

