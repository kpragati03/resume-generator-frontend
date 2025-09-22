import React, { useState } from 'react';

const TemplateSelector = ({ handleColorChange, handleTemplateChange, selectedTemplate, selectedColor, theme }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const isDarkMode = theme === 'dark';

  const colors = [
    { 
      name: 'Midnight Blue', 
      hex: '#2c3e50',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    },
    { 
      name: 'Pacific Blue', 
      hex: '#1B6CA8',
      gradient: 'linear-gradient(135deg, #1B6CA8 0%, #4682B4 100%)',
    },
    { 
      name: 'Evergreen', 
      hex: '#216E4E',
      gradient: 'linear-gradient(135deg, #216E4E 0%, #2E8B57 100%)',
    },
    { 
      name: 'Merlot', 
      hex: '#8E2423',
      gradient: 'linear-gradient(135deg, #8E2423 0%, #A52A2A 100%)',
    },
    { 
      name: 'Regal Purple', 
      hex: '#5D3A9B',
      gradient: 'linear-gradient(135deg, #5D3A9B 0%, #6A5ACD 100%)',
    },
    { 
      name: 'Teal Blue', 
      hex: '#008080',
      gradient: 'linear-gradient(135deg, #008080 0%, #20B2AA 100%)',
    },
    { 
      name: 'Terracotta', 
      hex: '#B46A55',
      gradient: 'linear-gradient(135deg, #B46A55 0%, #CD853F 100%)',
    },
    { 
      name: 'Olive Green', 
      hex: '#556B2F',
      gradient: 'linear-gradient(135deg, #556B2F 0%, #6B8E23 100%)',
    },
    { 
      name: 'Charcoal Slate', 
      hex: '#414A4C',
      gradient: 'linear-gradient(135deg, #414A4C 0%, #52595D 100%)',
    },
    { 
      name: 'Marigold', 
      hex: '#EAA221',
      gradient: 'linear-gradient(135deg, #EAA221 0%, #F5B84D 100%)',
    },
    { 
      name: 'Crimson Red', 
      hex: '#990000',
      gradient: 'linear-gradient(135deg, #990000 0%, #B32828 100%)',
    },
    { 
      name: 'Sage Green', 
      hex: '#87AE73',
      gradient: 'linear-gradient(135deg, #87AE73 0%, #A6C396 100%)',
    },
    { 
      name: 'Stone Gray', 
      hex: '#7A797A',
      gradient: 'linear-gradient(135deg, #7A797A 0%, #8D918D 100%)',
    },
    { 
      name: 'Graphite Gray', 
      hex: '#34495e',
      gradient: 'linear-gradient(135deg, #34495e 0%, #4a627a 100%)',
    },
    { 
      name: 'Classic Black', 
      hex: '#000000',
      gradient: 'linear-gradient(135deg, #000000 0%, #2c3e50 100%)',
    }
  ];
  
  const templates = [
    { 
      name: 'Creative', 
      id: 'creative',
      description: 'Bold sidebar design with floating elements and modern aesthetic for creative roles',
      features: ['Sidebar Layout', 'Creative Design', 'Visual Impact', 'Color Blocks'],
      recommended: 'Design, Marketing, Arts, Media, Advertising',
      previewStyle: {
        type: 'creative',
        headerHeight: '100%',
        layout: 'sidebar'
      }
    },
    { 
      name: 'Modern', 
      id: 'modern',
      description: 'Clean contemporary design with geometric elements and spacious layout',
      features: ['Geometric Design', 'Modern Typography', 'White Space', 'Tech-Forward'],
      recommended: 'Technology, Startups, Engineering, Data Science',
      previewStyle: {
        type: 'modern',
        headerHeight: '25%',
        layout: 'modern-grid'
      }
    },
    { 
      name: 'Classic', 
      id: 'classic',
      description: 'Timeless and elegant design with traditional layout perfect for corporate roles',
      features: ['Traditional Layout', 'ATS Friendly', 'Corporate Style', 'Professional Headers'],
      recommended: 'Finance, Legal, Banking, Insurance, Government',
      previewStyle: {
        type: 'classic',
        headerHeight: '30%',
        layout: 'single-column'
      }
    },
    { 
      name: 'Professional', 
      id: 'professional',
      description: 'Premium glassmorphism design with sophisticated styling for executive roles',
      features: ['Glassmorphism', 'Premium Look', 'Executive Style', 'High-Impact'],
      recommended: 'C-Suite, Management, Consulting, Executive Roles',
      previewStyle: {
        type: 'professional',
        headerHeight: '35%',
        layout: 'professional-grid'
      }
    }
  ];

  const handleColorSelect = (color) => {
    handleColorChange(color.hex);
  };

  const renderTemplatePreview = (template) => {
    const { previewStyle } = template;
    const currentColor = selectedColor;
    
    if (previewStyle.type === 'classic') {
      return (
        <div className="template-preview-detailed classic-preview">
          <div 
            className="preview-header-detailed classic-header"
            style={{ 
              background: `linear-gradient(135deg, ${currentColor} 0%, ${currentColor}dd 100%)`,
              height: previewStyle.headerHeight
            }}
          >
            <div className="preview-name-detailed">John Doe</div>
            <div className="preview-title-detailed">Software Engineer</div>
          </div>
          <div className="preview-body-detailed classic-body">
            <div className="classic-section">
              <div className="section-title-classic" style={{ borderColor: currentColor }}>Contact</div>
              <div className="contact-items-classic">
                <div className="contact-item-classic"></div>
                <div className="contact-item-classic"></div>
                <div className="contact-item-classic"></div>
              </div>
            </div>
            <div className="classic-section">
              <div className="section-title-classic" style={{ borderColor: currentColor }}>Experience</div>
              <div className="content-lines-classic">
                <div className="content-line-classic full"></div>
                <div className="content-line-classic medium"></div>
                <div className="content-line-classic short"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (previewStyle.type === 'creative') {
      return (
        <div className="template-preview-detailed creative-preview">
          <div className="creative-layout">
            <div 
              className="creative-sidebar"
              style={{ 
                background: `linear-gradient(180deg, ${currentColor} 0%, ${currentColor}cc 100%)`
              }}
            >
              <div className="creative-avatar"></div>
              <div className="creative-name">John Doe</div>
              <div className="creative-profession">Designer</div>
              <div className="creative-contact">
                <div className="creative-contact-item"></div>
                <div className="creative-contact-item"></div>
                <div className="creative-contact-item"></div>
              </div>
            </div>
            <div className="creative-main">
              <div className="creative-section">
                <div className="creative-section-title" style={{ color: currentColor }}>Experience</div>
                <div className="creative-card">
                  <div className="creative-card-accent" style={{ background: currentColor }}></div>
                  <div className="creative-card-content">
                    <div className="creative-line full"></div>
                    <div className="creative-line medium"></div>
                  </div>
                </div>
              </div>
              <div className="creative-skills">
                <div className="skill-tag" style={{ background: currentColor }}></div>
                <div className="skill-tag" style={{ background: currentColor }}></div>
                <div className="skill-tag" style={{ background: currentColor }}></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (previewStyle.type === 'modern') {
      return (
        <div className="template-preview-detailed modern-preview">
          <div 
            className="modern-header"
            style={{ 
              background: `linear-gradient(135deg, ${currentColor} 0%, ${currentColor}dd 100%)`,
              height: previewStyle.headerHeight,
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
            }}
          >
            <div className="modern-header-content">
              <div className="modern-name">John Doe</div>
              <div className="modern-profession">Developer</div>
            </div>
            <div className="modern-contact-grid">
              <div className="modern-contact-item"></div>
              <div className="modern-contact-item"></div>
              <div className="modern-contact-item"></div>
            </div>
          </div>
          <div className="modern-body">
            <div className="modern-two-column">
              <div className="modern-section">
                <div className="modern-section-title" style={{ color: currentColor }}>Experience</div>
                <div className="modern-card">
                  <div className="modern-pulse" style={{ background: currentColor }}></div>
                  <div className="modern-content-lines">
                    <div className="modern-line full"></div>
                    <div className="modern-line medium"></div>
                  </div>
                </div>
              </div>
              <div className="modern-section">
                <div className="modern-section-title" style={{ color: currentColor }}>Skills</div>
                <div className="modern-skills-grid">
                  <div className="modern-skill-card" style={{ borderColor: currentColor }}></div>
                  <div className="modern-skill-card" style={{ borderColor: currentColor }}></div>
                  <div className="modern-skill-card" style={{ borderColor: currentColor }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (previewStyle.type === 'professional') {
      return (
        <div className="template-preview-detailed professional-preview">
          <div 
            className="professional-header"
            style={{ 
              background: `linear-gradient(135deg, ${currentColor}f0 0%, ${currentColor}dd 100%)`,
              height: previewStyle.headerHeight,
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="professional-header-content">
              <div className="professional-name">John Doe</div>
              <div className="professional-profession">Executive</div>
            </div>
            <div className="professional-contact-info">
              <div className="professional-contact-item"></div>
              <div className="professional-contact-item"></div>
            </div>
          </div>
          <div className="professional-body">
            <div className="professional-grid">
              <div className="professional-left">
                <div className="professional-skills">
                  <div className="professional-skill-item">
                    <div className="professional-skill-bar" style={{ background: currentColor }}></div>
                  </div>
                  <div className="professional-skill-item">
                    <div className="professional-skill-bar" style={{ background: currentColor }}></div>
                  </div>
                </div>
              </div>
              <div className="professional-right">
                <div className="professional-summary" style={{ background: `${currentColor}10` }}></div>
                <div className="professional-experience">
                  <div className="professional-timeline" style={{ background: currentColor }}></div>
                  <div className="professional-exp-content">
                    <div className="professional-line full"></div>
                    <div className="professional-line medium"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const themeStyles = {
    container: {
      background: isDarkMode 
        ? 'rgba(30, 41, 59, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '2.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: isDarkMode 
        ? '0 25px 50px rgba(0, 0, 0, 0.3)' 
        : '0 25px 50px rgba(0, 0, 0, 0.1)',
      border: isDarkMode 
        ? '1px solid rgba(71, 85, 105, 0.3)' 
        : '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      color: isDarkMode ? '#f1f5f9' : '#1a202c'
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: isDarkMode ? '#f1f5f9' : '#1a202c',
      margin: '0 0 0.5rem 0',
      letterSpacing: '-0.025em',
      transition: 'color 0.3s ease'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      margin: '0',
      lineHeight: '1.5',
      transition: 'color 0.3s ease'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.4rem',
      fontWeight: '700',
      color: isDarkMode ? '#f1f5f9' : '#1a202c',
      margin: '0 0 0.75rem 0',
      transition: 'color 0.3s ease'
    },
    sectionDescription: {
      fontSize: '1rem',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      margin: '0',
      lineHeight: '1.6',
      transition: 'color 0.3s ease'
    },
    templateCard: {
      background: isDarkMode 
        ? 'rgba(51, 65, 85, 0.8)' 
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(15px)',
      border: isDarkMode 
        ? '2px solid rgba(71, 85, 105, 0.3)' 
        : '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      padding: '0',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      height: '420px'
    },
    templatePreview: {
      background: isDarkMode 
        ? 'rgba(30, 41, 59, 0.9)' 
        : 'rgba(248, 250, 252, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px 16px 0 0',
      padding: '1rem',
      height: '100%',
      border: isDarkMode 
        ? '1px solid rgba(71, 85, 105, 0.5)' 
        : '1px solid rgba(226, 232, 240, 0.5)',
      borderBottom: 'none',
      transition: 'all 0.3s ease'
    },
    templateName: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: isDarkMode ? '#f1f5f9' : '#1a202c',
      margin: '0 0 0.75rem 0',
      transition: 'color 0.3s ease'
    },
    templateDescription: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      margin: '0 0 1.25rem 0',
      lineHeight: '1.5',
      transition: 'color 0.3s ease'
    },
    colorOption: {
      height: '120px',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.3)',
      border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '1rem',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
    },
    summaryCard: {
      background: isDarkMode 
        ? 'rgba(51, 65, 85, 0.3)' 
        : 'rgba(27, 108, 168, 0.05)',
      backdropFilter: 'blur(10px)',
      border: isDarkMode 
        ? '1px solid rgba(71, 85, 105, 0.4)' 
        : '1px solid rgba(27, 108, 168, 0.2)',
      borderRadius: '20px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    summaryTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: isDarkMode ? '#f1f5f9' : '#1a202c',
      margin: '0',
      transition: 'color 0.3s ease'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: isDarkMode 
        ? 'rgba(51, 65, 85, 0.8)' 
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: isDarkMode 
        ? '1px solid rgba(71, 85, 105, 0.3)' 
        : '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease'
    },
    summaryLabel: {
      fontWeight: '600',
      color: isDarkMode ? '#94a3b8' : '#4a5568',
      transition: 'color 0.3s ease'
    }
  };

  return (
    <div style={themeStyles.container}>
      <div className="selector-header">
        <div className="header-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        </div>
        <div className="header-content">
          <h2 style={themeStyles.headerTitle}>Choose Your Professional Style</h2>
          <p style={themeStyles.headerSubtitle}>Select a resume template and color scheme that best represents your professional brand</p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h3 style={themeStyles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <rect x="7" y="7" width="3" height="9" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="7" width="3" height="5" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Professional Resume Templates
          </h3>
          <p style={themeStyles.sectionDescription}>Choose a layout that matches your industry and career level. Hover to see detailed preview.</p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''} ${hoveredTemplate === template.id ? 'hovered' : ''}`}
              style={{
                ...themeStyles.templateCard,
                borderColor: selectedTemplate === template.id 
                  ? '#1B6CA8' 
                  : hoveredTemplate === template.id 
                    ? 'rgba(27, 108, 168, 0.4)' 
                    : themeStyles.templateCard.border
              }}
              onClick={() => handleTemplateChange(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="template-preview-container">
                {hoveredTemplate === template.id ? (
                  renderTemplatePreview(template)
                ) : (
                  <div style={themeStyles.templatePreview}>
                    <div 
                      className="preview-header"
                      style={{ 
                        background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)`,
                        height: '60px',
                        borderRadius: '12px',
                        marginBottom: '0.75rem'
                      }}
                    ></div>
                    <div className="preview-content">
                      <div className="preview-line long" style={{ 
                        height: '4px',
                        background: isDarkMode ? '#475569' : '#cbd5e0',
                        borderRadius: '2px',
                        width: '100%',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div className="preview-line medium" style={{ 
                        height: '4px',
                        background: isDarkMode ? '#475569' : '#cbd5e0',
                        borderRadius: '2px',
                        width: '75%',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div className="preview-line short" style={{ 
                        height: '4px',
                        background: isDarkMode ? '#475569' : '#cbd5e0',
                        borderRadius: '2px',
                        width: '50%',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div className="preview-line medium" style={{ 
                        height: '4px',
                        background: isDarkMode ? '#475569' : '#cbd5e0',
                        borderRadius: '2px',
                        width: '75%',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div className="preview-tags" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <div style={{ 
                          width: '40px',
                          height: '16px',
                          background: selectedColor,
                          borderRadius: '8px'
                        }}></div>
                        <div style={{ 
                          width: '40px',
                          height: '16px',
                          background: selectedColor,
                          borderRadius: '8px'
                        }}></div>
                        <div style={{ 
                          width: '40px',
                          height: '16px',
                          background: selectedColor,
                          borderRadius: '8px'
                        }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="template-info" style={{ flex: 1, padding: '1.5rem' }}>
                <h4 style={themeStyles.templateName}>{template.name}</h4>
                <p style={themeStyles.templateDescription}>{template.description}</p>
                
                <div className="template-features" style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.25rem'
                }}>
                  {template.features.map((feature, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.8rem',
                      padding: '0.375rem 0.75rem',
                      background: isDarkMode ? 'rgba(27, 108, 168, 0.2)' : 'rgba(27, 108, 168, 0.1)',
                      color: '#1B6CA8',
                      borderRadius: '12px',
                      fontWeight: '500',
                      border: isDarkMode ? '1px solid rgba(27, 108, 168, 0.3)' : '1px solid rgba(27, 108, 168, 0.2)',
                      transition: 'all 0.3s ease'
                    }}>{feature}</span>
                  ))}
                </div>

                <div className="template-recommended" style={{ fontSize: '0.9rem', color: isDarkMode ? '#94a3b8' : '#4a5568' }}>
                  <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>Ideal for:</span>
                  <span style={{ color: '#1B6CA8', fontWeight: '500' }}>{template.recommended}</span>
                </div>
              </div>

              {selectedTemplate === template.id && (
                <div className="selection-badge" style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #1B6CA8 0%, #2c3e50 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(27, 108, 168, 0.4)',
                  zIndex: 10
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              )}

              {hoveredTemplate === template.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(27, 108, 168, 0.95) 0%, rgba(44, 62, 80, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Live Template Preview
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <div className="section-header">
          <h3 style={themeStyles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#1B6CA8' }}>
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22a8 8 0 005.66-13.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Select a Color Scheme
          </h3>
          <p style={themeStyles.sectionDescription}>Pick a color that will be used for headers, titles, and accents in your resume.</p>
        </div>
        <div className="colors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1.5rem' }}>
          {colors.map((color) => {
            const isSelected = selectedColor === color.hex;
            const isHovered = hoveredColor === color.hex;
            return (
              <div
                key={color.hex}
                className={`color-option ${isSelected ? 'selected' : ''}`}
                style={{
                  ...themeStyles.colorOption,
                  transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'none',
                  boxShadow: isHovered ? (isDarkMode ? '0 16px 40px rgba(0,0,0,0.4)' : '0 16px 40px rgba(0,0,0,0.2)') : 'none',
                  borderColor: isSelected ? color.hex : (isHovered ? color.hex : themeStyles.colorOption.border),
                  borderWidth: isSelected || isHovered ? '2px' : '1px'
                }}
                onClick={() => handleColorSelect(color)}
                onMouseEnter={() => setHoveredColor(color.hex)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: color.gradient,
                  borderRadius: 'inherit',
                  opacity: isSelected ? 1 : 0.85,
                  transition: 'opacity 0.3s ease'
                }}></div>
                
                {isSelected && (
                  <div className="selection-badge-color" style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    width: '24px', height: '24px',
                    background: 'rgba(255, 255, 255, 0.8)', color: color.hex,
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(5px)', zIndex: 2
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <span style={{ 
                  color: '#ffffff', 
                  fontWeight: '600', 
                  fontSize: '0.8rem', 
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  position: 'relative',
                  zIndex: 1 
                }}>
                  {color.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="summary-section" style={{ marginTop: '2rem' }}>
        <div style={themeStyles.summaryCard}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #1B6CA8 0%, #2c3e50 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 16px rgba(27, 108, 168, 0.3)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h4 style={themeStyles.summaryTitle}>Your Selection Summary</h4>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={themeStyles.summaryItem}>
              <span style={themeStyles.summaryLabel}>Template:</span>
              <span style={{ fontWeight: '600', color: '#1B6CA8' }}>
                {templates.find(t => t.id === selectedTemplate)?.name || 'Creative'}
              </span>
            </div>
            <div style={themeStyles.summaryItem}>
              <span style={themeStyles.summaryLabel}>Color Scheme:</span>
              <span style={{ fontWeight: '600', color: '#1B6CA8' }}>
                {colors.find(c => c.hex === selectedColor)?.name || 'Pacific Blue'}
              </span>
            </div>
            <div style={themeStyles.summaryItem}>
              <span style={themeStyles.summaryLabel}>Best For:</span>
              <span style={{ fontWeight: '600', color: '#1B6CA8' }}>
                {templates.find(t => t.id === selectedTemplate)?.recommended || 'Design, Marketing, Arts, Media, Advertising'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .template-selector::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.02) 0%, rgba(71, 85, 105, 0.02) 100%)' 
            : 'linear-gradient(135deg, rgba(27, 108, 168, 0.02) 0%, rgba(44, 62, 80, 0.02) 100%)'};
          z-index: -1;
          border-radius: 24px;
        }

        .selector-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: ${isDarkMode 
            ? '2px solid rgba(71, 85, 105, 0.3)' 
            : '2px solid rgba(27, 108, 168, 0.1)'};
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #1B6CA8 0%, #2c3e50 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 32px rgba(27, 108, 168, 0.3);
          flex-shrink: 0;
        }

        .header-content {
          flex: 1;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-title svg {
          color: #1B6CA8;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .template-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.05) 0%, rgba(100, 116, 139, 0.05) 100%)' 
            : 'linear-gradient(135deg, rgba(27, 108, 168, 0.03) 0%, rgba(44, 62, 80, 0.03) 100%)'};
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .template-card:hover::before {
          opacity: 1;
        }

        .template-card:hover {
          border-color: rgba(27, 108, 168, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(27, 108, 168, 0.15);
        }

        .template-card.selected {
          border-color: #1B6CA8;
          background: ${isDarkMode ? 'rgba(27, 108, 168, 0.03)' : 'rgba(27, 108, 168, 0.02)'};
          box-shadow: 0 12px 30px rgba(27, 108, 168, 0.2);
        }

        .template-preview-container {
          height: 200px;
          position: relative;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }

        .template-preview-detailed {
          background: ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'white'};
          height: 100%;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }

        .preview-header-detailed {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 0.75rem;
        }

        .preview-name-detailed {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .preview-title-detailed {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .classic-preview .classic-header {
          height: 30%;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .classic-body {
          padding: 0.75rem;
          height: 70%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-title-classic {
          font-size: 0.7rem;
          font-weight: 600;
          color: ${selectedColor};
          border-bottom: 2px solid;
          padding-bottom: 0.2rem;
          margin-bottom: 0.3rem;
        }

        .contact-items-classic, .content-lines-classic {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .contact-item-classic, .content-line-classic {
          height: 3px;
          background: ${isDarkMode ? '#475569' : '#e2e8f0'};
          border-radius: 2px;
        }

        .content-line-classic.full { width: 100%; }
        .content-line-classic.medium { width: 70%; }
        .content-line-classic.short { width: 40%; }

        .creative-preview .creative-layout {
          display: flex;
          height: 100%;
        }

        .creative-sidebar {
          width: 35%;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
        }

        .creative-avatar {
          width: 25px;
          height: 25px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          margin-bottom: 0.3rem;
        }

        .creative-name {
          font-size: 0.6rem;
          font-weight: 600;
          margin-bottom: 0.1rem;
        }

        .creative-profession {
          font-size: 0.5rem;
          opacity: 0.8;
          margin-bottom: 0.4rem;
        }

        .creative-contact {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          width: 100%;
        }

        .creative-contact-item {
          height: 2px;
          background: rgba(255,255,255,0.6);
          border-radius: 1px;
          width: 80%;
        }

        .creative-main {
          flex: 1;
          padding: 0.5rem;
        }

        .creative-section-title {
          font-size: 0.7rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .creative-card {
          background: ${isDarkMode ? 'rgba(51, 65, 85, 0.8)' : 'white'};
          border-radius: 8px;
          padding: 0.4rem;
          margin-bottom: 0.4rem;
          position: relative;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .creative-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 8px 8px 0 0;
        }

        .creative-card-content {
          margin-top: 0.2rem;
        }

        .creative-line {
          height: 2px;
          background: ${isDarkMode ? '#475569' : '#e2e8f0'};
          border-radius: 1px;
          margin-bottom: 0.2rem;
        }

        .creative-line.full { width: 100%; }
        .creative-line.medium { width: 70%; }

        .creative-skills {
          display: flex;
          gap: 0.2rem;
        }

        .skill-tag {
          width: 20px;
          height: 8px;
          border-radius: 4px;
        }

        .modern-preview .modern-header {
          padding: 0.5rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modern-header-content {
          flex: 1;
        }

        .modern-name {
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.1rem;
        }

        .modern-profession {
          font-size: 0.6rem;
          opacity: 0.9;
        }

        .modern-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .modern-contact-item {
          width: 40px;
          height: 3px;
          background: rgba(255,255,255,0.6);
          border-radius: 2px;
        }

        .modern-body {
          padding: 0.5rem;
          height: 75%;
        }

        .modern-two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          height: 100%;
        }

        .modern-section-title {
          font-size: 0.6rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .modern-card {
          background: ${isDarkMode ? 'rgba(51, 65, 85, 0.8)' : 'white'};
          border-radius: 6px;
          padding: 0.3rem;
          position: relative;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .modern-pulse {
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          border-radius: 1px;
        }

        .modern-content-lines {
          margin-left: 0.3rem;
        }

        .modern-line {
          height: 2px;
          background: ${isDarkMode ? '#475569' : '#e2e8f0'};
          border-radius: 1px;
          margin-bottom: 0.2rem;
        }

        .modern-line.full { width: 100%; }
        .modern-line.medium { width: 70%; }

        .modern-skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.2rem;
        }

        .modern-skill-card {
          height: 15px;
          border: 1px solid;
          border-radius: 4px;
          background: ${isDarkMode ? 'rgba(51, 65, 85, 0.8)' : 'white'};
        }

        .professional-preview .professional-header {
          padding: 0.5rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 16px 16px 0 0;
        }

        .professional-name {
          font-size: 0.9rem;
          font-weight: 800;
          margin-bottom: 0.1rem;
        }

        .professional-profession {
          font-size: 0.6rem;
          opacity: 0.9;
          text-transform: uppercase;
        }

        .professional-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .professional-contact-item {
          width: 35px;
          height: 8px;
          background: rgba(255,255,255,0.3);
          border-radius: 20px;
        }

        .professional-body {
          padding: 0.5rem;
          height: 65%;
        }

        .professional-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 0.5rem;
          height: 100%;
        }

        .professional-skills {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .professional-skill-item {
          background: ${isDarkMode ? 'rgba(51, 65, 85, 0.8)' : 'rgba(255,255,255,0.8)'};
          border-radius: 6px;
          padding: 0.3rem;
          height: 15px;
          position: relative;
        }

        .professional-skill-bar {
          position: absolute;
          bottom: 2px;
          left: 0.3rem;
          right: 0.3rem;
          height: 3px;
          border-radius: 2px;
        }

        .professional-summary {
          border-radius: 8px;
          height: 25px;
          margin-bottom: 0.4rem;
        }

        .professional-experience {
          background: ${isDarkMode ? 'rgba(51, 65, 85, 0.8)' : 'white'};
          border-radius: 8px;
          padding: 0.3rem;
          position: relative;
        }

        .professional-timeline {
          position: absolute;
          left: 0.3rem;
          top: 0.3rem;
          bottom: 0.3rem;
          width: 2px;
          border-radius: 1px;
        }

        .professional-exp-content {
          margin-left: 0.5rem;
        }

        .professional-line {
          height: 3px;
          background: ${isDarkMode ? '#475569' : '#e2e8f0'};
          border-radius: 2px;
          margin-bottom: 0.2rem;
        }

        .professional-line.full { width: 100%; }
        .professional-line.medium { width: 75%; }

        @media (max-width: 768px) {
          .selector-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .templates-grid {
            grid-template-columns: 1fr;
          }

          .template-card {
            height: 380px;
          }
        }

        @media (max-width: 480px) {
          .template-card {
            height: 360px;
          }

          .template-info {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;