/**
 * CategoryListPage 컴포넌트
 * 
 * 카테고리 목록 페이지입니다.
 * 
 * 주요 기능:
 * - 전체 카테고리 목록 표시
 * - 카테고리 클릭 시 해당 카테고리의 논쟁 목록으로 이동
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryService } from '../services/categoryService'
import './CategoryListPage.css'

/**
 * CategoryListPage 컴포넌트
 * 
 * @returns {JSX.Element} 카테고리 목록 페이지 컴포넌트
 */
const CategoryListPage = () => {
  // 상태 관리
  const [categories, setCategories] = useState([]) // 카테고리 목록
  const [loading, setLoading] = useState(true) // 로딩 상태

  /**
   * 컴포넌트 마운트 시 카테고리 목록 로딩
   */
  useEffect(() => {
    fetchCategories()
  }, [])

  /**
   * 카테고리 목록 가져오기
   * 
   * 서버에서 전체 카테고리 목록을 가져옵니다.
   */
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

