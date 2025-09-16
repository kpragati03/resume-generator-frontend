import React, { useState, useEffect } from 'react';

const Skills = ({ handleInputChange, data, theme }) => {
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

  const isDarkMode = theme === 'dark';
  const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  // Theme colors
  const themeColors = {
    light: {
      bg: '#ffffff',
      bgSecondary: '#f8fafc',
      bgTertiary: '#f1f5f9',
      bgGlass: 'rgba(255, 255, 255, 0.8)',
      bgCard: 'rgba(255, 255, 255, 0.95)',
      textPrimary: '#1e293b',
      textSecondary: '#64748b',
      textMuted: '#94a3b8',
      border: '#e2e8f0',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      primary: '#667eea',
      success: '#10b981',
      shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    dark: {
      bg: '#0f172a',
      bgSecondary: '#1e293b',
      bgTertiary: '#334155',
      bgGlass: 'rgba(30, 41, 59, 0.8)',
      bgCard: 'rgba(30, 41, 59, 0.95)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      border: '#475569',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      primary: '#818cf8',
      success: '#34d399',
      shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
      gradientPrimary: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
      gradientSuccess: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    }
  };

  const currentTheme = themeColors[theme] || themeColors.light;

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

  const addSkillFromSuggestion = (skill) => {
    const currentSkills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    
    if (currentSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
    const inputValue = data.skills || '';
    const skillParts = inputValue.split(',').map(s => s.trim());
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

  const addSkillFromButton = (skill) => {
    const currentSkills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    
    if (currentSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
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
      'Node.js': '🟢',
      'Python': '🐍',
      'Java': '☕',
      'C++': 'C++',
      'SQL': '🗄️',
      'MongoDB': '🍃',
      'HTML/CSS': '🌐',
      'TypeScript': '🟦',
      'Vue.js': '💚',
      'Angular': '🅰️',
      'Express.js': '🚀',
      'Docker': '🐳',
      'AWS': '☁️',
      'Git': '🐙',
      'Agile': '🏃',
      'REST APIs': '🔗',
      'GraphQL': '📡',
      'Machine Learning': '🤖',
      'Data Analysis': '📊',
      'Project Management': '📋',
      'Communication': '🗣️',
      'Leadership': '👑'
    };
    return icons[skill] || '💡';
  };

  const progressPercentage = () => {
    const targetSkills = 8;
    return Math.min((skillsArray.length / targetSkills) * 100, 100);
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem 1rem',
    background: currentTheme.bg,
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  const cardStyle = {
    background: currentTheme.bgCard,
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: `1px solid ${currentTheme.borderGlass}`,
    boxShadow: currentTheme.shadowXl,
    padding: '2.5rem',
    transition: 'all 0.3s ease',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: currentTheme.bgGlass,
    borderRadius: '16px',
    border: `1px solid ${currentTheme.borderGlass}`,
    backdropFilter: 'blur(10px)',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    width: '60px',
    height: '60px',
    background: currentTheme.gradientPrimary,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: currentTheme.shadowMd,
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    color: currentTheme.textPrimary,
    background: currentTheme.gradientPrimary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    color: currentTheme.textSecondary,
    fontSize: '1rem',
    margin: 0,
    fontWeight: '500',
  };

  const progressContainerStyle = {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: currentTheme.bgGlass,
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: `1px solid ${currentTheme.borderGlass}`,
  };

  const progressHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  };

  const progressBarStyle = {
    height: '8px',
    background: currentTheme.bgTertiary,
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const progressFillStyle = {
    width: `${progressPercentage()}%`,
    height: '100%',
    background: currentTheme.gradientPrimary,
    borderRadius: '10px',
    transition: 'width 0.6s ease',
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '120px',
    padding: '1rem',
    background: focusedField === 'skills' ? currentTheme.bgTertiary : currentTheme.bgGlass,
    backdropFilter: 'blur(10px)',
    border: `2px solid ${focusedField === 'skills' ? currentTheme.primary : currentTheme.borderGlass}`,
    borderRadius: '12px',
    color: currentTheme.textPrimary,
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.3s ease',
    transform: focusedField === 'skills' ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: focusedField === 'skills' 
      ? `0 0 0 4px ${currentTheme.primary}20` 
      : currentTheme.shadowSm,
    outline: 'none',
  };

  const suggestionDropdownStyle = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    background: currentTheme.bgCard,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${currentTheme.borderGlass}`,
    borderRadius: '12px',
    boxShadow: currentTheme.shadowXl,
    zIndex: 1000,
    overflow: 'hidden',
  };

  const skillTagStyle = (index) => ({
    display: 'flex',
    alignItems: 'center',
    background: currentTheme.gradientPrimary,
    color: '#ffffff',
    padding: '0.75rem 1rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: currentTheme.shadowMd,
    transition: 'all 0.3s ease',
    animation: `fadeInUp 0.4s ease ${index * 0.05}s both`,
    cursor: 'pointer',
  });

  const popularSkillButtonStyle = (isAdded, index) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem 1rem',
    background: isAdded ? currentTheme.gradientSuccess : currentTheme.bgGlass,
    border: `1px solid ${isAdded ? currentTheme.success : currentTheme.borderGlass}`,
    borderRadius: '12px',
    color: isAdded ? '#ffffff' : currentTheme.textPrimary,
    cursor: isAdded ? 'default' : 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    animation: `fadeInUp 0.4s ease ${index * 0.03}s both`,
    opacity: isAdded ? 0.8 : 1,
  });

  // CSS animations
  const keyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Responsive styles
  const getResponsiveStyles = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    return {
      container: {
        ...containerStyle,
        padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
      },
      card: {
        ...cardStyle,
        padding: isMobile ? '1.5rem' : '2.5rem',
      },
      skillsGrid: {
        display: 'grid',
        gridTemplateColumns: isMobile 
          ? 'repeat(auto-fit, minmax(120px, 1fr))' 
          : isTablet 
          ? 'repeat(auto-fit, minmax(140px, 1fr))'
          : 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
      },
      tipsGrid: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: isMobile 
          ? '1fr' 
          : 'repeat(auto-fit, minmax(280px, 1fr))',
      },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <>
      <style>{keyframes}</style>
      <div style={responsiveStyles.container}>
        <div style={responsiveStyles.card}>
          {/* Header Section */}
          <div style={headerStyle}>
            <div style={iconStyle}>💡</div>
            <div>
              <h2 style={titleStyle}>Professional Skills</h2>
              <p style={subtitleStyle}>Showcase your technical and professional expertise</p>
            </div>
          </div>

          {/* Progress Section */}
          <div style={progressContainerStyle}>
            <div style={progressHeaderStyle}>
              <span style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: currentTheme.textPrimary
              }}>
                Skills Added: {skillsArray.length}/8+
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: currentTheme.primary
              }}>
                {Math.round(progressPercentage())}%
              </span>
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle}></div>
            </div>
          </div>

          {/* Skills Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: currentTheme.textPrimary,
              marginBottom: '0.75rem'
            }}>
              ⚡ Skills & Technologies
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                id="skills"
                name="skills"
                placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Project Management, Leadership)"
                value={currentInput}
                onChange={handleSkillInput}
                onFocus={() => {
                  setFocusedField('skills');
                  setShowSuggestions(filteredSuggestions.length > 0);
                }}
                onBlur={() => {
                  setFocusedField('');
                  setTimeout(() => setShowSuggestions(false), 300);
                }}
                rows="4"
                style={textareaStyle}
              />
              
              {/* Skills Suggestions Dropdown */}
              {showSuggestions && (
                <div style={suggestionDropdownStyle}>
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: currentTheme.bgGlass,
                    borderBottom: `1px solid ${currentTheme.border}`,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: currentTheme.textPrimary,
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
                          color: currentTheme.textPrimary,
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          marginBottom: '2px',
                          animation: `fadeInUp 0.3s ease ${index * 0.05}s both`
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          addSkillFromSuggestion(skill);
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = currentTheme.bgGlass;
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
                          color: currentTheme.primary
                        }}>
                          {getSkillIcon(skill)}
                        </span>
                        <span style={{ flex: 1 }}>{skill}</span>
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
              background: currentTheme.bgGlass,
              borderRadius: '16px',
              border: `1px solid ${currentTheme.borderGlass}`,
              backdropFilter: 'blur(10px)'
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
                  color: currentTheme.textPrimary,
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
                    background: currentTheme.gradientSuccess,
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
                    style={skillTagStyle(index)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px) scale(1.05)';
                      e.target.style.boxShadow = currentTheme.shadowXl;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = currentTheme.shadowMd;
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
              color: currentTheme.textPrimary,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔥 Popular Skills
            </h4>
            <div style={responsiveStyles.skillsGrid}>
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
                    style={popularSkillButtonStyle(isAdded, index)}
                    onMouseEnter={(e) => {
                      if (!isAdded) {
                        e.target.style.background = `${currentTheme.primary}20`;
                        e.target.style.borderColor = currentTheme.primary;
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = currentTheme.shadowLg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAdded) {
                        e.target.style.background = currentTheme.bgGlass;
                        e.target.style.borderColor = currentTheme.borderGlass;
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
            background: currentTheme.bgGlass,
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: `1px solid ${currentTheme.borderGlass}`
          }}>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: currentTheme.textPrimary,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              💎 Pro Tips for Skills Section
            </h4>
            <div style={responsiveStyles.tipsGrid}>
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
                    background: `${currentTheme.bgGlass}80`,
                    borderRadius: '12px',
                    border: `1px solid ${currentTheme.borderGlass}`,
                    animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                    backdropFilter: 'blur(5px)'
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
                    color: currentTheme.textSecondary,
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
              background: `${currentTheme.success}20`,
              border: `1px solid ${currentTheme.success}50`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              animation: 'fadeInUp 0.6s ease',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '2rem' }}>🎉</span>
              <div>
                <p style={{
                  margin: '0 0 0.25rem 0',
                  fontWeight: '700',
                  color: currentTheme.success,
                  fontSize: '1.1rem'
                }}>
                  Excellent work! Your skills section looks great!
                </p>
                <p style={{
                  margin: '0',
                  color: currentTheme.textSecondary,
                  fontSize: '0.95rem'
                }}>
                  You've added {skillsArray.length} skills. This will make your resume stand out!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Skills;
