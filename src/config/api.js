// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const api = {
  contact: `${API_BASE_URL}/contact`,
  quote: `${API_BASE_URL}/quote`,
  appointment: `${API_BASE_URL}/appointment`,
  newsletter: `${API_BASE_URL}/newsletter`,
  health: `${API_BASE_URL}/health`,
}

export default api

