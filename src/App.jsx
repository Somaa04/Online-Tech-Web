import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { PageTransition } from './components/Reveal'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import Welcome from './components/Welcome'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { UiProvider } from './context/UiContext'
import About from './pages/About'
import Auth from './pages/Auth'
import Certificate from './pages/Certificate'
import Contact from './pages/Contact'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Quote from './pages/Quote'

function Shell() {
  const location = useLocation()
  const [welcomed, setWelcomed] = useState(() => {
    try {
      return window.localStorage.getItem('ot_welcomed') === '1'
    } catch {
      return true
    }
  })

  function enterSite() {
    try {
      window.localStorage.setItem('ot_welcomed', '1')
    } catch {
      // The welcome screen still closes if storage is unavailable.
    }
    setWelcomed(true)
  }

  if (!welcomed) return <Welcome onEnter={enterSite} />

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition pageKey={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/signin" element={<Auth mode="signin" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/certificate/:courseId"
              element={
                <RequireAuth>
                  <Certificate />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      {location.pathname === '/' ? <Footer /> : null}
      <ChatWidget />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UiProvider>
            <Shell />
          </UiProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
