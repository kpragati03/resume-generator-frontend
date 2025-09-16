import React from 'react';

const CreativeTemplate = ({ data, isDarkMode }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;

  const getDarkerShade = (hex) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const themeColors = {
    light: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#1a202c',
      textSecondary: '#4a5568',
      textMuted: '#64748b',
      borderGlass: 'rgba(226, 232, 240, 0.6)',
      shadowSm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.08)',
      shadowLg: '0 12px 30px rgba(0, 0, 0, 0.08)',
      accentColor: color || '#667eea',
      secondaryColor: '#764ba2'
    },
    dark: {
      bgPrimary: '#1a202c',
      bgSecondary: '#2d3748',
      textPrimary: '#f7fafc',
      textSecondary: '#e2e8f0',
      textMuted: '#a0aec0',
      borderGlass: 'rgba(139, 92, 246, 0.2)',
      shadowSm: '0 4px 15px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 8px 25px rgba(139, 92, 246, 0.15)',
      shadowLg: '0 20px 40px rgba(139, 92, 246, 0.2)',
      accentColor: '#8b5cf6',
      secondaryColor: '#06b6d4'
    }
  };

  const colors = themeColors[isDarkMode ? 'dark' : 'light'];
  const primaryColor = colors.accentColor;

  const getComplementaryColor = (hex, opacity = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'YN';
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  const styles = {
    header: {
      width: '35%',
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${getDarkerShade(primaryColor)} 100%)`,
      color: '#ffffff',
      padding: '2.5rem 2rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      borderRadius: '16px 0 0 16px',
      boxShadow: isDarkMode ? 'inset 0 0 50px rgba(255, 255, 255, 0.1), 0 0 30px rgba(139, 92, 246, 0.3)' : 'none'
    },
    headerPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)',
      pointerEvents: 'none'
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      color: '#ffffff'
    },
    name: {
      fontSize: '1.8rem',
      fontWeight: '800',
      margin: '0 0 0.6rem 0',
      letterSpacing: '-0.025em',
      textShadow: isDarkMode
        ? '0 2px 8px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.2)'
        : '0 2px 8px rgba(0,0,0,0.15)',
      color: '#ffffff'
    },
    profession: {
      fontSize: '1rem',
      fontWeight: '400',
      opacity: '0.9',
      margin: '0 0 1.5rem 0',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
      color: '#ffffff'
    },
    contactInfo: {
      marginTop: '2.5rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '1rem',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '12px',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255,255,255,0.3)',
      transition: 'all 0.3s ease',
      boxShadow: isDarkMode ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
      color: '#ffffff',
      fontSize: '0.85rem',
      fontWeight: '500'
    }
  };

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
        borderRadius: '16px',
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
        background: isDarkMode
          ? 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)'
          : `linear-gradient(135deg, ${getComplementaryColor(colors.accentColor, 0.03)} 0%, rgba(255,255,255,0.98) 100%)`,
        zIndex: -1
      }}></div>

      {/* Geometric shapes */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50% 20% 80% 30%',
        opacity: isDarkMode ? '0.12' : '0.06',
        zIndex: -1,
        animation: 'float 20s ease-in-out infinite',
        background: isDarkMode
          ? 'linear-gradient(45deg, #8b5cf6, #06b6d4)'
          : `linear-gradient(45deg, ${colors.accentColor}, ${getDarkerShade(colors.accentColor)})`,
        top: '-100px',
        right: '-100px'
      }}></div>

      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50% 20% 80% 30%',
        opacity: isDarkMode ? '0.12' : '0.06',
        zIndex: -1,
        animation: 'float 20s ease-in-out infinite reverse',
        animationDelay: '-7s',
        background: isDarkMode
          ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
          : `linear-gradient(135deg, ${colors.accentColor}, ${getDarkerShade(colors.accentColor)})`,
        bottom: '20%',
        left: '-75px'
      }}></div>

      {/* Dark Mode Exclusive Effects */}
      {isDarkMode && (
        <>
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            top: '-150px',
            right: '-150px',
            animation: 'nebula-pulse 8s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            bottom: '-100px',
            left: '-100px',
            animation: 'nebula-pulse 8s ease-in-out infinite',
            animationDelay: '-4s',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            zIndex: 0,
            opacity: '0.3'
          }}></div>
        </>
      )}

      <div style={{ display: 'flex', minHeight: '100%', position: 'relative', zIndex: 1 }}>
        {/* Creative Sidebar - FIXED */}
        <header style={styles.header} className="header">
          <div style={styles.headerPattern}></div>
          <div style={styles.headerContent} className="header-content">
            {/* Profile Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                  animation: 'pulse 3s ease-in-out infinite',
                  boxShadow: isDarkMode ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none'
                }}></div>

                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  border: '3px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.15)',
                  position: 'relative',
                  zIndex: 1,
                  textShadow: isDarkMode ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none',
                  color: '#ffffff'
                }}>
                  {getInitials(name)}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '140px',
                  height: '140px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: 0,
                  animation: 'glow 4s ease-in-out infinite'
                }}></div>
              </div>

              <h1 style={styles.name} className="name">
                {name || 'Your Name'}
              </h1>
              <p style={styles.profession} className="profession">
                {profession || 'Your Profession'}
              </p>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'rgba(255,255,255,0.6)',
                margin: '0 auto',
                borderRadius: '2px',
                boxShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
              }}></div>
            </div>

            {/* Contact Section */}
            <div style={styles.contactInfo} className="contact-info">
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                paddingBottom: '0.8rem',
                borderBottom: '2px solid rgba(255,255,255,0.4)',
                textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
                color: '#ffffff'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="12" cy="7" r="4" stroke="#ffffff" strokeWidth="2" />
                </svg>
                Contact
              </h3>

              <div style={styles.contactItem} className="contact-item">
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '8px',
                  marginRight: '1rem',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : 'none'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#ffffff" strokeWidth="2" />
                    <polyline points="22,6 12,13 2,6" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
                {email || 'your.email@example.com'}
              </div>

              <div style={styles.contactItem} className="contact-item">
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '8px',
                  marginRight: '1rem',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : 'none'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
                {phone || '+1 (555) 123-4567'}
              </div>

              <div style={styles.contactItem} className="contact-item">
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '8px',
                  marginRight: '1rem',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : 'none'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="12" cy="10" r="3" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
                {address || 'Your Address, City, State'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: '2.5rem 2rem',
          position: 'relative',
          zIndex: 1,
          background: colors.bgPrimary,
          borderRadius: '0 16px 16px 0'
        }}>

          {/* Experience Section */}
          {experience && experience.length > 0 && experience[0].company && (
            <section style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                color: colors.accentColor,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '4px',
                  height: '100%',
                  background: isDarkMode
                    ? `linear-gradient(180deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                    : `linear-gradient(180deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                  borderRadius: '2px',
                  position: 'absolute',
                  left: '-1rem',
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
                </svg>
                Professional Experience
              </h2>

              <div style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: colors.shadowLg,
                border: `1px solid ${colors.borderGlass}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(15px)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                    : `linear-gradient(90deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                  boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
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
                      margin: '0 0 0.6rem 0',
                      textShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                    }}>
                      {experience[0].company}
                    </p>
                  </div>

                  <div style={{
                    background: isDarkMode
                      ? 'rgba(139, 92, 246, 0.2)'
                      : `${getComplementaryColor(colors.accentColor, 0.15)}`,
                    color: colors.accentColor,
                    padding: '0.6rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: `1px solid ${isDarkMode
                      ? 'rgba(139, 92, 246, 0.4)'
                      : `${getComplementaryColor(colors.accentColor, 0.3)}`}`,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexShrink: 0,
                    backdropFilter: 'blur(10px)',
                    boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}30` : 'none'
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
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
          {education && education.length > 0 && education[0].degree && (
            <section style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                color: colors.accentColor,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '4px',
                  height: '100%',
                  background: isDarkMode
                    ? `linear-gradient(180deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                    : `linear-gradient(180deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                  borderRadius: '2px',
                  position: 'absolute',
                  left: '-1rem',
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Education
              </h2>

              <div style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: colors.shadowLg,
                border: `1px solid ${colors.borderGlass}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(15px)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                    : `linear-gradient(90deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                  boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
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
                      : `${getComplementaryColor(colors.accentColor, 0.15)}`,
                    color: colors.accentColor,
                    padding: '0.6rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: `1px solid ${isDarkMode
                     ? 'rgba(139, 92, 246, 0.4)'
                      : `${getComplementaryColor(colors.accentColor, 0.25)}`}`,
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

          {/* Skills Section */}
          {skillsArray.length > 0 && (
            <section style={{ position: 'relative' }}>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                color: colors.accentColor,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '4px',
                  height: '100%',
                  background: isDarkMode
                    ? `linear-gradient(180deg, ${colors.accentColor} 0%, ${colors.secondaryColor} 100%)`
                    : `linear-gradient(180deg, ${colors.accentColor} 0%, ${getDarkerShade(colors.accentColor)} 100%)`,
                  borderRadius: '2px',
                  position: 'absolute',
                  left: '-1rem',
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" />
                </svg>
                Core Skills
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.2rem',
                marginTop: '1.2rem'
              }}>
                {skillsArray.map((skill, index) => (
                  <div key={index} style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'white',
                    padding: '1.5rem 1.2rem',
                    borderRadius: '14px',
                    textAlign: 'center',
                    boxShadow: colors.shadowMd,
                    border: `2px solid ${colors.borderGlass}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(15px)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${getComplementaryColor(colors.accentColor, 0.08)} 0%, transparent 100%)`
                        : `linear-gradient(135deg, ${getComplementaryColor(colors.accentColor, 0.05)} 0%, transparent 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}></div>

                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem'
                    }}>
                      <span style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: colors.accentColor,
                        margin: '0',
                        textShadow: isDarkMode ? `0 0 8px ${colors.accentColor}` : 'none'
                      }}>
                        {skill}
                      </span>
                      <div style={{
                        color: colors.accentColor,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        filter: isDarkMode ? `drop-shadow(0 0 5px ${colors.accentColor})` : 'none'
                      }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                          <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State for when no content is available */}
          {!experience?.length && !education?.length && !skillsArray.length && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              color: colors.textMuted,
              background: isDarkMode 
                ? 'rgba(139, 92, 246, 0.05)' 
                : `${getComplementaryColor(colors.accentColor, 0.03)}`,
              borderRadius: '20px',
              border: `2px dashed ${isDarkMode 
                ? 'rgba(139, 92, 246, 0.3)' 
                : `${getComplementaryColor(colors.accentColor, 0.2)}`}`,
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
                Ready for Your Creative Touch
              </h3>
              <p style={{
                fontSize: '1.1rem',
                margin: '0',
                lineHeight: '1.5'
              }}>
                Add your information to bring this creative resume to life
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(15px) rotate(240deg); }
        }
        @keyframes nebula-pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.1);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        
        .contact-item:hover {
          background: rgba(255,255,255,0.3) !important;
          transform: translateY(-2px);
        }
        
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
          }
          
          .header { 
            background: ${primaryColor} !important; 
            color: #ffffff !important; 
          }
          
          .name { 
            color: #ffffff !important; 
          }
          
          .profession { 
            color: #ffffff !important; 
          }
          
          .contact-item { 
            color: #ffffff !important; 
          }
          
          .header * {
            color: #ffffff !important;
          }
          
          .header svg {
            stroke: #ffffff !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreativeTemplate;