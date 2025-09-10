import React, { useState, useEffect } from 'react';

const ProfessionalTemplate = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { color, name, profession, email, phone, address, education, experience, skills } = data || {};
  const primaryColor = color || '#6366f1';
  
  // Enhanced color utilities
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 99, g: 102, b: 241 };
  };
  
  const rgb = hexToRgb(primaryColor);
  const primaryRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  
  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [
    'JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design', 'Project Management'
  ];

  // Modern glassmorphism styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8f4f8 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
      padding: '2rem',
      position: 'relative'
    },
    
    // Floating background elements
    backgroundElement1: {
      position: 'fixed',
      top: '10%',
      right: '15%',
      width: '300px',
      height: '300px',
      background: `radial-gradient(circle, rgba(${primaryRgb}, 0.1) 0%, transparent 70%)`,
      borderRadius: '50%',
      zIndex: 0,
      animation: 'float 6s ease-in-out infinite'
    },
    
    backgroundElement2: {
      position: 'fixed',
      bottom: '15%',
      left: '10%',
      width: '400px',
      height: '400px',
      background: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)`,
      borderRadius: '50%',
      zIndex: 0,
      animation: 'float 8s ease-in-out infinite reverse'
    },

    // Main resume container with glassmorphism
    resumeContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 100px rgba(99, 102, 241, 0.1)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10,
      transition: 'all 0.3s ease'
    },

    // Modern header section
    header: {
      background: `linear-gradient(135deg, rgba(${primaryRgb}, 0.95) 0%, rgba(${primaryRgb}, 0.85) 100%)`,
      padding: '3rem 2.5rem',
      position: 'relative',
      overflow: 'hidden'
    },

    headerPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.3
    },

    headerContent: {
      position: 'relative',
      zIndex: 2,
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem',
      alignItems: 'center'
    },

    nameSection: {
      color: 'white'
    },

    name: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      margin: '0 0 0.5rem 0',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: '1.1'
    },

    profession: {
      fontSize: '1.25rem',
      fontWeight: '500',
      margin: '0',
      opacity: '0.95',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: 'rgba(255, 255, 255, 0.9)'
    },

    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'flex-end'
    },

    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: 'rgba(255, 255, 255, 0.95)',
      fontSize: '0.95rem',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },

    // Main content area
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      minHeight: '600px'
    },

    // Left sidebar
    leftColumn: {
      background: 'rgba(248, 250, 252, 0.8)',
      padding: '2.5rem 2rem',
      borderRight: '1px solid rgba(226, 232, 240, 0.5)',
      position: 'relative'
    },

    // Right main content
    rightColumn: {
      padding: '2.5rem 2rem',
      background: 'rgba(255, 255, 255, 0.6)'
    },

    // Section styling
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      position: 'relative',
      paddingBottom: '0.75rem'
    },

    sectionTitleLine: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '60px',
      height: '3px',
      background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
      borderRadius: '2px'
    },

    // Skills section
    skillsContainer: {
      display: 'grid',
      gap: '1rem',
      marginBottom: '2rem'
    },

    skillItem: {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '1rem 1.25rem',
      borderRadius: '12px',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },

    skillItemHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      borderColor: `rgba(${primaryRgb}, 0.3)`
    },

    skillName: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '0.5rem'
    },

    skillBar: {
      width: '100%',
      height: '6px',
      background: 'rgba(226, 232, 240, 0.8)',
      borderRadius: '3px',
      overflow: 'hidden',
      position: 'relative'
    },

    skillProgress: {
      height: '100%',
      background: `linear-gradient(90deg, ${primaryColor}, rgba(${primaryRgb}, 0.8))`,
      borderRadius: '3px',
      position: 'relative',
      transition: 'width 1s ease-out'
    },

    // Education section
    educationCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },

    degree: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem',
      lineHeight: '1.3'
    },

    institution: {
      fontSize: '1rem',
      color: primaryColor,
      fontWeight: '600',
      marginBottom: '0.5rem'
    },

    year: {
      fontSize: '0.85rem',
      color: '#64748b',
      fontWeight: '500',
      background: 'rgba(248, 250, 252, 0.8)',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      display: 'inline-block'
    },

    // Experience section
    experienceItem: {
      marginBottom: '2.5rem',
      position: 'relative',
      paddingLeft: '1.5rem'
    },

    experienceTimeline: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '4px',
      height: '100%',
      background: `linear-gradient(180deg, ${primaryColor}, rgba(${primaryRgb}, 0.3))`,
      borderRadius: '2px'
    },

    experienceTimelineDot: {
      position: 'absolute',
      left: '-4px',
      top: '8px',
      width: '12px',
      height: '12px',
      background: primaryColor,
      borderRadius: '50%',
      border: '3px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },

    roleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
      gap: '1rem'
    },

    role: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0',
      lineHeight: '1.3'
    },

    company: {
      fontSize: '1.1rem',
      color: primaryColor,
      fontWeight: '600',
      margin: '0.25rem 0 0 0'
    },

    duration: {
      fontSize: '0.9rem',
      color: '#64748b',
      fontWeight: '500',
      background: `rgba(${primaryRgb}, 0.1)`,
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      whiteSpace: 'nowrap',
      border: `1px solid rgba(${primaryRgb}, 0.2)`
    },

    description: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.7',
      marginBottom: '1rem'
    },

    // Professional Summary
    summary: {
      background: `linear-gradient(135deg, rgba(${primaryRgb}, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)`,
      padding: '2rem',
      borderRadius: '16px',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      marginBottom: '2.5rem',
      position: 'relative',
      overflow: 'hidden'
    },

    summaryIcon: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      opacity: '0.1',
      fontSize: '3rem'
    },

    summaryText: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.8',
      margin: '0',
      fontStyle: 'italic',
      position: 'relative',
      zIndex: 2
    },

    // Loading state
    loadingContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8f4f8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },

    loadingSpinner: {
      width: '3rem',
      height: '3rem',
      border: '4px solid #e2e8f0',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },

    // Responsive styles
    '@media (max-width: 768px)': {
      container: {
        padding: '1rem'
      },
      resumeContainer: {
        borderRadius: '16px'
      },
      headerContent: {
        gridTemplateColumns: '1fr',
        textAlign: 'center',
        gap: '1.5rem'
      },
      contactInfo: {
        alignItems: 'center'
      },
      mainContent: {
        gridTemplateColumns: '1fr'
      },
      leftColumn: {
        borderRight: 'none',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
      }
    }
  };

  // Add keyframes for animations
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
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
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.loadingSpinner}></div>
          <p style={{ color: '#64748b', fontWeight: '500', fontSize: '1.1rem' }}>
            Crafting your professional resume...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Floating background elements */}
        <div style={styles.backgroundElement1}></div>
        <div style={styles.backgroundElement2}></div>
        
        {/* Floating Action Buttons */}
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          gap: '0.75rem'
        }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.75rem',
            borderRadius: '50%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            👁️
          </button>
          <button style={{
            background: `linear-gradient(135deg, ${primaryColor}, rgba(${primaryRgb}, 0.8))`,
            border: 'none',
            padding: '0.75rem',
            borderRadius: '50%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            📥
          </button>
        </div>

        {/* Main Resume Container */}
        <div style={styles.resumeContainer}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.headerPattern}></div>
            <div style={styles.headerContent}>
              <div style={styles.nameSection}>
                <h1 style={styles.name}>{name || 'Your Name'}</h1>
                <p style={styles.profession}>{profession || 'Your Profession'}</p>
              </div>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span>📧</span>
                  <span>{email || 'your.email@example.com'}</span>
                </div>
                <div style={styles.contactItem}>
                  <span>📱</span>
                  <span>{phone || '+1 (555) 123-4567'}</span>
                </div>
                <div style={styles.contactItem}>
                  <span>📍</span>
                  <span>{address || 'Your Address, City'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={styles.mainContent}>
            {/* Left Column */}
            <div style={styles.leftColumn}>
              {/* Skills Section */}
              {skillsArray.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={styles.sectionTitle}>
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
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div style={styles.skillName}>{skill}</div>
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

              {/* Education Section */}
              {education && education.length > 0 && education[0].degree && (
                <div>
                  <div style={styles.sectionTitle}>
                    Education
                    <div style={styles.sectionTitleLine}></div>
                  </div>
                  <div style={styles.educationCard}>
                    <h4 style={styles.degree}>{education[0].degree}</h4>
                    <p style={styles.institution}>{education[0].institution}</p>
                    <span style={styles.year}>{education[0].year}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div style={styles.rightColumn}>
              {/* Professional Summary */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={styles.sectionTitle}>
                  Professional Summary
                  <div style={styles.sectionTitleLine}></div>
                </div>
                <div style={styles.summary}>
                  <div style={styles.summaryIcon}>✨</div>
                  <p style={styles.summaryText}>
                    {profession ? 
                      `Experienced ${profession.toLowerCase()} with a proven track record of delivering exceptional results. Skilled in leading innovative projects, fostering collaborative environments, and implementing cutting-edge solutions that drive measurable business growth and operational excellence.` :
                      'Dynamic professional with extensive expertise in delivering high-quality results across diverse, fast-paced environments. Proven ability to lead cross-functional teams, optimize processes, and maintain unwavering commitment to excellence while driving innovation and strategic growth.'
                    }
                  </p>
                </div>
              </div>

              {/* Experience Section */}
              {experience && experience.length > 0 && experience[0].company && (
                <div>
                  <div style={styles.sectionTitle}>
                    Professional Experience
                    <div style={styles.sectionTitleLine}></div>
                  </div>
                  <div style={styles.experienceItem}>
                    <div style={styles.experienceTimeline}></div>
                    <div style={styles.experienceTimelineDot}></div>
                    
                    <div style={styles.roleHeader}>
                      <div>
                        <h3 style={styles.role}>{experience[0].role}</h3>
                        <p style={styles.company}>{experience[0].company}</p>
                      </div>
                      <div style={styles.duration}>
                        {experience[0].duration}
                      </div>
                    </div>
                    
                    {experience[0].description && (
                      <div>
                        <p style={styles.description}>
                          {experience[0].description}
                        </p>
                        
                        <div style={{
                          marginTop: '1.5rem',
                          padding: '1.5rem',
                          background: `rgba(${primaryRgb}, 0.05)`,
                          borderRadius: '12px',
                          border: `1px solid rgba(${primaryRgb}, 0.1)`,
                          position: 'relative'
                        }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: primaryColor,
                            margin: '0 0 1rem 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            🏆 Key Achievements
                          </h4>
                          <div style={{
                            display: 'grid',
                            gap: '0.75rem',
                            fontSize: '0.95rem',
                            color: '#475569'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <span style={{ color: primaryColor, fontWeight: '600' }}>•</span>
                              Successfully delivered complex projects within timeline and budget constraints
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <span style={{ color: primaryColor, fontWeight: '600' }}>•</span>
                              Improved team efficiency by 40% through process optimization and automation
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <span style={{ color: primaryColor, fontWeight: '600' }}>•</span>
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