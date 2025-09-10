import React, { useState } from 'react';

const Experience = ({ handleInputChange, data }) => {
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

  const getFieldIcon = (fieldName) => {
    const icons = {
      company: '🏢',
      role: '👔',
      duration: '⏰',
      description: '📝'
    };
    return icons[fieldName] || '💼';
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="modern-card fade-in-up">
        <div className="card-content">
          {/* Header Section */}
          <div className="card-header">
            <div className="card-icon">
              💼
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Work Experience
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
                Showcase your professional journey and achievements
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border-glass)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Experience Profile Completion
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--primary-color)'
              }}>
                {progressPercentage()}%
              </span>
            </div>
            <div style={{
              height: '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progressPercentage()}%`,
                height: '100%',
                background: 'var(--gradient-primary)',
                borderRadius: '10px',
                transition: 'width 0.6s ease'
              }}></div>
            </div>
          </div>

          {/* Form Section */}
          <form className="fade-in">
            <div style={{ display: 'grid', gap: '2rem' }}>
              {/* First Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Company Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getFieldIcon('company')} Company / Organization *
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
                      className="form-input"
                      style={{
                        background: focusedField === 'company' ? 'var(--bg-tertiary)' : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${focusedField === 'company' ? 'var(--primary-color)' : 'var(--border-glass)'}`,
                        transform: focusedField === 'company' ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: focusedField === 'company' 
                          ? '0 0 0 4px rgba(102, 126, 234, 0.1)' 
                          : 'var(--shadow-sm)'
                      }}
                    />
                    {data.company && (
                      <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--success-color)',
                        fontSize: '1.2rem'
                      }}>
                        ✅
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getFieldIcon('role')} Job Title / Role *
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
                      className="form-input"
                      style={{
                        background: focusedField === 'role' ? 'var(--bg-tertiary)' : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${focusedField === 'role' ? 'var(--primary-color)' : 'var(--border-glass)'}`,
                        transform: focusedField === 'role' ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: focusedField === 'role' 
                          ? '0 0 0 4px rgba(102, 126, 234, 0.1)' 
                          : 'var(--shadow-sm)'
                      }}
                    />
                    {data.role && (
                      <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--success-color)',
                        fontSize: '1.2rem'
                      }}>
                        ✅
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Duration Field - Centered */}
              <div style={{
                maxWidth: '400px',
                margin: '0 auto',
                width: '100%'
              }}>
                <div className="form-group">
                  <label className="form-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getFieldIcon('duration')} Duration / Period
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
                      className="form-input"
                      style={{
                        background: focusedField === 'duration' ? 'var(--bg-tertiary)' : 'var(--bg-glass)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${focusedField === 'duration' ? 'var(--primary-color)' : 'var(--border-glass)'}`,
                        transform: focusedField === 'duration' ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: focusedField === 'duration' 
                          ? '0 0 0 4px rgba(102, 126, 234, 0.1)' 
                          : 'var(--shadow-sm)'
                      }}
                    />
                    {data.duration && (
                      <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--success-color)',
                        fontSize: '1.2rem'
                      }}>
                        ✅
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description Field - Full Width */}
              <div className="form-group">
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getFieldIcon('description')} Job Description / Key Achievements
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
                    className="form-textarea"
                    rows="6"
                    style={{
                      background: focusedField === 'description' ? 'var(--bg-tertiary)' : 'var(--bg-glass)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${focusedField === 'description' ? 'var(--primary-color)' : 'var(--border-glass)'}`,
                      transform: focusedField === 'description' ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: focusedField === 'description' 
                        ? '0 0 0 4px rgba(102, 126, 234, 0.1)' 
                        : 'var(--shadow-sm)',
                      minHeight: '150px'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-card)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-glass)'
                  }}>
                    {charCount} characters
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Preview Section */}
          {(data.company || data.role || data.duration || data.description) && (
            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              background: 'var(--bg-glass)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-glass)'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👀 Experience Preview
              </h4>
              <div style={{
                background: 'var(--bg-primary)',
                padding: '2rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <h5 style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem'
                    }}>
                      {data.role || 'Your Role'}
                    </h5>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'var(--primary-color)',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      {data.company || 'Company Name'}
                    </p>
                  </div>
                  {data.duration && (
                    <div style={{
                      background: 'var(--bg-glass)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-glass)'
                    }}>
                      {data.duration}
                    </div>
                  )}
                </div>
                {data.description && (
                 <div style={{
                   marginTop: '1rem',
                   padding: '1rem',
                   background: 'var(--bg-glass)',
                   borderRadius: '8px',
                   border: '1px solid var(--border-glass)'
                 }}>
                   <p style={{
                     fontSize: '0.95rem',
                     color: 'var(--text-secondary)',
                     lineHeight: '1.6',
                     margin: 0,
                     whiteSpace: 'pre-wrap'
                   }}>
                     {data.description}
                   </p>
                 </div>
               )}
             </div>
           </div>
         )}

         {/* Writing Tips Section */}
         <div style={{
           marginTop: '2rem',
           padding: '2rem',
           background: 'var(--bg-glass)',
           backdropFilter: 'blur(10px)',
           borderRadius: 'var(--border-radius)',
           border: '1px solid var(--border-glass)'
         }}>
           <h4 style={{
             fontSize: '1.2rem',
             fontWeight: '600',
             color: 'var(--text-primary)',
             marginBottom: '1.5rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}>
             💡 Experience Section Tips
           </h4>
           <div style={{ 
             display: 'grid', 
             gap: '1rem',
             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
           }}>
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
                   background: 'rgba(255, 255, 255, 0.05)',
                   borderRadius: '12px',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                 }}
               >
                 <span style={{ 
                   fontSize: '1.25rem',
                   minWidth: '24px',
                   marginTop: '0.125rem'
                 }}>
                   {tip.icon}
                 </span>
                 <span style={{
                   fontSize: '0.95rem',
                   color: 'var(--text-secondary)',
                   lineHeight: '1.5'
                 }}>
                   {tip.text}
                 </span>
               </div>
             ))}
           </div>
         </div>

         {/* Example Phrases Section */}
         <div style={{
           marginTop: '2rem',
           padding: '2rem',
           background: 'var(--bg-glass)',
           backdropFilter: 'blur(10px)',
           borderRadius: 'var(--border-radius)',
           border: '1px solid var(--border-glass)'
         }}>
           <h4 style={{
             fontSize: '1.2rem',
             fontWeight: '600',
             color: 'var(--text-primary)',
             marginBottom: '1.5rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}>
             ✍️ Power Phrases to Use
           </h4>
           <div style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
             gap: '1rem'
           }}>
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
                   background: 'rgba(102, 126, 234, 0.1)',
                   border: '1px solid rgba(102, 126, 234, 0.2)',
                   borderRadius: '8px',
                   fontSize: '0.9rem',
                   color: 'var(--primary-color)',
                   fontWeight: '500',
                   textAlign: 'center',
                   animation: `fadeInUp 0.4s ease ${index * 0.05}s both`
                 }}
               >
                 {phrase}
               </div>
             ))}
           </div>
         </div>

         {/* Success Message */}
         {progressPercentage() >= 75 && (
           <div style={{
             marginTop: '2rem',
             padding: '1.5rem 2rem',
             background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
             border: '1px solid rgba(16, 185, 129, 0.3)',
             borderRadius: 'var(--border-radius)',
             display: 'flex',
             alignItems: 'center',
             gap: '1rem',
             animation: 'fadeInUp 0.6s ease'
           }}>
             <span style={{ fontSize: '2rem' }}>🎉</span>
             <div>
               <p style={{
                 margin: '0 0 0.25rem 0',
                 fontWeight: '700',
                 color: 'var(--success-color)',
                 fontSize: '1.1rem'
               }}>
                 Excellent work! Your experience section is well-detailed!
               </p>
               <p style={{
                 margin: '0',
                 color: 'var(--text-secondary)',
                 fontSize: '0.95rem'
               }}>
                 This comprehensive experience will make a strong impression on employers
               </p>
             </div>
           </div>
         )}

         {/* Character Count Warning */}
         {charCount > 500 && (
           <div style={{
             marginTop: '1rem',
             padding: '1rem 1.5rem',
             background: 'rgba(245, 158, 11, 0.1)',
             border: '1px solid rgba(245, 158, 11, 0.3)',
             borderRadius: 'var(--border-radius)',
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem'
           }}>
             <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
             <div>
               <p style={{
                 margin: '0 0 0.25rem 0',
                 fontWeight: '600',
                 color: 'var(--warning-color)',
                 fontSize: '0.95rem'
               }}>
                 Consider keeping it concise
               </p>
               <p style={{
                 margin: '0',
                 color: 'var(--text-secondary)',
                 fontSize: '0.875rem'
               }}>
                 Aim for 2-4 key bullet points or 3-4 sentences for maximum impact
               </p>
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 );
};

export default Experience;