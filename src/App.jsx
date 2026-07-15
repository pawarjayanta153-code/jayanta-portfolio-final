import React, { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import useTheme from './hooks/useTheme'

// Eagerly loaded components (critical path)
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazily loaded sections (below the fold)
const About = lazy(() => import('./components/About'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const CurrentlyLearning = lazy(() => import('./components/CurrentlyLearning'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const VoiceAssistant = lazy(() => import('./components/VoiceAssistant'))
const Contact = lazy(() => import('./components/Contact'))

// Section-level loading fallback
const SectionFallback = () => (
  <div className="section-fallback" aria-hidden="true">
    <div className="section-fallback__spinner" />
  </div>
)

export default function App() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Minimum loading screen display for UX polish
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Primary navigation */}
          <Navbar />

          {/* Main page content */}
          <main id="main-content">
            {/* Hero is above the fold — not lazy loaded */}
            <Hero />

            <Suspense fallback={<SectionFallback />}>
              <About />
              <Education />
              <Skills />
              <CurrentlyLearning />
              <Experience />
              <Projects />
              <Contact />
            </Suspense>
          </main>

          <Footer />

          {/* Floating utilities */}
          <BackToTop />

          <Suspense fallback={null}>
            <VoiceAssistant />
          </Suspense>
        </>
      )}
    </div>
  )
}
