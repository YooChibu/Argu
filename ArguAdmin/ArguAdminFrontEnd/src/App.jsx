/**
 * Argu Admin Frontend - 메인 애플리케이션 컴포넌트
 * 
 * 관리자 애플리케이션의 진입점으로, 라우팅과 전역 컨텍스트를 설정합니다.
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import AdminLayout from './components/common/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ArguPage from './pages/ArguPage'
import CommentsPage from './pages/CommentsPage'
import CategoriesPage from './pages/CategoriesPage'
import ReportsPage from './pages/ReportsPage'
import StatisticsPage from './pages/StatisticsPage'
import SettingsPage from './pages/SettingsPage'
import AdminsPage from './pages/AdminsPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 로그인 페이지 (인증 불필요) */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 관리자 페이지 (인증 필요) */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/users" element={<UsersPage />} />
                      <Route path="/argu" element={<ArguPage />} />
                      <Route path="/comments" element={<CommentsPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/statistics" element={<StatisticsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/admins" element={<AdminsPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

