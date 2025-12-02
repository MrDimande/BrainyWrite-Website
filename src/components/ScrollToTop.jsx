import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Garante que, ao mudar de rota, a página volta para o topo
// e trata também navegação com hash (ex: /#sobre)
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Se houver hash, tentar rolar para o elemento correspondente
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    // Caso contrário, rola para o topo da página
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
