import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './state/index.jsx'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { Navbar } from './components/navigation/Navbar.jsx'
import { Footer } from './components/common/Footer.jsx'
import { ScrollToTop } from './components/common/ScrollToTop.jsx'
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx'
import { useLenis } from './hooks/useLenis.js'
import './App.css'

/**
 * AAKAR — App
 *
 * Composition only: router → providers → shell (navigation, main, footer).
 * Every responsibility lives in its own layer — sections own their data through
 * hooks, services own the data source, styles own the design system.
 */
export function App() {
  // Smooth, cinematic scrolling, synchronised with GSAP's ticker. Disabled for
  // visitors who prefer reduced motion.
  useLenis()

  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <Navbar />

        <main id="main" className="aakar-main">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>

        <Footer />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
