import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ handleAuthSuccess }) => {
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
    if (passwordStrength <= 25) return '#ef4444';
    if (passwordStrength <= 50) return '#f97316';
    if (passwordStrength <= 75) return '#eab308';
    return '#22c55e';
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
        'http://localhost:5000/api/auth/register',
        formData
      );
      if (res.data.token) {
        console.log('Registration successful! Token received:', res.data.token);
        handleAuthSuccess(res.data.token);
      }
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header Section */}
        <div className="register-header">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="register-title">Join Us Today</h1>
          <p className="register-subtitle">Create your account and start building amazing resumes</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={onSubmit} className="register-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">
              <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your full name"
                required
                className={`form-input ${focusedField === 'name' ? 'focused' : ''}`}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">
              <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your email address"
                required
                className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">
              <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Password
            </label>
            <div className="input-wrapper">
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
                className={`form-input ${focusedField === 'password' ? 'focused' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
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
              <div className="password-strength">
                <div className="strength-header">
                  <span className="strength-label">Password Strength:</span>
                  <span className="strength-text" style={{ color: getStrengthColor() }}>
                    {getStrengthText()}
                  </span>
                </div>
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${passwordStrength}%`,
                      background: getStrengthColor()
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="terms-wrapper">
            <label className="terms-checkbox">
              <input type="checkbox" required className="custom-checkbox" />
              <span className="terms-text">
                I agree to the{' '}
                <a href="#" className="terms-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="terms-link">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="button-content">
                <div className="loading-spinner"></div>
                Creating Account...
              </div>
            ) : (
              <div className="button-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Create Account
              </div>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">or sign up with</span>
        </div>

        {/* Social Registration */}
        <div className="social-buttons">
          <button className="social-button google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="social-button github">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <div className="auth-switch">
          <p>Already have an account? <a href="#" className="switch-link">Sign in here</a></p>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3 className="benefits-title">What you'll get:</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Access to premium resume templates</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>AI-powered resume optimization</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Export in multiple formats (PDF, Word)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div>

      <style jsx>{`
        .register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .register-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 10;
          animation: slideUp 0.6s ease-out;
        }

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

        .register-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .logo-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.5rem auto;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }

        .register-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.025em;
        }

        .register-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .register-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
        }

        .field-icon {
          color: #64748b;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          height: 56px;
          padding: 0 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 1rem;
          background: white;
          color: #1a202c;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          font-weight: 500;
        }

        .form-input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .form-input.focused {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .password-toggle:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .password-strength {
          margin-top: 0.75rem;
        }

        .strength-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .strength-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .strength-text {
          font-size: 0.875rem;
          font-weight: 700;
        }

        .strength-bar {
          height: 6px;
          background: #f1f5f9;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .strength-fill {
          height: 100%;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .terms-wrapper {
          margin-bottom: 2rem;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          line-height: 1.6;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #667eea;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .terms-text {
          font-size: 0.95rem;
          color: #64748b;
          font-weight: 500;
        }

        .terms-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .terms-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .submit-button {
          width: 100%;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          margin-bottom: 1.5rem;
        }

        .submit-button:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .submit-button.loading {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 2rem 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
        }

        .divider-text {
          background: white;
          padding: 0 1.5rem;
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-button {
          height: 52px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #374151;
        }

        .social-button:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .social-button.github {
          color: #1a202c;
        }

        .auth-switch {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-switch p {
          font-size: 0.95rem;
          color: #64748b;
          margin: 0;
        }

        .switch-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .switch-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .benefits-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border: 1px solid rgba(102, 126, 234, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .benefits-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #374151;
          margin: 0 0 1rem 0;
          text-align: center;
        }

        .benefits-list {
          display: grid;
          gap: 0.75rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: #4b5563;
        }

        .benefit-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
          flex-shrink: 0;
        }

        .bg-decoration {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          z-index: 1;
        }

        .bg-decoration-1 {
          width: 280px;
          height: 280px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          top: -140px;
          right: -140px;
          animation: float 9s ease-in-out infinite;
        }

        .bg-decoration-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          bottom: -100px;
          left: -100px;
          animation: float 7s ease-in-out infinite reverse;
        }

        .bg-decoration-3 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          top: 30%;
          left: -60px;
          animation: float 11s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .register-container {
            padding: 1rem;
          }

          .register-card {
            padding: 2rem 1.5rem;
          }

          .register-title {
            font-size: 2rem;
          }

          .register-subtitle {
            font-size: 1rem;
          }

          .social-buttons {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 1.5rem 1.25rem;
            border-radius: 20px;
          }

          .logo-icon {
            width: 56px;
            height: 56px;
          }

          .register-title {
            font-size: 1.75rem;
          }

          .form-input, .submit-button {
            height: 52px;
          }

          .benefits-section {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;