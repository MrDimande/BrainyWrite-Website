import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './contexts/AuthContext'

// Core components (loaded immediately)
import AIAssistant from './components/AIAssistant'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// Lazy-loaded pages (code splitting for better performance)
const Servicos = lazy(() => import('./pages/Servicos'))
const Agendar = lazy(() => import('./pages/Agendar'))
const Cotacao = lazy(() => import('./pages/Cotacao'))
const Contacto = lazy(() => import('./pages/Contacto'))
const BrainyForge = lazy(() => import('./pages/BrainyForge'))
const ExamList = lazy(() => import('./pages/ExamList'))
const ExamStart = lazy(() => import('./pages/ExamStart'))
const ExamInterface = lazy(() => import('./pages/ExamInterface'))
const ExamResults = lazy(() => import('./pages/ExamResults'))
const UserProgress = lazy(() => import('./pages/UserProgress'))

// Auth pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

// Admin pages
const ExamManager = lazy(() => import('./pages/admin/ExamManager'))

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Carregando...</p>
    </div>
  </div>
)

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-black text-white">
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/cotacao" element={<Cotacao />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/brainyforge" element={<BrainyForge />} />
          <Route
            path="/exams/:subject"
            element={
              <ProtectedRoute>
                <ExamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId/start"
            element={
              <ProtectedRoute>
                <ExamStart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId/take"
            element={
              <ProtectedRoute>
                <ExamInterface />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId/results"
            element={
              <ProtectedRoute>
                <ExamResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <UserProgress />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/exams" element={<ExamManager />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIAssistant />}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
