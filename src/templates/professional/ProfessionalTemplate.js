import React, { useState, useEffect } from 'react';

const ProfessionalTemplate = ({ data, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { color, name, profession, email, phone, address, education, experience, skills } = data || {};
  const primaryColor = color || (isDarkMode ? '#6366f1' : '#3b82f6');
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 };
  };
  
  const rgb = hexToRgb(primaryColor);
  const primaryRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  
  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [
    'JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design', 'Project Management'
  ];

  const getDarkerShade = (hex) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const styles = {
    container: {
      minHeight: '297mm',
      background: isDarkMode ? 
        'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)' :
        'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8f4f8 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
      padding: '2rem',
      position: 'relative',
      transition: 'all 0.3s ease',
      pageBreakInside: 'avoid'
    },
    
    backgroundElement1: {
      position: 'fixed',
      top: '10%',
      right: '15%',
      width: '300px',
      height: '300px',
      background: isDarkMode ?
        'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' :
        `radial-gradient(circle, rgba(${primaryRgb}, 0.1) 0%, transparent 70%)`,
      borderRadius: '50%',
      zIndex: 0,
      animation: 'float 6s ease-in-out infinite',
      filter: 'blur(20px)'
    },
    
    backgroundElement2: {
      position: 'fixed',
      bottom: '15%',
      left: '10%',
      width: '400px',
      height: '400px',
      background: isDarkMode ?
        'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)' :
        'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      borderRadius: '50%',
      zIndex: 0,
      animation: 'float 8s ease-in-out infinite reverse',
      filter: 'blur(25px)'
    },

    resumeContainer: {
      maxWidth: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.10)' : 
        'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRadius: '20px',
      border: isDarkMode ? 
        '1px solid rgba(255, 255, 255, 0.2)' : 
        '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: isDarkMode ?
        '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 100px rgba(99, 102, 241, 0.15)' :
        '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 100px rgba(99, 102, 241, 0.1)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10,
      transition: 'all 0.3s ease'
    },

    header: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${getDarkerShade(primaryColor)} 100%)`,
      padding: '2.5rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      color: '#ffffff'
    },

    headerPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.4
    },

    headerContent: {
      position: 'relative',
      zIndex: 2,
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '1.5rem',
      alignItems: 'center'
    },

    nameSection: {
      color: '#ffffff'
    },

    name: {
      fontSize: 'clamp(2.2rem, 4vw, 3rem)',
      fontWeight: '800',
      margin: '0 0 0.4rem 0',
      letterSpacing: '-0.02em',
      lineHeight: '1.1',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      color: '#ffffff'
    },

    profession: {
      fontSize: '1.1rem',
      fontWeight: '500',
      margin: '0',
      opacity: '0.95',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: '#ffffff'
    },

    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      alignItems: 'flex-end'
    },

    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontSize: '0.85rem',
      fontWeight: '500',
      padding: '0.4rem 0.8rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '40px',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      color: '#ffffff'
    },

    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      minHeight: '500px'
    },

    leftColumn: {
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.05)' : 
        'rgba(248, 250, 252, 0.8)',
      padding: '2rem 1.5rem',
      borderRight: isDarkMode ?
        '1px solid rgba(255, 255, 255, 0.1)' :
        '1px solid rgba(226, 232, 240, 0.5)',
      transition: 'all 0.3s ease'
    },

    rightColumn: {
      padding: '2rem 1.5rem',
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.03)' : 
        'rgba(255, 255, 255, 0.6)',
      transition: 'all 0.3s ease'
    },

    sectionTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: isDarkMode ? '#e2e8f0' : '#1e293b',
      marginBottom: '1.2rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      position: 'relative',
      paddingBottom: '0.6rem',
      transition: 'color 0.3s ease'
    },

    sectionTitleLine: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50px',
      height: '2px',
      background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
      borderRadius: '1px'
    },

    skillsContainer: {
      display: 'grid',
      gap: '0.8rem',
      marginBottom: '1.5rem'
    },

    skillItem: {
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(255, 255, 255, 0.8)',
      padding: '0.8rem 1rem',
      borderRadius: '10px',
      border: isDarkMode ?
        '1px solid rgba(255, 255, 255, 0.1)' :
        '1px solid rgba(226, 232, 240, 0.5)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    },

    skillItemHover: {
      transform: 'translateY(-2px)',
      boxShadow: isDarkMode ?
        '0 8px 25px rgba(99, 102, 241, 0.2)' :
        '0 8px 25px rgba(0, 0, 0, 0.1)',
      borderColor: `rgba(${primaryRgb}, 0.4)`,
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.12)' : 
        'rgba(255, 255, 255, 0.95)'
    },

    skillName: {
      fontSize: '0.8rem',
      fontWeight: '600',
      color: isDarkMode ? '#e2e8f0' : '#334155',
      marginBottom: '0.4rem',
      transition: 'color 0.3s ease'
    },

    skillBar: {
      width: '100%',
      height: '4px',
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(226, 232, 240, 0.8)',
      borderRadius: '2px',
      overflow: 'hidden'
    },

    skillProgress: {
      height: '100%',
      background: `linear-gradient(90deg, ${primaryColor}, rgba(${primaryRgb}, 0.8))`,
      borderRadius: '2px',
      transition: 'width 1s ease-out'
    },

    educationCard: {
      background: isDarkMode ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(255, 255, 255, 0.9)',
      padding: '1.2rem',
      borderRadius: '12px',
      border: isDarkMode ?
        '1px solid rgba(255, 255, 255, 0.1)' :
        '1px solid rgba(226, 232, 240, 0.5)',
      marginBottom: '0.8rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)'
    },

    degree: {
      fontSize: '1rem',
      fontWeight: '700',
      color: isDarkMode ? '#e2e8f0' : '#1e293b',
      marginBottom: '0.4rem',
      lineHeight: '1.3',
      transition: 'color 0.3s ease'
    },

    institution: {
      fontSize: '0.9rem',
      color: primaryColor,
      fontWeight: '600',
      marginBottom: '0.4rem'
    },

    year: {
      fontSize: '0.75rem',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      fontWeight: '500',
      background: isDarkMode ? 
        'rgba(99, 102, 241, 0.15)' : 
        'rgba(248, 250, 252, 0.8)',
      padding: '0.2rem 0.6rem',
      borderRadius: '15px',
      display: 'inline-block',
      border: isDarkMode ? 
        '1px solid rgba(99, 102, 241, 0.3)' : 
        'none',
      transition: 'all 0.3s ease'
    },

    experienceItem: {
      marginBottom: '2rem',
      position: 'relative',
      paddingLeft: '1.2rem'
    },

    experienceTimeline: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '3px',
      height: '100%',
      background: `linear-gradient(180deg, ${primaryColor}, rgba(${primaryRgb}, 0.3))`,
      borderRadius: '2px'
    },

    experienceTimelineDot: {
      position: 'absolute',
      left: '-3px',
      top: '6px',
      width: '9px',
      height: '9px',
      background: primaryColor,
      borderRadius: '50%',
      border: isDarkMode ? 
        '2px solid rgba(255, 255, 255, 0.1)' : 
        '2px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },

    roleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.8rem',
      gap: '0.8rem'
    },

    role: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: isDarkMode ? '#e2e8f0': '#1e293b',
      margin: '0',
      lineHeight: '1.3',
      transition: 'color 0.3s ease'
    },

    company: {
      fontSize: '1rem',
      color:primaryColor,
      fontWeight: '600',
      margin: '0.2rem 0 0 0'
    },

    duration: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      fontWeight: '500',
      background: isDarkMode ?
        'rgba(99, 102, 241, 0.15)' :
        `rgba(${primaryRgb}, 0.1)`,
      padding: '0.4rem 0.8rem',
      borderRadius: '15px',
      whiteSpace: 'nowrap',
      border: isDarkMode ?
        '1px solid rgba(99, 102, 241, 0.3)' :
        `1px solid rgba(${primaryRgb}, 0.2)`,
      transition: 'all 0.3s ease'
    },

    description: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#94a3b8' : '#475569',
      lineHeight: '1.6',
      marginBottom: '0.8rem',
      transition: 'color 0.3s ease'
    },

    summary: {
      background: isDarkMode ?
        'rgba(99, 102, 241, 0.08)' :
        `linear-gradient(135deg, rgba(${primaryRgb}, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)`,
      padding: '1.5rem',
      borderRadius: '12px',
      border: isDarkMode ?
        '1px solid rgba(99, 102, 241, 0.2)' :
        '1px solid rgba(226, 232, 240, 0.5)',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      transition: 'all 0.3s ease'
    },

    summaryText: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#94a3b8' : '#475569',
      lineHeight: '1.7',
      margin: '0',
      fontStyle: 'italic',
      position: 'relative',
      zIndex: 2,
      transition: 'color 0.3s ease'
    },

    loadingContainer: {
      minHeight: '100vh',
      background: isDarkMode ?
        'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)' :
        'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8f4f8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease'
    },

    loadingSpinner: {
      width: '2.5rem',
      height: '2.5rem',
      border: isDarkMode ? 
        '3px solid rgba(99, 102, 241, 0.2)' : 
        '3px solid #e2e8f0',
      borderTop: isDarkMode ?
        '3px solid #6366f1' :
        '3px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    }
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      .professional-template {
        box-shadow: none !important;
        border-radius: 0 !important;
        min-height: auto !important;
        padding: 0 !important;
        background: white !important;
      }
      
      .resume-container {
        border-radius: 0 !important;
        box-shadow: none !important;
        border: none !important;
        max-width: none !important;
        background: white !important;
      }
      
      .header {
        padding: 20px 15px !important;
        background: ${primaryColor} !important;
        color: #ffffff !important;
      }
      
      .name {
        font-size: 24px !important;
        color: #ffffff !important;
      }
      
      .profession {
        color: #ffffff !important;
      }
      
      .contact-item {
        color: #ffffff !important;
      }
      
      .main-content {
        font-size: 12px !important;
      }
      
      .section-title {
        font-size: 14px !important;
      }
      
      .background-element-1,
      .background-element-2 {
        display: none !important;
      }
    }
    
    @media (max-width: 768px) {
      .header-content {
        grid-template-columns: 1fr !important;
        text-align: center !important;
        gap: 1.2rem !important;
      }
      .contact-info {
        align-items: center !important;
      }
      .main-content {
        grid-template-columns: 1fr !important;
      }
      .left-column {
        border-right: none !important;
        border-bottom: ${isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.5)'} !important;
      }
      .container {
        padding: 1rem !important;
      }
      .resume-container {
        border-radius: 12px !important;
      }
    }
  `;

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.loadingSpinner}></div>
          <p style={{ 
            color: isDarkMode ? '#94a3b8' : '#64748b', 
            fontWeight: '500', 
            fontSize: '1rem'
          }}>
            Crafting your professional resume...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{keyframes}</style>
      <div 
        data-pdf-content="true"
        className="professional-template"
        style={styles.container}
      >
        <div style={styles.backgroundElement1} className="background-element-1"></div>
        <div style={styles.backgroundElement2} className="background-element-2"></div>

        <div style={styles.resumeContainer} className="resume-container">
          <header style={styles.header} className="header">
            <div style={styles.headerPattern}></div>
            <div style={styles.headerContent} className="header-content">
              <div>
                <h1 style={styles.name} className="name">
                  {name || 'Your Name'}
                </h1>
                <p style={styles.profession} className="profession">
                  {profession || 'Your Profession'}
                </p>
              </div>
              <div style={styles.contactInfo} className="contact-info">
                <div 
                  style={styles.contactItem}
                  className="contact-item"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.contactItem.background;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#ffffff" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="#ffffff" strokeWidth="2"/>
                  </svg>
                  {email || 'your.email@example.com'}
                </div>
                <div 
                  style={styles.contactItem}
                  className="contact-item"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.contactItem.background;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#ffffff" strokeWidth="2"/>
                  </svg>
                  {phone || '+1 (555) 123-4567'}
                </div>
                <div 
                  style={styles.contactItem}
                  className="contact-item"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.contactItem.background;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#ffffff" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="#ffffff" strokeWidth="2"/>
                  </svg>
                  {address || 'Your Address, City'}
                </div>
              </div>
            </div>
          </header>

          <div style={styles.mainContent} className="main-content">
            <div style={styles.leftColumn} className="left-column">
              {skillsArray.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={styles.sectionTitle} className="section-title">
                    Core Skills
                    <div style={styles.sectionTitleLine}></div>
                  </div>
                  <div style={styles.skillsContainer}>
                    {skillsArray.slice(0, 6).map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.skillItem,
                          ...(hoveredSkill === index ? styles.skillItemHover : {})
                        }}
                        className="skill-item"
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div style={styles.skillName} className="skill-name">{skill}</div>
                        <div style={styles.skillBar}>
                          <div
                            style={{
                              ...styles.skillProgress,
                              width: `${Math.max(75, 95 - (index * 3))}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education && education.length > 0 && education[0].degree && (
                <div>
                  <div style={styles.sectionTitle} className="section-title">
                    Education
                    <div style={styles.sectionTitleLine}></div>
                  </div>
                  <div 
                    style={styles.educationCard}
                    className="education-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = isDarkMode ?
                        '0 12px 35px rgba(99, 102, 241, 0.15)' :
                        '0 12px 35px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4 style={styles.degree} className="degree">{education[0].degree}</h4>
                    <p style={styles.institution} className="institution">{education[0].institution}</p>
                    <span style={styles.year}>{education[0].year}</span>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.rightColumn} className="right-column">
              <div style={{ marginBottom: '2rem' }}>
                <div style={styles.sectionTitle} className="section-title">
                  Professional Summary
                  <div style={styles.sectionTitleLine}></div>
                </div>
                <div style={styles.summary} className="summary">
                  <p style={styles.summaryText} className="summary-text">
                    {profession ? 
                      `Experienced ${profession.toLowerCase()} with a proven track record of delivering exceptional results. Skilled in leading innovative projects, fostering collaborative environments, and implementing cutting-edge solutions that drive measurable business growth and operational excellence.` :
                      'Dynamic professional with extensive expertise in delivering high-quality results across diverse, fast-paced environments. Proven ability to lead cross-functional teams, optimize processes, and maintain unwavering commitment to excellence while driving innovation and strategic growth.'
                    }
                  </p>
                </div>
              </div>

              {experience && experience.length > 0 && experience[0].company && (
                <div>
                  <div style={styles.sectionTitle} className="section-title">
                    Professional Experience
                    <div style={styles.sectionTitleLine}></div>
                  </div>
                  <div style={styles.experienceItem} className="experience-item">
                    <div style={styles.experienceTimeline}></div>
                    <div style={styles.experienceTimelineDot}></div>
                    
                    <div style={styles.roleHeader}>
                      <div>
                        <h3 style={styles.role} className="role">{experience[0].role}</h3>
                        <p style={styles.company} className="company">{experience[0].company}</p>
                      </div>
                      <div style={styles.duration}>
                        {experience[0].duration}
                      </div>
                    </div>
                    {experience[0].description && (
                      <div>
                        <p style={styles.description} className="description">
                          {experience[0].description}
                        </p>
                        
                        <div style={{
                          marginTop: '1.2rem',
                          padding: '1.2rem',
                          background: isDarkMode ?
                            'rgba(99, 102, 241, 0.08)' :
                            `rgba(${primaryRgb}, 0.05)`,
                          borderRadius: '10px',
                          border: isDarkMode ?
                            '1px solid rgba(99, 102, 241, 0.2)' :
                            `1px solid rgba(${primaryRgb}, 0.1)`,
                          position: 'relative',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease'
                        }}>
                          <h4 style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: primaryColor,
                            margin: '0 0 0.8rem 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            Key Achievements
                          </h4>
                          <div style={{
                            display: 'grid',
                            gap: '0.6rem',
                            fontSize: '0.85rem',
                            color: isDarkMode ? '#94a3b8' : '#475569',
                            transition: 'color 0.3s ease'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                              <span style={{ 
                                color: primaryColor, 
                                fontWeight: '600'
                              }}>•</span>
                              Successfully delivered complex projects within timeline and budget constraints
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                              <span style={{ 
                                color: primaryColor, 
                                fontWeight: '600'
                              }}>•</span>
                              Improved team efficiency by 40% through process optimization and automation
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                              <span style={{ 
                                color: primaryColor, 
                                fontWeight: '600'
                              }}>•</span>
                              Maintained 98% client satisfaction rating while scaling operations
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalTemplate;