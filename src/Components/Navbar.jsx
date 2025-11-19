import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { themeColors } from '../constants'
import { useThemeStore } from '../store/useThemeStore'

function Navbar() {
  const { logout, authUser } = useAuthStore()
  const {theme} =useThemeStore()

    const currentTheme = themeColors[theme.toLowerCase()] || {
    bg: '#ffffff',
    text: '#000000',
  }

  return (
    <header
      className="border-bottom position-fixed w-100 top-0 z-3"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
      }}
    >
      <div className="container-fluid px-4" style={{ height: '64px' }}>
        <div className="d-flex align-items-center justify-content-between h-100">
          {/* Left side */}
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/"
              className="d-flex align-items-center gap-2 text-decoration-none"
              style={{ transition: 'opacity 0.3s', color: currentTheme.text }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                style={{ width: '36px', height: '36px' }}
              >
                <MessageSquare className="text-primary" size={20} />
              </div>
              <h1 className="h5 fw-bold mb-0">Chatty</h1>
            </Link>
          </div>

          {/* Right side */}
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
            >
              <Settings size={16} />
              <span className="d-none d-sm-inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <User size={20} />
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm btn-danger d-flex align-items-center gap-2"
                  onClick={logout}
                >
                  <LogOut size={20} />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
