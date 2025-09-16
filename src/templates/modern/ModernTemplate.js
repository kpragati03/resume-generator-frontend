import React from 'react';

const ModernTemplate = ({ data, isDarkMode }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;

  const themeColors = {
    light: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      bgGlass: 'rgba(255, 255, 255, 0.9)',
      textPrimary: '#1a202c',
      textSecondary: '#4a5568',
      textMuted: '#64748b',
      borderGlass: 'rgba(226, 232, 240, 0.15)',
      shadowSm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      shadowMd: '0 8px 25px rgba(0, 0, 0, 0.06)',
      shadowLg: '0 15px 35px rgba(0, 0, 0, 0.1)',
      accentColor: color || '#667eea',
      secondaryColor: '#764ba2'
    },
    dark: {
      bgPrimary: '#1a202c',
      bgSecondary: '#2d3748',
      bgGlass: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#f7fafc',
      textSecondary: '#e2e8f0',
      textMuted: '#a0aec0',
      borderGlass: 'rgba(139, 92, 246, 0.15)',
      shadowSm: '0 4px 15px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 8px 25px rgba(139, 92, 246, 0.15)',
      shadowLg: '0 25px 50px rgba(139, 92, 246, 0.2)',
      accentColor: '#8b5cf6',
      secondaryColor: '#06b6d4'
    }
  };

  const colors = themeColors[isDarkMode ? 'dark' : 'light'];

  const getLighterShade = (hex, opacity = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getDarkerShade = (hex) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 30);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];
  const hasExperience = experience && experience.length > 0 && experience[0].company;
  const hasEducation = education && education.length > 0 && education[0].degree;
  const hasSkills = skillsArray.length > 0;

  return (
    <div 
      data-pdf-content="true"
      style={{
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        background: colors.bgPrimary,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: colors.textPrimary,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isDarkMode 
          ? '0 0 0 1px rgba(139, 92, 246, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)' 
          : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 25px 50px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        pageBreakInside: 'avoid'
      }}
    >
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 
          `linear-gradient(${isDarkMode ? 'rgba(139, 92, 246, 0.08)' : 'rgba(102, 126, 234, 0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(139, 92, 246, 0.08)' : 'rgba(102, 126, 234, 0.03)'} 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        zIndex: -2
      }}></div>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode
          ? 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)'
          : `linear-gradient(135deg, ${getLighterShade(colors.accentColor, 0.02)} 0%, rgba(255,255,255,0.98) 100%)`,
        zIndex: -1
      }}></div>

      {/* Dark Mode Exclusive Effects */}
      {isDarkMode && (
        <>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 
              'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
            animation: 'grid-pulse 4s ease-in-out infinite',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            top: '10%',
            right: '5%',
            animation: 'hologram-float 12s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            bottom: '20%',
            left: '8%',
            animation: 'hologram-float 12s ease-in-out infinite',
            animationDelay: '-6s',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            left: '20%',
            width: '2px',
            height: '20px',
            background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, transparent 100%)',
            animation: 'stream-flow 3s linear infinite',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            right: '25%',
            width: '2px',
            height: '20px',
            background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.8) 0%, transparent 100%)',
            animation: 'stream-flow 3s linear infinite',
            animationDelay: '-1.5s',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
        </>
      )}
      
      {/* Modern Header */}
      <header style={{
        background: isDarkMode
          ? `linear-gradient(135deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
          : `linear-gradient(135deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
        color: '#ffffff',
        padding: '2.5rem 2rem',
        position: 'relative',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        marginBottom: '2rem',
        zIndex: 2,
        borderRadius: '12px 12px 0 0',
        boxShadow: isDarkMode ? '0 0 50px rgba(139, 92, 246, 0.4)' : 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.1) 100%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            : 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              margin: '0 0 0.6rem 0',
              letterSpacing: '-0.02em',
              textShadow: isDarkMode
                ? '0 4px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              lineHeight: 1.1,
              color: '#ffffff'
            }}>
              {name || 'Your Name'}
            </h1>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: '400',
              opacity: '0.95',
              margin: '0 0 1.2rem 0',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: isDarkMode ? '0 0 15px rgba(255,255,255,0.2)' : 'none',
              color: '#ffffff'
            }}>
              {profession || 'Your Profession'}
            </p>
            <div style={{
              width: '80px',
              height: '3px',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '2px',
              marginTop: '1.2rem',
              boxShadow: isDarkMode ? '0 0 15px rgba(255,255,255,0.3)' : 'none'
            }}></div>
          </div>

          <div style={{
            flexShrink: 0,
            minWidth: '280px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              {[
                { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#ffffff" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="#ffffff" strokeWidth="2"/></svg>, text: email || 'your.email@example.com' },
                { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#ffffff" strokeWidth="2"/></svg>, text: phone || '+1 (555) 123-4567' },
                { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#ffffff" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#ffffff" strokeWidth="2"/></svg>, text: address || 'Your Address, City' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.8rem 1rem',
                  background: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  transition: 'all 0.3s ease',
                  boxShadow: isDarkMode ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.25)',
                    borderRadius: '6px',
                    flexShrink: 0,
                    boxShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : 'none'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.3',
                    color: '#ffffff'
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <main style={{
        padding: '0 2rem 2rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Two Column Layout for Experience and Education */}
        {(hasExperience || hasEducation) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Experience Section */}
            {hasExperience && (
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: colors.accentColor,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Experience
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: isDarkMode
                      ? `linear-gradient(90deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                      : `linear-gradient(90deg, ${colors.accentColor} 0%, ${getLighterShade(colors.accentColor, 0.3)} 100%)`,
                    borderRadius: '1px',
                    boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
                  }}></div>
                </h2>
                
                <div style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: `1px solid ${colors.borderGlass}`,
                  boxShadow: colors.shadowMd,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '100%',
                    background: isDarkMode
                      ? `linear-gradient(180deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                      : `linear-gradient(180deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                    animation: 'pulse-width 2s ease-in-out infinite',
                    boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                  }}></div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.2rem',
                    gap: '1.2rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: colors.textPrimary,
                        margin: '0 0 0.6rem 0',
                        lineHeight: '1.3',
                        textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.2)' : 'none'
                      }}>
                        {experience[0].role}
                      </h3>
                      <p style={{
                        fontSize: '1.1rem',
                        color: colors.accentColor,
                        fontWeight: '600',
                        margin: '0',
                        textShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                      }}>
                        {experience[0].company}
                      </p>
                    </div>
                    
                    <div style={{
                      background: isDarkMode
                        ? 'rgba(139, 92, 246, 0.2)'
                        : `${getLighterShade(colors.accentColor, 0.15)}`,
                      color: colors.accentColor,
                      padding: '0.6rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      border: `1px solid ${isDarkMode
                        ? 'rgba(139, 92, 246, 0.4)'
                        : `${getLighterShade(colors.accentColor, 0.25)}`}`,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      flexShrink: 0,
                      backdropFilter: 'blur(10px)',
                      boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
                    }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {experience[0].duration}
                    </div>
                  </div>
                  
                  {experience[0].description && (
                    <p style={{
                      fontSize: '1rem',
                      color: colors.textSecondary,
                      lineHeight: '1.6',
                      margin: '1.2rem 0 0 0',
                      paddingTop: '1.2rem',
                      borderTop: `1px solid ${colors.borderGlass}`
                    }}>
                      {experience[0].description}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Education Section */}
            {hasEducation && (
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: colors.accentColor,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Education
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: isDarkMode
                      ? `linear-gradient(90deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                      : `linear-gradient(90deg, ${colors.accentColor} 0%, ${getLighterShade(colors.accentColor, 0.3)} 100%)`,
                    borderRadius: '1px',
                    boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
                  }}></div>
                </h2>
                
                <div style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: `1px solid ${colors.borderGlass}`,
                  boxShadow: colors.shadowMd,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '100%',
                    background: isDarkMode
                      ? `linear-gradient(180deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                      : `linear-gradient(180deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                    animation: 'pulse-width 2s ease-in-out infinite',
                    boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                  }}></div>

                  <div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: colors.textPrimary,
                      margin: '0 0 0.6rem 0',
                      lineHeight: '1.3',
                      textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.2)' : 'none'
                    }}>
                      {education[0].degree}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      color: colors.accentColor,
                      fontWeight: '600',
                      margin: '0 0 0.6rem 0',
                      textShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                    }}>
                      {education[0].institution}
                    </p>
                    <div style={{
                      background: isDarkMode
                        ? 'rgba(139, 92, 246, 0.2)'
                        : `${getLighterShade(colors.accentColor, 0.15)}`,
                      color: colors.accentColor,
                      padding: '0.6rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      border: `1px solid ${isDarkMode
                        ? 'rgba(139, 92, 246, 0.4)'
                        : `${getLighterShade(colors.accentColor, 0.25)}`}`,
                      marginTop: '1.2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backdropFilter: 'blur(10px)',
                      boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
                    }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Class of {education[0].year}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* Skills Section */}
        {hasSkills && (
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: colors.accentColor,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Core Skills
              <div style={{
                flex: 1,
                height: '2px',
                background: isDarkMode
                  ? `linear-gradient(90deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                  : `linear-gradient(90deg, ${colors.accentColor} 0%, ${getLighterShade(colors.accentColor, 0.3)} 100%)`,
                borderRadius: '1px',
                boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
              }}></div>
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              marginTop: '1.2rem'
            }}>
              {skillsArray.map((skill, index) => (
                <div key={index} style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                  padding: '1.5rem 1.2rem',
                  borderRadius: '14px',
                  textAlign: 'center',
                  border: `2px solid ${colors.borderGlass}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isDarkMode 
                    ? '0 8px 25px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                    : colors.shadowSm
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${getLighterShade(colors.accentColor, 0.1)} 0%, transparent 100%)`
                      : `linear-gradient(135deg, ${getLighterShade(colors.accentColor, 0.08)} 0%, transparent 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}></div>

                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: colors.accentColor,
                      margin: '0',
                      textShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                    }}>
                      {skill}
                    </span>
                    <div style={{
                      width: '30px',
                      height: '2px',
                      background: colors.accentColor,
                      borderRadius: '1px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      boxShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!hasExperience && !hasEducation && !hasSkills && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            color: colors.textMuted,
            background: isDarkMode 
              ? 'rgba(139, 92, 246, 0.05)' 
              : `${getLighterShade(colors.accentColor, 0.03)}`,
            borderRadius: '20px',
            border: `2px dashed ${isDarkMode 
              ? 'rgba(139, 92, 246, 0.3)' 
              : `${getLighterShade(colors.accentColor, 0.2)}`}`,
            margin: '2rem 0',
            backdropFilter: 'blur(15px)'
          }}>
            <div style={{
              color: colors.accentColor,
              marginBottom: '1.5rem',
              filter: isDarkMode ? `drop-shadow(0 0 15px ${colors.accentColor})` : 'none'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.textPrimary,
              margin: '0 0 0.8rem 0',
              textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none'
            }}>
              Ready for Your Information
            </h3>
            <p style={{
              fontSize: '1.1rem',
              margin: '0',
              lineHeight: '1.5'
            }}>
              Fill out the form to see your professional resume come to life
            </p>
          </div>
        )}
      </main>

      <style jsx>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          div[data-pdf-content="true"] {
            box-shadow: none !important;
            border-radius: 0 !important;
            min-height: auto !important;
            max-width: none !important;
            margin: 0 !important;
            page-break-inside: avoid;
            font-size: 12px !important;
          }
          
          h1 {
            font-size: 24px !important;
            color: #ffffff !important;
          }
          
          h2 {
            font-size: 16px !important;
          }
          
          h3 {
            font-size: 14px !important;
          }
          
          header {
            padding: 20px 15px !important;
          }
          
          main {
            padding: 0 15px 15px 15px !important;
          }
          
          .two-column-layout {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes hologram-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          33% { 
            transform: translateY(-30px) scale(1.1);
            opacity: 0.7;
          }
          66% { 
            transform: translateY(15px) scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes stream-flow {
          0% { 
            top: -20px;
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes pulse-width {
          0%, 100% { width: 3px; }
          50% { width: 5px; }
        }
      `}</style>
    </div>
  );
};

export default ModernTemplate;