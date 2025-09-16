import API_BASE_URL from '../../config';
import React, { useState } from 'react';
import axios from 'axios';

// --- MODIFIED: Add `onSwitchToLogin` to the props ---
const Register = ({ handleAuthSuccess, theme, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === 'password') {
      const strength = checkPasswordStrength(e.target.value);
      setPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    return strength;
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return theme === 'light' ? '#dc3545' : '#ff6b6b';
    if (passwordStrength <= 50) return theme === 'light' ? '#fd7e14' : '#ffa726';
    if (passwordStrength <= 75) return theme === 'light' ? '#ffc107' : '#ffeb3b';
    return theme === 'light' ? '#28a745' : '#51cf66';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData
      );
      if (res.data.token) {
        console.log('Registration successful! Token received:', res.data.token);
        handleAuthSuccess(res.data.token);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : 'An error occurred');
      alert('Registration failed. Please try again.');
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
      className="register-container"
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
        className="register-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 10,
          animation: 'slideUp 0.6s ease-out',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(20px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          ...currentTheme.card
        }}
      >
        {/* Header Section */}
        <div 
          className="register-header"
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 
            className="register-title"
            style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              margin: '0 0 0.75rem 0',
              letterSpacing: '-0.025em',
              transition: 'all 0.3s ease-in-out',
              color: currentTheme.text.primary
            }}
          >
            Join Us Today
          </h1>
          <p 
            className="register-subtitle"
            style={{
              fontSize: '1.1rem',
              margin: 0,
              fontWeight: 400,
              lineHeight: 1.5,
              transition: 'all 0.3s ease-in-out',
              color: currentTheme.text.secondary
            }}
          >
            Create your account and start building amazing resumes
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
          {/* Name Field */}
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              placeholder="Enter your full name"
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
                ...(focusedField === 'name' ? {
                  transform: 'translateY(-2px)',
                  ...currentTheme.inputFocused
                } : {})
              }}
            />
          </div>

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
                placeholder="Create a strong password"
                required
                minLength="6"
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

            {/* Password Strength Indicator */}
            {password && (
              <div 
                style={{
                  marginTop: '0.75rem',
                  padding: '1rem',
                  background: theme === 'light' ? 'rgba(102, 126, 234, 0.05)' : 'rgba(144, 205, 244, 0.05)',
                  border: `1px solid ${theme === 'light' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(144, 205, 244, 0.1)'}`,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span 
                    style={{
                      fontSize: '0.875rem',
                      color: currentTheme.text.muted,
                      fontWeight: 500,
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Password Strength:
                  </span>
                  <span 
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      transition: 'all 0.3s ease-in-out',
                      color: getStrengthColor()
                    }}
                  >
                    {getStrengthText()}
                  </span>
                </div>
                <div 
                  style={{
                    height: '8px',
                    background: theme === 'light' ? 'rgba(173, 181, 189, 0.2)' : 'rgba(160, 174, 192, 0.2)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <div 
                    style={{
                      height: '100%',
                      borderRadius: '10px',
                      transition: 'all 0.3s ease-in-out',
                      position: 'relative',
                      overflow: 'hidden',
                      width: `${passwordStrength}%`,
                      background: getStrengthColor()
                    }}
                  />
                </div>
              </div>
            )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Create Account
                </>
              )}
            </div>
          </button>
        </form>
        
        {/* Login Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', margin: 0, color: currentTheme.text.secondary }}>
            Already have an account?{' '}
            {/* --- MODIFIED: Added onClick handler to the link --- */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
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
              Sign in here
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
          background: theme === 'light' ? 'linear-gradient(135deg, #764ba2, #667eea)' : 'linear-gradient(135deg, #90cdf4, #ff6b6b)',
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

        .register-card::-webkit-scrollbar {
          width: 6px;
        }
        
        .register-card::-webkit-scrollbar-track {
          background: ${theme === 'light' ? '#f1f3f4' : '#4a5568'};
          border-radius: 3px;
        }
        
        .register-card::-webkit-scrollbar-thumb {
          background: ${theme === 'light' ? '#667eea' : '#90cdf4'};
          border-radius: 3px;
          transition: all 0.3s ease-in-out;
        }
        
        .register-card::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'light' ? '#5a67d8' : '#63b3ed'};
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .register-container {
            padding: 1rem !important;
          }
          .register-card {
            padding: 2rem 1.5rem !important;
            max-height: 95vh !important;
          }
          .register-title {
            font-size: 2rem !important;
          }
          .register-subtitle {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 1.5rem 1.25rem !important;
            border-radius: 20px !important;
            max-height: 98vh !important;
          }
          .logo-icon {
            width: 56px !important;
            height: 56px !important;
          }
          .register-title {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;