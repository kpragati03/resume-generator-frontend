import React, { useState, useEffect } from 'react';

const Skills = ({ handleInputChange, data }) => {
  const [skillSuggestions] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB',
    'HTML/CSS', 'TypeScript', 'Vue.js', 'Angular', 'Express.js', 'Docker',
    'AWS', 'Git', 'Agile', 'REST APIs', 'GraphQL', 'Machine Learning',
    'Data Analysis', 'Project Management', 'Communication', 'Leadership'
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  const handleSkillInput = (e) => {
    const value = e.target.value;
    setCurrentInput(value);
    handleInputChange(e);

    if (value.length > 0) {
      const lastSkill = value.split(',').pop().trim();
      if (lastSkill.length > 0) {
        const filtered = skillSuggestions.filter(skill =>
          skill.toLowerCase().includes(lastSkill.toLowerCase()) &&
          !skillsArray.some(existingSkill => 
            existingSkill.toLowerCase() === skill.toLowerCase()
          )
        );
        setFilteredSuggestions(filtered.slice(0, 8));
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  // Fixed function to properly add skills from suggestions
  const addSkillFromSuggestion = (skill) => {
    const currentSkills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    
    // Check if skill already exists
    if (currentSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
    // Get the current input and find what the user was typing
    const inputValue = data.skills || '';
    const skillParts = inputValue.split(',').map(s => s.trim());
    
    // Remove the last incomplete skill and add the selected one
    const completedSkills = skillParts.slice(0, -1).filter(s => s);
    completedSkills.push(skill);
    
    const newSkills = completedSkills.join(', ');

    const syntheticEvent = {
      target: { name: 'skills', value: newSkills }
    };
    handleInputChange(syntheticEvent);
    setShowSuggestions(false);
    setCurrentInput(newSkills);
  };

  // Fixed function to add skills from popular skills buttons
  const addSkillFromButton = (skill) => {
    const currentSkills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    
    // Check if skill already exists
    if (currentSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
    // Add the new skill to existing skills
    const newSkills = currentSkills.length > 0 ? [...currentSkills, skill].join(', ') : skill;

    const syntheticEvent = {
      target: { name: 'skills', value: newSkills }
    };
    handleInputChange(syntheticEvent);
    setCurrentInput(newSkills);
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skillsArray
      .filter(skill => skill !== skillToRemove)
      .join(', ');
    
    const syntheticEvent = {
      target: { name: 'skills', value: updatedSkills }
    };
    handleInputChange(syntheticEvent);
    setCurrentInput(updatedSkills);
  };

  useEffect(() => {
    setCurrentInput(data.skills || '');
  }, [data.skills]);

  const getSkillIcon = (skill) => {
    const icons = {
      'JavaScript': '⚡',
      'React': '⚛️',
      'Python': '🐍',
      'Java': '☕',
      'Node.js': '🟢',
      'AWS': '☁️',
      'Docker': '🐳',
      'Git': '📚',
      'MongoDB': '🍃',
      'SQL': '🗄️'
    };
    return icons[skill] || '💡';
  };

  const progressPercentage = () => {
    const targetSkills = 8;
    return Math.min((skillsArray.length / targetSkills) * 100, 100);
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="modern-card fade-in-up">
        <div className="card-content">
          {/* Header Section */}
          <div className="card-header">
            <div className="card-icon">
              💡
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Professional Skills
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
                Showcase your technical and professional expertise
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
                Skills Added: {skillsArray.length}/8+
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--primary-color)'
              }}>
                {Math.round(progressPercentage())}%
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

          {/* Skills Input */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚡ Skills & Technologies
              </span>
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                id="skills"
                name="skills"
                className="form-textarea"
                placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Project Management, Leadership)"
                value={currentInput}
                onChange={handleSkillInput}
                onFocus={() => {
                  setFocusedField('skills');
                  setShowSuggestions(filteredSuggestions.length > 0);
                }}
                onBlur={() => {
                  setFocusedField('');
                  // Increased timeout to allow clicks on suggestions
                  setTimeout(() => setShowSuggestions(false), 300);
                }}
                rows="4"
                style={{
                  background: focusedField === 'skills' ? 'var(--bg-tertiary)' : 'var(--bg-glass)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${focusedField === 'skills' ? 'var(--primary-color)' : 'var(--border-glass)'}`,
                  transform: focusedField === 'skills' ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: focusedField === 'skills' 
                    ? '0 0 0 4px rgba(102, 126, 234, 0.1)' 
                    : 'var(--shadow-sm)'
                }}
              />
              
              {/* Skills Suggestions Dropdown */}
              {showSuggestions && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'var(--bg-glass)',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🎯 Suggested Skills
                  </div>
                  <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    padding: '0.5rem'
                  }}>
                    {filteredSuggestions.map((skill, index) => (
                      <div
                        key={skill}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          marginBottom: '2px',
                          animation: `fadeInUp 0.3s ease ${index * 0.05}s both`
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent blur event
                          addSkillFromSuggestion(skill);
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--bg-glass)';
                          e.target.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        <span style={{
                          marginRight: '0.75rem',
                          fontSize: '1rem',
                          color: 'var(--primary-color)'
                        }}>
                          {getSkillIcon(skill)}
                        </span>
                        <span style={{ flex: 1 }}>{skill}</span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          opacity: 0
                        }}>
                          ➕
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Tags Display */}
          {skillsArray.length > 0 && (
            <div style={{
              marginBottom: '2rem',
              padding: '2rem',
              background: 'var(--bg-glass)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-glass)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🏆 Your Skills ({skillsArray.length})
                </h4>
                {skillsArray.length >= 5 && (
                  <div style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--gradient-success)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: '#ffffff'
                  }}>
                    Great Progress!
                  </div>
                )}
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {skillsArray.map((skill, index) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--gradient-primary)',
                      color: '#ffffff',
                      padding: '0.75rem 1rem',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 0.3s ease',
                      animation: `fadeInUp 0.4s ease ${index * 0.05}s both`,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px) scale(1.05)';
                      e.target.style.boxShadow = 'var(--shadow-xl)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'var(--shadow-md)';
                    }}
                  >
                    <span style={{ 
                      marginRight: '0.5rem',
                      fontSize: '1rem'
                    }}>
                      {getSkillIcon(skill)}
                    </span>
                    <span style={{ marginRight: '0.75rem' }}>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1)';
                      }}
                      title={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Skills Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔥 Popular Skills
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem'
            }}>
              {skillSuggestions.slice(0, 12).map((skill, index) => {
                const isAdded = skillsArray.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase());
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      if (!isAdded) {
                        addSkillFromButton(skill);
                      }
                    }}
                    disabled={isAdded}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.875rem 1rem',
                      background: isAdded 
                        ? 'var(--gradient-success)' 
                        : 'var(--bg-glass)',
                      border: `1px solid ${isAdded ? 'var(--success-color)' : 'var(--border-glass)'}`,
                      borderRadius: 'var(--border-radius)',
                      color: isAdded ? '#ffffff' : 'var(--text-primary)',
                      cursor: isAdded ? 'default' : 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)',
                      animation: `fadeInUp 0.4s ease ${index * 0.03}s both`,
                      opacity: isAdded ? 0.8 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isAdded) {
                        e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                        e.target.style.borderColor = 'var(--primary-color)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = 'var(--shadow-lg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAdded) {
                        e.target.style.background = 'var(--bg-glass)';
                        e.target.style.borderColor = 'var(--border-glass)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <span style={{
                      marginRight: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      {isAdded ? '✓' : getSkillIcon(skill)}
                    </span>
                    <span style={{ flex: 1, textAlign: 'left' }}>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tips Section */}
          <div style={{
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
              💎 Pro Tips for Skills Section
            </h4>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
            }}>
              {[
                { icon: '🎯', text: 'Include both technical and soft skills' },
                { icon: '🚀', text: 'Prioritize skills relevant to your target role' },
                { icon: '📚', text: 'Use industry-standard terminology' },
                { icon: '✨', text: 'Keep it concise but comprehensive' }
              ].map((tip, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
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
                    minWidth: '24px'
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

          {/* Encouragement Message */}
          {skillsArray.length >= 5 && (
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
                  Excellent work! Your skills section looks great!
                </p>
                <p style={{
                  margin: '0',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem'
                }}>
                  You've added {skillsArray.length} skills. This will make your resume stand out!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;