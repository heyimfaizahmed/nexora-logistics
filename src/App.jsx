import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './animations'
import { ScrollTrigger } from './animations/gsapConfig'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Loader from './components/Loader'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProcessPage from './pages/ProcessPage'
import ProjectsPage from './pages/ProjectsPage'
import StatsPage from './pages/StatsPage'
import AllocationPage from './pages/AllocationPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize Lenis smooth scroll connected to GSAP ticker
  useLenis()

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="site-wrap">
          {/* Cinematic Command System Loader on Initial Session Entry */}
          <Loader onComplete={handleLoaderComplete} />

          <Header isLoaded={isLoaded} />

          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home isLoaded={isLoaded} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/capabilities" element={<ServicesPage />} />
              <Route path="/trade-flow" element={<ProcessPage />} />
              <Route path="/case-studies" element={<ProjectsPage />} />
              <Route path="/metrics" element={<StatsPage />} />
              <Route path="/allocation" element={<AllocationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
              {/* Fallback to Home */}
              <Route path="*" element={<Home isLoaded={isLoaded} />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
