import React, { useState } from 'react';

const Education = ({ handleInputChange, data }) => {
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
    // ✅ fixed: call without index
    handleInputChange(e, 'education', 0);
    validateField(e.target.name, e.target.value);
  };

  const progressPercentage = () => {
    const fields = ['degree', 'institution', 'year'];
    const filledFields = fields.filter((field) => data[field]?.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const getFieldIcon = (fieldName) => {
    const icons = {
      degree: '🎓',
      institution: '🏛️',
      year: '📅',
    };
    return icons[fieldName] || '📚';
  };

  return (
    <div
      className="container-fluid"
      style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}
    >
      <div className="modern-card fade-in-up">
        <div className="card-content">
          {/* Header Section */}
          <div className="card-header">
            <div className="card-icon">🎓</div>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Education Background
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  margin: 0,
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
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-glass)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}
              >
                Education Profile Completion
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--primary-color)',
                }}
              >
                {progressPercentage()}%
              </span>
            </div>
            <div
              style={{
                height: '8px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercentage()}%`,
                  height: '100%',
                  background: 'var(--gradient-primary)',
                  borderRadius: '10px',
                  transition: 'width 0.6s ease',
                }}
              ></div>
            </div>
          </div>

          {/* Form Section */}
          <form className="fade-in">
            <div style={{ display: 'grid', gap: '2rem' }}>
              {/* First Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {/* Degree Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      {getFieldIcon('degree')} Degree / Qualification *
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
                      className="form-input"
                      style={{
                        background:
                          focusedField === 'degree'
                            ? 'var(--bg-tertiary)'
                            : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${
                          focusedField === 'degree'
                            ? 'var(--primary-color)'
                            : 'var(--border-glass)'
                        }`,
                        transform:
                          focusedField === 'degree'
                            ? 'translateY(-2px)'
                            : 'translateY(0)',
                        boxShadow:
                          focusedField === 'degree'
                            ? '0 0 0 4px rgba(102, 126, 234, 0.1)'
                            : 'var(--shadow-sm)',
                      }}
                    />
                    {data.degree && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--success-color)',
                          fontSize: '1.2rem',
                        }}
                      >
                        ✅
                      </div>
                    )}
                  </div>
                </div>

                {/* Institution Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      {getFieldIcon('institution')} Institution / University *
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
                      className="form-input"
                      style={{
                        background:
                          focusedField === 'institution'
                            ? 'var(--bg-tertiary)'
                            : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${
                          focusedField === 'institution'
                            ? 'var(--primary-color)'
                            : 'var(--border-glass)'
                        }`,
                        transform:
                          focusedField === 'institution'
                            ? 'translateY(-2px)'
                            : 'translateY(0)',
                        boxShadow:
                          focusedField === 'institution'
                            ? '0 0 0 4px rgba(102, 126, 234, 0.1)'
                            : 'var(--shadow-sm)',
                      }}
                    />
                    {data.institution && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--success-color)',
                          fontSize: '1.2rem',
                        }}
                      >
                        ✅
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Year Field */}
              <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <div className="form-group">
                  <label className="form-label">
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      {getFieldIcon('year')} Year of Graduation
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
                      className="form-input"
                      style={{
                        background:
                          focusedField === 'year'
                            ? 'var(--bg-tertiary)'
                            : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${
                          validationErrors.year
                            ? '#ff4757'
                            : focusedField === 'year'
                            ? 'var(--primary-color)'
                            : 'var(--border-glass)'
                        }`,
                        transform:
                          focusedField === 'year'
                            ? 'translateY(-2px)'
                            : 'translateY(0)',
                        boxShadow:
                          focusedField === 'year'
                            ? '0 0 0 4px rgba(102, 126, 234, 0.1)'
                            : 'var(--shadow-sm)',
                      }}
                    />
                    {data.year && !validationErrors.year && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--success-color)',
                          fontSize: '1.2rem',
                        }}
                      >
                        ✅
                      </div>
                    )}
                  </div>
                  {validationErrors.year && (
                    <div
                      style={{
                        color: '#ff4757',
                        fontSize: '0.875rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      ⚠️ {validationErrors.year}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* Preview Section */}
          {(data.degree || data.institution || data.year) && (
            <div
              style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-glass)',
              }}
            >
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                👀 Preview
              </h4>
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h5
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {data.degree || 'Your Degree'}
                </h5>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--primary-color)',
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                  }}
                >
                  {data.institution || 'Your Institution'}
                </p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {data.year ? `Class of ${data.year}` : 'Graduation Year'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
