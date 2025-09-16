import React, { useState } from 'react';
import axios from 'axios';

// --- MODIFIED: Add `onSwitchToRegister` to the props ---
const Login = ({ handleAuthSuccess, theme, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      if (res.data.token) {
        console.log('Login successful! Token received:', res.data.token);
        handleAuthSuccess(res.data.token);
      }
    } catch (err)
     {
      console.error(err.response ? err.response.data : 'An error occurred');
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const themeStyles = {
    light: {
      container: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#212529'
      },
      card: {
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12)',
        color: '#212529'
      },
      input: {
        background: 'rgba(255, 255, 255, 0.8)',
        border: '2px solid rgba(102, 126, 234, 0.2)',
        color: '#212529'
      },
      inputFocused: {
        borderColor: '#667eea',
        boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.15)'
      },
      button: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
      },
      text: {
        primary: '#212529',
        secondary: '#495057',
        muted: '#6c757d'
      }
    },
    dark: {
      container: {
        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #2d3748 100%)',
        color: '#f7fafc'
      },
      card: {
        background: 'rgba(45, 55, 72, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 32px 64px rgba(102, 126, 234, 0.2), 0 16px 32px rgba(0, 0, 0, 0.3)',
        color: '#f7fafc'
      },
      input: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '2px solid rgba(255, 255, 255, 0.15)',
        color: '#f7fafc'
      },
      inputFocused: {
        borderColor: '#90cdf4',
        boxShadow: '0 0 0 4px rgba(144, 205, 244, 0.2)',
        background: 'rgba(255, 255, 255, 0.08)'
      },
      button: {
        background: 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)',
        boxShadow: '0 8px 32px rgba(66, 153, 225, 0.4)'
      },
      text: {
        primary: '#f7fafc',
        secondary: '#e2e8f0',
        muted: '#a0aec0'
      }
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div 
      className="login-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'all 0.3s ease-in-out',
        ...currentTheme.container
      }}
    >
      <div 
        className="login-card"
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 10,
          animation: 'slideUp 0.6s ease-out',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(20px)',
          ...currentTheme.card
        }}
      >
        {/* Header Section */}
        <div 
          className="login-header"
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div 
            className="logo-icon"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              margin: '0 auto 1.5rem auto',
              transition: 'all 0.3s ease-in-out',
              background: theme === 'light' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)',
              boxShadow: theme === 'light' ? '0 8px 32px rgba(102, 126, 234, 0.3)' : '0 8px 32px rgba(66, 153, 225, 0.4)'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 
            className="login-title"
            style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              margin: '0 0 0.75rem 0',
              letterSpacing: '-0.025em',
              transition: 'all 0.3s ease-in-out',
              color: currentTheme.text.primary
            }}
          >
            Welcome Back
          </h1>
          <p 
            className="login-subtitle"
            style={{
              fontSize: '1.1rem',
              margin: 0,
              fontWeight: 400,
              transition: 'all 0.3s ease-in-out',
              color: currentTheme.text.secondary
            }}
          >
            Sign in to continue building your career
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                transition: 'all 0.3s ease-in-out',
                color: currentTheme.text.primary
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: currentTheme.text.muted }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              placeholder="Enter your email address"
              required
              style={{
                width: '100%',
                height: '56px',
                padding: '0 1rem',
                borderRadius: '16px',
                fontSize: '1rem',
                transition: 'all 0.3s ease-in-out',
                outline: 'none',
                fontWeight: 500,
                ...currentTheme.input,
                ...(focusedField === 'email' ? {
                  transform: 'translateY(-2px)',
                  ...currentTheme.inputFocused
                } : {})
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                transition: 'all 0.3s ease-in-out',
                color: currentTheme.text.primary
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: currentTheme.text.muted }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={onChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  height: '56px',
                  padding: '0 1rem',
                  borderRadius: '16px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease-in-out',
                  outline: 'none',
                  fontWeight: 500,
                  ...currentTheme.input,
                  ...(focusedField === 'password' ? {
                    transform: 'translateY(-2px)',
                    ...currentTheme.inputFocused
                  } : {})
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  color: currentTheme.text.muted
                }}
                onMouseOver={(e) => {
                  e.target.style.color = theme === 'light' ? '#667eea' : '#90cdf4';
                  e.target.style.background = theme === 'light' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(144, 205, 244, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = currentTheme.text.muted;
                  e.target.style.background = 'transparent';
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19L9.9 4.24z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem' 
            }}
          >
            <label 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <input 
                type="checkbox" 
                style={{
                  width: '18px',
                  height: '18px',
                  transition: 'all 0.3s ease-in-out',
                  accentColor: theme === 'light' ? '#667eea' : '#90cdf4'
                }} 
              />
              <span 
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease-in-out',
                  color: currentTheme.text.muted
                }}
              >
                Remember me
              </span>
            </label>
            <a 
              href="#" 
              style={{
                fontSize: '0.95rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease-in-out',
                color: theme === 'light' ? '#667eea' : '#90cdf4'
              }}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.color = theme === 'light' ? '#5a67d8' : '#63b3ed';
              }}
              onMouseOut={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.style.color = theme === 'light' ? '#667eea' : '#90cdf4';
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              height: '56px',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.05rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease-in-out',
              marginBottom: '1.5rem',
              opacity: isLoading ? 0.8 : 1,
              ...currentTheme.button
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = theme === 'light' ? '0 12px 40px rgba(102, 126, 234, 0.5)' : '0 12px 40px rgba(66, 153, 225, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = currentTheme.button.boxShadow;
            }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              {isLoading ? (
                <>
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Signing In...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Sign In to Account
                </>
              )}
            </div>
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', margin: 0, color: currentTheme.text.secondary }}>
            Don't have an account?{' '}
            {/* --- MODIFIED: Added onClick handler to the link --- */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSwitchToRegister();
              }}
              style={{
                color: theme === 'light' ? '#667eea' : '#90cdf4',
                textDecoration: 'none',
                fontWeight: 600,
                marginLeft: '0.5rem',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer' // Added for better UX
              }}
              onMouseOver={(e) => {
                e.target.style.color = theme === 'light' ? '#5a67d8' : '#63b3ed';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.color = theme === 'light' ? '#667eea' : '#90cdf4';
                e.target.style.textDecoration = 'none';
              }}
            >
              Create an account
            </a>
          </p>
        </div>
      </div>

      {/* Background Decorations */}
      <div 
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          top: '-150px',
          right: '-150px',
          borderRadius: '50%',
          background: theme === 'light' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #4299e1, #90cdf4)',
          opacity: theme === 'light' ? 0.1 : 0.2,
          zIndex: 1,
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          bottom: '-100px',
          left: '-100px',
          borderRadius: '50%',
          background: theme === 'light' ? 'linear-gradient(135deg, #764ba2, #667eea)' : 'linear-gradient(135deg, #90cdf4, #4299e1)',
          opacity: theme === 'light' ? 0.1 : 0.2,
          zIndex: 1,
          animation: 'float 6s ease-in-out infinite reverse'
        }}
      />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 1rem !important;
          }
          .login-card {
            padding: 2rem 1.5rem !important;
          }
          .login-title {
            font-size: 2rem !important;
          }
          .login-subtitle {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem 1.25rem !important;
            border-radius: 20px !important;
          }
          .logo-icon {
            width: 56px !important;
            height: 56px !important;
          }
          .login-title {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;