import React, { useState } from 'react';

const Experience = ({ handleInputChange, data, theme }) => {
  const [focusedField, setFocusedField] = useState('');
  const [charCount, setCharCount] = useState(data.description?.length || 0);

  const handleChange = (e) => {
    handleInputChange(e, 'experience', 0);
    if (e.target.name === 'description') {
      setCharCount(e.target.value.length);
    }
  };

  const progressPercentage = () => {
    const fields = ['company', 'role', 'duration', 'description'];
    const filledFields = fields.filter(field => data[field]?.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const themeStyles = {
    light: {
      container: {
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: '#212529'
      },
      card: {
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      },
      headerIcon: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
      },
      title: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      },
      text: {
        primary: '#212529',
        secondary: '#495057',
        muted: '#6c757d'
      },
      input: {
        background: '#ffffff',
        border: '2px solid rgba(233, 236, 239, 0.8)',
        color: '#212529'
      },
      inputFocused: {
        borderColor: '#667eea',
        boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)'
      },
      progressBar: {
        background: 'rgba(233, 236, 239, 0.8)',
        fill: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      section: {
        background: 'rgba(248, 250, 252, 0.8)',
        border: '1px solid rgba(233, 236, 239, 0.5)'
      },
      preview: {
        content: {
          background: '#ffffff',
          border: '1px solid rgba(233, 236, 239, 0.3)'
        }
      }
    },
    dark: {
      container: {
        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #2d3748 100%)',
        color: '#f7fafc'
      },
      card: {
        background: 'rgba(45, 55, 72, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2), 0 5px 15px rgba(0, 0, 0, 0.3)'
      },
      headerIcon: {
        background: 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)',
        boxShadow: '0 8px 20px rgba(66, 153, 225, 0.4)'
      },
      title: {
        background: 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      },
      text: {
        primary: '#f7fafc',
        secondary: '#e2e8f0',
        muted: '#a0aec0'
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
      progressBar: {
        background: 'rgba(74, 85, 104, 0.8)',
        fill: 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)'
      },
      section: {
        background: 'rgba(74, 85, 104, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      },
      preview: {
        content: {
          background: 'rgba(45, 55, 72, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div 
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1rem',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...currentTheme.container
      }}
    >
      <div 
        style={{
          animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div 
          style={{
            borderRadius: '20px',
            padding: '2rem',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease-in-out',
            ...currentTheme.card
          }}
        >
          {/* Header Section */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                transition: 'all 0.3s ease-in-out',
                ...currentTheme.headerIcon
              }}
            >
              💼
            </div>
            <div>
              <h2 
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  transition: 'all 0.3s ease-in-out',
                  ...currentTheme.title
                }}
              >
                Work Experience
              </h2>
              <p 
                style={{
                  fontSize: '1rem',
                  margin: 0,
                  transition: 'all 0.3s ease-in-out',
                  color: currentTheme.text.secondary
                }}
              >
                Showcase your professional journey and achievements
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <div 
            style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              borderRadius: '16px',
              transition: 'all 0.3s ease-in-out',
              ...currentTheme.section
            }}
          >
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}
            >
              <span 
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease-in-out',
                  color: currentTheme.text.primary
                }}
              >
                Experience Profile Completion
              </span>
              <span 
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease-in-out',
                  color: theme === 'light' ? '#667eea' : '#90cdf4'
                }}
              >
                {progressPercentage()}%
              </span>
            </div>
            <div 
              style={{
                height: '8px',
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                background: currentTheme.progressBar.background
              }}
            >
              <div 
                style={{
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.6s ease, background 0.3s ease-in-out',
                  width: `${progressPercentage()}%`,
                  background: currentTheme.progressBar.fill
                }}
              />
            </div>
          </div>

          {/* Form Section */}
          <form 
            style={{
              animation: 'fadeIn 0.6s ease-out 0.2s both'
            }}
          >
            <div 
              style={{
                display: 'grid',
                gap: '2rem'
              }}
            >
              {/* Company and Role Fields - Side by Side on Desktop */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {/* Company Field */}
                <div>
                  <label 
                    style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease-in-out',
                      color: currentTheme.text.primary
                    }}
                  >
                    <span 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      🏢 Company / Organization *
                    </span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={data.company || ''}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField('')}
                      placeholder="e.g., Google, Microsoft, Tesla, Startup Inc."
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit',
                        ...currentTheme.input,
                        ...(focusedField === 'company' ? {
                          transform: 'translateY(-2px)',
                          ...currentTheme.inputFocused
                        } : {})
                      }}
                    />
                    {data.company && (
                      <div 
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.2rem'
                        }}
                      >
                        ✅
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Field */}
                <div>
                  <label 
                    style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease-in-out',
                      color: currentTheme.text.primary
                    }}
                  >
                    <span 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      👔 Job Title / Role *
                    </span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={data.role || ''}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('role')}
                      onBlur={() => setFocusedField('')}
                      placeholder="e.g., Software Engineer, Product Manager, Marketing Director"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit',
                        ...currentTheme.input,
                        ...(focusedField === 'role' ? {
                          transform: 'translateY(-2px)',
                          ...currentTheme.inputFocused
                        } : {})
                      }}
                    />
                    {data.role && (
                      <div 
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.2rem'
                        }}
                      >
                        ✅
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Duration Field */}
              <div 
                style={{ 
                  maxWidth: '400px',
                  margin: '0 auto',
                  width: '100%'
                }}
              >
                <label 
                  style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.primary
                  }}
                >
                  <span 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    ⏰ Duration / Period
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={data.duration || ''}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('duration')}
                    onBlur={() => setFocusedField('')}
                    placeholder="e.g., Jan 2022 - Present, 2 years, Mar 2020 - Dec 2021"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      ...currentTheme.input,
                      ...(focusedField === 'duration' ? {
                        transform: 'translateY(-2px)',
                        ...currentTheme.inputFocused
                      } : {})
                    }}
                  />
                  {data.duration && (
                    <div 
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem'
                      }}
                    >
                      ✅
                    </div>
                  )}
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label 
                  style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.primary
                  }}
                >
                  <span 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    📝 Job Description / Key Achievements
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    id="description"
                    name="description"
                    value={data.description || ''}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Describe your key responsibilities, achievements, and impact. Use bullet points or paragraphs to highlight your contributions and results..."
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      minHeight: '150px',
                      resize: 'vertical',
                      ...currentTheme.input,
                      ...(focusedField === 'description' ? {
                        transform: 'translateY(-2px)',
                        ...currentTheme.inputFocused
                      } : {})
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease-in-out',
                      color: currentTheme.text.secondary,
                      background: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(45, 55, 72, 0.9)',
                      border: `1px solid ${theme === 'light' ? 'rgba(233, 236, 239, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`
                    }}
                  >
                    {charCount} characters
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Preview Section */}
          {(data.company || data.role || data.duration || data.description) && (
            <div 
              style={{
                marginTop: '2rem',
                padding: '2rem',
                borderRadius: '16px',
                transition: 'all 0.3s ease-in-out',
                ...currentTheme.section
              }}
            >
              <h4 
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease-in-out',
                  color: currentTheme.text.primary
                }}
              >
                👀 Experience Preview
              </h4>
              <div 
                style={{
                  padding: '2rem',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease-in-out',
                  ...currentTheme.preview.content
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div>
                    <h5 
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        transition: 'all 0.3s ease-in-out',
                        color: currentTheme.text.primary
                      }}
                    >
                      {data.role || 'Your Role'}
                    </h5>
                    <p 
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        margin: 0,
                        transition: 'all 0.3s ease-in-out',
                        color: theme === 'light' ? '#667eea' : '#90cdf4'
                      }}
                    >
                      {data.company || 'Company Name'}
                    </p>
                  </div>
                  {data.duration && (
                    <div 
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease-in-out',
                        background: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(74, 85, 104, 0.8)',
                        color: currentTheme.text.secondary,
                        border: `1px solid ${theme === 'light' ? 'rgba(233, 236, 239, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`
                      }}
                    >
                      {data.duration}
                    </div>
                  )}
                </div>
                {data.description && (
                  <div 
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease-in-out',
                      background: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(74, 85, 104, 0.8)',
                      border: `1px solid ${theme === 'light' ? 'rgba(233, 236, 239, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`
                    }}
                  >
                    <p 
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        transition: 'all 0.3s ease-in-out',
                        color: currentTheme.text.secondary
                      }}
                    >
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div 
            style={{
              marginTop: '2rem',
              padding: '2rem',
              borderRadius: '16px',
              transition: 'all 0.3s ease-in-out',
              ...currentTheme.section
            }}
          >
            <h4 
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease-in-out',
                color: currentTheme.text.primary
              }}
            >
              💡 Experience Section Tips
            </h4>
            <div 
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
              }}
            >
              {[
                { icon: '🎯', text: 'Start with strong action verbs (Led, Developed, Increased, Managed)' },
                { icon: '📊', text: 'Include quantifiable results and metrics where possible' },
                { icon: '🎖️', text: 'Focus on achievements rather than just responsibilities' },
                { icon: '⭐', text: 'Use bullet points for better readability and impact' }
              ].map((tip, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    animation: 'fadeInUp 0.5s ease',
                    transition: 'all 0.3s ease-in-out',
                    background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(74, 85, 104, 0.8)',
                    border: `1px solid ${theme === 'light' ? 'rgba(233, 236, 239, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`
                  }}
                >
                  <span 
                    style={{
                      fontSize: '1.25rem',
                      minWidth: '24px',
                      marginTop: '0.125rem'
                    }}
                  >
                    {tip.icon}
                  </span>
                  <span 
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      transition: 'all 0.3s ease-in-out',
                      color: currentTheme.text.secondary
                    }}
                  >
                    {tip.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Power Phrases Section */}
          <div 
            style={{
              marginTop: '2rem',
              padding: '2rem',
              borderRadius: '16px',
              transition: 'all 0.3s ease-in-out',
              ...currentTheme.section
            }}
          >
            <h4 
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease-in-out',
                color: currentTheme.text.primary
              }}
            >
              ✍️ Power Phrases to Use
            </h4>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}
            >
              {[
                'Led a team of X developers',
                'Increased sales by X%',
                'Reduced costs by X%',
                'Managed budget of $X',
                'Collaborated with cross-functional teams',
                'Implemented new processes that...'
              ].map((phrase, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    animation: 'fadeInUp 0.4s ease',
                    transition: 'all 0.3s ease-in-out',
                    background: theme === 'light' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(144, 205, 244, 0.2)',
                    color: theme === 'light' ? '#667eea' : '#90cdf4',
                    border: `1px solid ${theme === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(144, 205, 244, 0.3)'}`
                  }}
                >
                  {phrase}
                </div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {progressPercentage() >= 75 && (
            <div 
              style={{
                marginTop: '2rem',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                animation: 'fadeInUp 0.6s ease',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                background: theme === 'light' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>🎉</span>
              <div>
                <p 
                  style={{
                    margin: '0 0 0.25rem 0',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease-in-out',
                    color: '#10b981'
                  }}
                >
                  Excellent work! Your experience section is well-detailed!
                </p>
                <p 
                  style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.secondary
                  }}
                >
                  This comprehensive experience will make a strong impression on employers
                </p>
              </div>
            </div>
          )}

          {/* Character Count Warning */}
          {charCount > 500 && (
            <div 
              style={{
                marginTop: '2rem',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                animation: 'fadeInUp 0.6s ease',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                background: theme === 'light' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>ℹ️</span>
              <div>
               <p 
                  style={{
                    margin: '0 0 0.25rem 0',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease-in-out',
                    color: '#f59e0b'
                  }}
                >
                  Consider keeping it concise
                </p>
                <p 
                  style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.secondary
                  }}
                >
                  Aim for 2-4 key bullet points or 3-4 sentences for maximum impact
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 1.5rem 1rem !important;
          }
          
          .card {
            padding: 1.5rem !important;
          }
          
          .header {
            gap: 0.75rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .header-icon {
            width: 50px !important;
            height: 50px !important;
            font-size: 1.75rem !important;
          }
          
          .section-title {
            font-size: 1.75rem !important;
          }

          .company-role-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 1rem 0.5rem !important;
          }
          
          .card {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          
          .section-title {
            font-size: 1.5rem !important;
          }

          .tips-grid,
          .phrases-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }

          .preview-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .success-message,
          .warning-message {
            padding: 1rem 1.5rem !important;
          }
        }

        /* Animation delays for staggered effect */
        .tip-card:nth-child(1) { animation-delay: 0.1s; }
        .tip-card:nth-child(2) { animation-delay: 0.2s; }
        .tip-card:nth-child(3) { animation-delay: 0.3s; }
        .tip-card:nth-child(4) { animation-delay: 0.4s; }

        .phrase-card:nth-child(1) { animation-delay: 0.1s; }
        .phrase-card:nth-child(2) { animation-delay: 0.15s; }
        .phrase-card:nth-child(3) { animation-delay: 0.2s; }
        .phrase-card:nth-child(4) { animation-delay: 0.25s; }
        .phrase-card:nth-child(5) { animation-delay: 0.3s; }
        .phrase-card:nth-child(6) { animation-delay: 0.35s; }
      `}</style>
    </div>
  );
};

export default Experience;