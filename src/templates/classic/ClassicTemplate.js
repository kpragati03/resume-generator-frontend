import React, { useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const ClassicTemplate = ({ data, isDarkMode }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;
  const resumeRef = useRef();

  // Hide export PDF options when Classic template is active
  useEffect(() => {
    // Hide Export PDF and Download Resume buttons
    const exportButtons = document.querySelectorAll('button');
    exportButtons.forEach(button => {
      const buttonText = button.textContent.toLowerCase();
      if (buttonText.includes('export pdf') || 
          buttonText.includes('download resume') || 
          buttonText.includes('export') && buttonText.includes('pdf')) {
        button.style.display = 'none';
      }
    });

    // Alternative approach - hide by common class names or IDs
    const elementsToHide = [
      '.export-pdf-btn',
      '.download-resume-btn', 
      '#export-pdf-button',
      '#download-resume-button',
      '[data-action="export-pdf"]',
      '[data-action="download-resume"]'
    ];

    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) el.style.display = 'none';
      });
    });

    // Cleanup function to restore buttons when component unmounts
    return () => {
      exportButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('export pdf') || 
            buttonText.includes('download resume') || 
            buttonText.includes('export') && buttonText.includes('pdf')) {
          button.style.display = '';
        }
      });

      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el) el.style.display = '';
        });
      });
    };
  }, []);

  const downloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    html2pdf().set(opt).from(element).save();
  };

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
      textPrimary: '#2d3748',
      textSecondary: '#4a5568',
      textMuted: '#718096',
      borderColor: 'rgba(226, 232, 240, 0.8)',
      shadowSm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.08)',
      shadowLg: '0 8px 25px rgba(0, 0, 0, 0.08)',
      accentColor: color || '#667eea',
      headerColor: color || '#667eea'
    },
    dark: {
      bgPrimary: '#1a202c',
      bgSecondary: '#2d3748',
      textPrimary: '#f7fafc',
      textSecondary: '#e2e8f0',
      textMuted: '#a0aec0',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      shadowSm: '0 4px 15px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 8px 25px rgba(139, 92, 246, 0.15)',
      shadowLg: '0 20px 40px rgba(139, 92, 246, 0.2)',
      accentColor: '#8b5cf6',
      headerColor: '#8b5cf6'
    }
  };

  const colors = themeColors[isDarkMode ? 'dark' : 'light'];
  const primaryColor = colors.headerColor;
  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  const styles = {
    header: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${getDarkerShade(primaryColor)} 100%)`,
      padding: '2.5rem 2.5rem',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2,
      borderRadius: '12px 12px 0 0',
      boxShadow: isDarkMode ? '0 0 40px rgba(139, 92, 246, 0.3)' : 'none',
      color: '#ffffff'
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: '#ffffff'
    },
    name: {
      fontSize: '2.8rem',
      fontWeight: '800',
      margin: '0 0 0.8rem 0',
      letterSpacing: '-0.02em',
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      color: '#ffffff'
    },
    profession: {
      fontSize: '1.3rem',
      fontWeight: '400',
      margin: '0',
      opacity: '1',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      color: '#ffffff'
    },
    whiteIcon: {
      color: '#ffffff',
      WebkitTextFillColor: '#ffffff',
      MozTextFillColor: '#ffffff',
      textFillColor: '#ffffff',
      filter: 'brightness(0) invert(1)',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  };

  return (
    <>
      <button 
        onClick={downloadPDF}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: colors.accentColor,
          color: '#ffffff',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
      >
        Download PDF
      </button>

      <div 
        ref={resumeRef}
        data-pdf-content="true"
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          background: colors.bgPrimary,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1.4,
          color: colors.textPrimary,
          position: 'relative',
          overflow: 'visible',
          boxShadow: isDarkMode 
            ? '0 0 0 1px rgba(139, 92, 246, 0.2), 0 25px 50px rgba(0, 0, 0, 0.5)' 
            : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 25px 50px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          borderRadius: '12px'
        }}
      >
        {/* Background Effects for Dark Mode */}
        {isDarkMode && (
          <>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>
          </>
        )}

        {/* Header Section */}
        <header style={styles.header} className="header">
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode
              ? 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 60%), linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '300px',
            height: '300px',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            transform: 'rotate(45deg)'
          }}></div>

          <div style={styles.headerContent} className="header-content">
            <h1 style={styles.name} className="name">
              {name || 'Your Name'}
            </h1>
            <p style={styles.profession} className="profession">
              {profession || 'Your Profession'}
            </p>
          </div>
        </header>

        {/* Content Section */}
        <div style={{
          padding: '1.5rem 2rem 2rem 2rem',
          background: colors.bgPrimary,
          position: 'relative',
          zIndex: 2
        }}>
          {/* Contact Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: colors.accentColor,
              fontSize: '1.3rem',
              fontWeight: '700',
              margin: '0 0 1.5rem 0',
              paddingBottom: '0.8rem',
              borderBottom: `3px solid ${colors.accentColor}`,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              position: 'relative',
              textShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: colors.accentColor,
                borderRadius: '8px',
                flexShrink: 0,
                boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
              }}>
                <span style={styles.whiteIcon}>●</span>
              </div>
              Contact Information
              <div style={{
                position: 'absolute',
                bottom: '-3px',
                left: 0,
                width: '60px',
                height: '3px',
                background: isDarkMode 
                  ? `linear-gradient(90deg, ${colors.accentColor}, #06b6d4)` 
                  : `linear-gradient(90deg, ${colors.accentColor}, transparent)`,
                boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
              }}></div>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {[
                { symbol: '@', text: email || 'your.email@example.com' },
                { symbol: '☎', text: phone || '+1 (555) 123-4567' },
                { symbol: '◐', text: address || 'Your Address, City, State' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1.2rem',
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '12px',
                  border: `1px solid ${colors.borderColor}`,
                  borderLeft: `6px solid ${colors.accentColor}`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  boxShadow: colors.shadowSm
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDarkMode 
                      ? `linear-gradient(135deg, ${colors.accentColor}08 0%, transparent 100%)` 
                      : `linear-gradient(135deg, ${colors.accentColor}05 0%, transparent 100%)`
                  }}></div>
                  
                  <div style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: colors.accentColor,
                    borderRadius: '10px',
                    marginRight: '1.2rem',
                    flexShrink: 0,
                    boxShadow: isDarkMode 
                      ? `0 4px 12px ${colors.accentColor}60, 0 0 15px ${colors.accentColor}40` 
                      : `0 4px 12px ${colors.accentColor}40`
                  }}>
                    <span style={{
                      ...styles.whiteIcon,
                      fontSize: '18px'
                    }}>
                      {item.symbol}
                    </span>
                  </div>
                  
                  <span style={{
                    fontSize: '1rem',
                    color: colors.textSecondary,
                    fontWeight: '500',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          {education && education.length > 0 && education[0].degree && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: colors.accentColor,
                fontSize: '1.3rem',
                fontWeight: '700',
                margin: '0 0 1.5rem 0',
                paddingBottom: '0.8rem',
                borderBottom: `3px solid ${colors.accentColor}`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                textShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: colors.accentColor,
                  borderRadius: '8px',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}>
                  <span style={styles.whiteIcon}>◆</span>
                </div>
                Education
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: isDarkMode 
                    ? `linear-gradient(90deg, ${colors.accentColor}, #06b6d4)` 
                    : `linear-gradient(90deg, ${colors.accentColor}, transparent)`,
                  boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
                }}></div>
              </h2>

              <div style={{
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '2rem',
                borderRadius: '16px',
                border: `1px solid ${colors.borderColor}`,
                borderLeft: `6px solid ${colors.accentColor}`,
                position: 'relative',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: colors.shadowMd
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '2rem',
                  width: '12px',
                  height: '12px',
                  background: colors.accentColor,
                  border: `3px solid ${colors.bgPrimary}`,
                  borderRadius: '50%',
                  boxShadow: isDarkMode 
                    ? `0 0 0 3px ${colors.accentColor}40, 0 0 12px ${colors.accentColor}` 
                    : `0 0 0 3px ${colors.accentColor}40`
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
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
                  <p style={{
                    fontSize: '0.9rem',
                    color: colors.textMuted,
                    margin: '0',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: colors.accentColor,
                      borderRadius: '50%',
                      marginRight: '0.6rem',
                      boxShadow: isDarkMode ? `0 0 6px ${colors.accentColor}` : 'none'
                    }}></span>
                    Class of {education[0].year}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Professional Experience */}
          {experience && experience.length > 0 && experience[0].company && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: colors.accentColor,
                fontSize: '1.3rem',
                fontWeight: '700',
                margin: '0 0 1.5rem 0',
                paddingBottom: '0.8rem',
                borderBottom: `3px solid ${colors.accentColor}`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                textShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: colors.accentColor,
                  borderRadius: '8px',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}>
                  <span style={styles.whiteIcon}>■</span>
                </div>
                Professional Experience
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: isDarkMode 
                    ? `linear-gradient(90deg, ${colors.accentColor}, #06b6d4)` 
                    : `linear-gradient(90deg, ${colors.accentColor}, transparent)`,
                  boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
                }}></div>
              </h2>

              <div style={{
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '2rem',
                borderRadius: '16px',
                border: `1px solid ${colors.borderColor}`,
                borderLeft: `6px solid ${colors.accentColor}`,
                position: 'relative',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: colors.shadowMd
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '2rem',
                  width: '12px',
                  height: '12px',
                  background: colors.accentColor,
                  border: `3px solid ${colors.bgPrimary}`,
                  borderRadius: '50%',
                  boxShadow: isDarkMode 
                    ? `0 0 0 3px ${colors.accentColor}40, 0 0 12px ${colors.accentColor}` 
                    : `0 0 0 3px ${colors.accentColor}40`
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
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
                  <p style={{
                    fontSize: '0.9rem',
                    color: colors.textMuted,
                    margin: '0 0 1rem 0',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: colors.accentColor,
                      borderRadius: '50%',
                      marginRight: '0.6rem',
                      boxShadow: isDarkMode ? `0 0 6px ${colors.accentColor}` : 'none'
                    }}></span>
                    {experience[0].duration}
                  </p>
                  {experience[0].description && (
                    <p style={{
                      fontSize: '1rem',
                      color: colors.textSecondary,
                      lineHeight: '1.6',
                      margin: '0',
                      paddingTop: '0.8rem',
                      borderTop: `1px solid ${colors.borderColor}`
                    }}>
                      {experience[0].description}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Skills */}
          {skillsArray.length > 0 && (
            <section style={{ marginBottom: '2rem', pageBreakInside: 'avoid' }} className="skills-section">
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: colors.accentColor,
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0 0 1rem 0',
                paddingBottom: '0.6rem',
                borderBottom: `3px solid ${colors.accentColor}`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                textShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: colors.accentColor,
                  borderRadius: '6px',
                  flexShrink: 0,
                  boxShadow: isDarkMode ? `0 0 15px ${colors.accentColor}` : 'none'
                }}>
                  <span style={{...styles.whiteIcon, fontSize: '14px'}}>★</span>
                </div>
                Core Skills
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: '50px',
                  height: '3px',
                  background: isDarkMode 
                    ? `linear-gradient(90deg, ${colors.accentColor}, #06b6d4)` 
                    : `linear-gradient(90deg, ${colors.accentColor}, transparent)`,
                  boxShadow: isDarkMode ? `0 0 10px ${colors.accentColor}` : 'none'
                }}></div>
              </h2>

              <div className="skills-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem',
                marginTop: '0.8rem',
                pageBreakInside: 'avoid'
              }}>
                {skillsArray.map((skill, index) => (
                  <div key={index} className="skill-pill" style={{
                    background: `linear-gradient(135deg, ${colors.accentColor} 0%, ${colors.headerColor} 100%)`,
                    padding: '0.6rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    boxShadow: isDarkMode 
                      ? `0 3px 8px ${colors.accentColor}40, 0 0 12px ${colors.accentColor}20` 
                      : `0 3px 8px ${colors.accentColor}30`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    display: 'inline-block'
                  }}>
                    <span style={{
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      MozTextFillColor: '#ffffff',
                      textFillColor: '#ffffff',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                      position: 'relative',
                      zIndex: 2,
                      display: 'inline-block',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <style jsx>{`
          @media print {
            @page {
              size: A4;
              margin: 15mm 10mm 15mm 10mm;
            }
            
            html, body {
              height: auto !important;
              overflow: visible !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            body {
              background: #ffffff !important;
            }
            
            div[data-pdf-content="true"] {
              position: static !important;
              margin: 0 !important;
              width: 100% !important;
              height: auto !important;
              min-height: auto !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              overflow: visible !important;
              page-break-inside: auto !important;
            }

            div[data-pdf-content="true"] > div:first-child:not(.header):not([style*="padding"]) {
              display: none !important;
            }
            
            .header > div:not(.header-content) {
              display: none !important;
            }
            
            .header-content {
              display: block !important;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-shadow: none !important;
            }

            .header { 
              background: ${primaryColor} !important; 
              color: #ffffff !important;
              padding: 1.2rem 1.5rem !important;
              border-radius: 0 !important;
              page-break-after: avoid !important;
            }
            
            .name { 
              color: #ffffff !important;
              font-size: 1.8rem !important;
              margin: 0 0 0.3rem 0 !important;
            }
            
            .profession { 
              color: #ffffff !important;
              font-size: 0.9rem !important;
              margin: 0 !important;
            }
            
            .header * {
              color: #ffffff !important;
            }

            div[style*="padding: 1.5rem 2rem 2rem 2rem"] {
              padding: 1rem 1.2rem 1rem 1.2rem !important;
            }

            section {
              margin-bottom: 1.2rem !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            .skills-section {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              margin-bottom: 0.8rem !important;
            }

            section:last-of-type {
              margin-bottom: 0.5rem !important;
            }

            h2 {
              font-size: 1rem !important;
              margin: 0 0 0.8rem 0 !important;
              padding-bottom: 0.4rem !important;
              page-break-after: avoid !important;
            }

            div[style*="padding: 1.2rem"] {
              padding: 0.6rem !important;
            }

            div[style*="padding: 2rem"] {
              padding: 1rem !important;
            }

            h3 {
              font-size: 0.95rem !important;
              margin: 0 0 0.2rem 0 !important;
            }

            p {
              font-size: 0.8rem !important;
              line-height: 1.3 !important;
              margin: 0 0 0.3rem 0 !important;
            }

            .skill-pill {
              background: ${colors.accentColor} !important;
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
              text-fill-color: #ffffff !important;
              -moz-text-fill-color: #ffffff !important;
              padding: 0.3rem 0.6rem !important;
              font-size: 0.7rem !important;
              margin: 0.1rem !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            .skills-container {
              gap: 0.4rem !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            .skills-container .skill-pill span {
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
              text-fill-color: #ffffff !important;
              -moz-text-fill-color: #ffffff !important;
              font-size: 0.7rem !important;
            }

            div[style*="width: 24px"] {
              width: 18px !important;
              height: 18px !important;
            }

            div[style*="width: 20px"] {
              width: 16px !important;
              height: 16px !important;
            }

            div[style*="width: 40px"] {
              width: 28px !important;
              height: 28px !important;
            }

            span[style*="font-size: 18px"] {
              font-size: 14px !important;
            }

            span[style*="font-size: 14px"] {
              font-size: 10px !important;
            }

            /* Ensure skills section doesn't break */
            .skills-section {
              orphans: 3 !important;
              widows: 3 !important;
            }

            /* Force skills to stay together */
            .skills-container {
              display: block !important;
              column-count: auto !important;
            }

            .skill-pill {
              display: inline-block !important;
              vertical-align: top !important;
            }

            /* Hide download button in PDF */
            button {
              display: none !important;
            }
          }

          .skill-pill {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            text-fill-color: #ffffff !important;
            -moz-text-fill-color: #ffffff !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) !important;
          }

          .skills-container .skill-pill {
            color: #ffffff !important;
          }

          .skills-container * {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            text-fill-color: #ffffff !important;
            -moz-text-fill-color: #ffffff !important;
          }

          @keyframes float-particle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(120deg); }
            66% { transform: translateY(15px) rotate(240deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ClassicTemplate;