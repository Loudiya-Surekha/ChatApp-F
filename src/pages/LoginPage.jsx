import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthImagePattern from '../Components/AuthImagePattern'
import { useThemeStore } from '../store/useThemeStore'
import { themeColors } from '../constants'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { theme } = useThemeStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div
      className="d-flex flex-column flex-lg-row align-items-center justify-content-center min-vh-100 w-100 p-3"
      style={{
        backgroundColor: themeColors[theme]?.bg,
        color: themeColors[theme]?.text,
        paddingTop: '40px',  
      }}
    >
      {/* Left Side - Form */}
      <div
        className="d-flex flex-column justify-content-center align-items-center w-100 w-lg-50 p-3"
        style={{
          backgroundColor: themeColors[theme]?.bg,
          color: themeColors[theme]?.text,
        }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center fw-bold mb-4">Sign In</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-medium">Email</label>
              <div className="position-relative">
                <Mail
                  className="position-absolute text-secondary"
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                />
                <input
                  type="email"
                  className="form-control ps-5"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    backgroundColor: themeColors[theme]?.bg,
                    color: themeColors[theme]?.text,
                    borderColor: themeColors[theme]?.text,
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div className="position-relative">
                <Lock
                  className="position-absolute text-secondary"
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control ps-5 pe-5"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    backgroundColor: themeColors[theme]?.bg,
                    color: themeColors[theme]?.text,
                    borderColor: themeColors[theme]?.text,
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute border-0 bg-transparent"
                  style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-secondary" size={18} />
                  ) : (
                    <Eye className="text-secondary" size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Loading...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Signup link */}
          <div className="text-center mt-4">
            <p className='text-black' style={{ color: theme === 'light' ? '#000' : '#fff' }}>
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-primary text-decoration-none fw-semibold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - AuthImagePattern */}
      <div
        className="d-none d-lg-flex w-50 align-items-center justify-content-center p-3"
        style={{
          backgroundColor: themeColors[theme]?.bg,
          marginTop: '50px', 
        }}
      >
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  )
}

export default LoginPage
