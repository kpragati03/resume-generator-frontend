import React, { useState } from 'react';

const Education = ({ handleInputChange, data, theme }) => {
  const [focusedField, setFocusedField] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case 'year':
        const currentYear = new Date().getFullYear();
        const yearValue = parseInt(value);
        if (value && (yearValue < 1950 || yearValue > currentYear + 10)) {
          errors.year = `Year should be between 1950 and ${currentYear + 10}`;
        } else {
          delete errors.year;
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
  };

  const handleChange = (e) => {
    handleInputChange(e, 'education', 0);
    validateField(e.target.name, e.target.value);
  };

  const progressPercentage = () => {
    const fields = ['degree', 'institution', 'year'];
    const filledFields = fields.filter((field) => data[field]?.trim()).length;
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
      preview: {
        background: 'rgba(248, 250, 252, 0.8)',
        border: '1px solid rgba(233, 236, 239, 0.5)',
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
      preview: {
        background: 'rgba(74, 85, 104, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
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
        maxWidth: '900px',
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
              🎓
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
                Education Background
              </h2>
              <p 
                style={{
                  fontSize: '1rem',
                  margin: 0,
                  transition: 'all 0.3s ease-in-out',
                  color: currentTheme.text.secondary
                }}
              >
                Share your academic achievements and qualifications
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
              ...currentTheme.preview
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
                Education Profile Completion
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
                gap: '2rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
              }}
            >
              {/* Degree Field */}
              <div style={{ marginBottom: 0 }}>
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
                    🎓 Degree / Qualification *
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={data.degree || ''}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('degree')}
                    onBlur={() => setFocusedField('')}
                    placeholder="e.g., Bachelor of Computer Science, MBA"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      ...currentTheme.input,
                      ...(focusedField === 'degree' ? {
                        transform: 'translateY(-2px)',
                        ...currentTheme.inputFocused
                      } : {})
                    }}
                  />
                  {data.degree && (
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

              {/* Institution Field */}
              <div style={{ marginBottom: 0 }}>
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
                    🏛️ Institution / University *
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={data.institution || ''}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('institution')}
                    onBlur={() => setFocusedField('')}
                    placeholder="e.g., Harvard University, MIT"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      ...currentTheme.input,
                      ...(focusedField === 'institution' ? {
                        transform: 'translateY(-2px)',
                        ...currentTheme.inputFocused
                      } : {})
                    }}
                  />
                  {data.institution && (
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

              {/* Year Field */}
              <div 
                style={{ 
                  gridColumn: '1 / -1',
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
                    📅 Year of Graduation
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={data.year || ''}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('year')}
                    onBlur={() => setFocusedField('')}
                    placeholder="e.g., 2023, 2020-2024, Expected 2025"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      ...currentTheme.input,
                      ...(focusedField === 'year' ? {
                        transform: 'translateY(-2px)',
                        ...currentTheme.inputFocused
                      } : {}),
                      ...(validationErrors.year ? {
                        borderColor: '#ff6b6b !important'
                      } : {})
                    }}
                  />
                  {data.year && !validationErrors.year && (
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
                {validationErrors.year && (
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      color: '#ff6b6b',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      background: theme === 'light' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 107, 107, 0.15)'
                    }}
                  >
                    ⚠️ {validationErrors.year}
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Preview Section */}
          {(data.degree || data.institution || data.year) && (
            <div 
              style={{
                marginTop: '2rem',
                padding: '2rem',
                borderRadius: '16px',
                transition: 'all 0.3s ease-in-out',
                ...currentTheme.preview
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
                👀 Preview
              </h4>
              <div 
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease-in-out',
                  ...currentTheme.preview.content
                }}
              >
                <h5 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.primary
                  }}
                >
                  {data.degree || 'Your Degree'}
                </h5>
                <p 
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    marginBottom: '0.25rem',
                    transition: 'all 0.3s ease-in-out',
                    color: theme === 'light' ? '#667eea' : '#90cdf4'
                  }}
                >
                  {data.institution || 'Your Institution'}
                </p>
                <p 
                  style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    transition: 'all 0.3s ease-in-out',
                    color: currentTheme.text.secondary
                  }}
                >
                  {data.year ? `Class of ${data.year}` : 'Graduation Year'}
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
        }

        @media (max-width: 480px) {
          .container {
            padding: 1rem 0.5rem !important;
          }
          
          .card {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .section-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Education;