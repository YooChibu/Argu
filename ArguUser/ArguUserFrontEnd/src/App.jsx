import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/common/Layout'
import HomePage from './pages/HomePage'
import ArguListPage from './pages/ArguListPage'
import ArguDetailPage from './pages/ArguDetailPage'
import ArguCreatePage from './pages/ArguCreatePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import MyPage from './pages/MyPage'
import UserProfilePage from './pages/UserProfilePage'
import CategoryListPage from './pages/CategoryListPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import SearchPage from './pages/SearchPage'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/argu" element={<ArguListPage />} />
              <Route path="/argu/:id" element={<ArguDetailPage />} />
              <Route path="/argu/create" element={<ProtectedRoute><ArguCreatePage /></ProtectedRoute>} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/my" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
              <Route path="/users/:username" element={<UserProfilePage />} />
              <Route path="/categories" element={<CategoryListPage />} />
              <Route path="/categories/:id" element={<CategoryDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App








