import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Agendar from './pages/Agendar'
import Cotacao from './pages/Cotacao'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Portfolio from './pages/Portfolio'
import Contacto from './pages/Contacto'
import ServiceDetail from './pages/ServiceDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/cotacao" element={<Cotacao />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/servico/:serviceType" element={<ServiceDetail />} />
        </Routes>
        
        <Footer />
        
        {/* AI Assistant */}
        <AIAssistant />
        
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
    </Router>
  )
}

export default App
