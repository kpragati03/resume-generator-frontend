import React from 'react';

const ModernTemplate = ({ data }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;
  const accentColor = color || '#667eea';

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
    <div className="modern-template">
      {/* Background Elements */}
      <div className="background-grid"></div>
      <div className="background-gradient"></div>
      
      {/* Modern Header */}
      <header className="modern-header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-name">{name || 'Your Name'}</h1>
            <p className="header-profession">{profession || 'Your Profession'}</p>
            <div className="header-accent-line"></div>
          </div>
          <div className="header-right">
            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="contact-text">{email || 'your.email@example.com'}</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="contact-text">{phone || '+1 (555) 123-4567'}</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="contact-text">{address || 'Your Address, City'}</span>
              </div>
              </div>
              </div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="modern-content">
        {/* Two Column Layout for Experience and Education */}
        {(hasExperience || hasEducation) && (
          <div className="two-column-layout">
            {/* Experience Section */}
            {hasExperience && (
              <section className="content-section">
                <h2 className="section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Experience
                  <div className="title-line"></div>
                </h2>
                <div className="modern-card">
                  <div className="card-pulse"></div>
                  <div className="experience-header">
                    <div className="role-info">
                      <h3 className="role-title">{experience[0].role}</h3>
                      <p className="company-name">{experience[0].company}</p>
                    </div>
                    <div className="duration-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {experience[0].duration}
                    </div>
                  </div>
                  {experience[0].description && (
                    <p className="experience-description">{experience[0].description}</p>
                  )}
                </div>
              </section>
            )}

            {/* Education Section */}
            {hasEducation && (
              <section className="content-section">
                <h2 className="section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Education
                  <div className="title-line"></div>
                </h2>
                <div className="modern-card">
                  <div className="card-pulse"></div>
                  <div className="education-content">
                    <h3 className="degree-title">{education[0].degree}</h3>
                    <p className="institution-name">{education[0].institution}</p>
                    <div className="year-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
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
          <section className="content-section skills-section">
            <h2 className="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Core Skills
              <div className="title-line full-width"></div>
            </h2>
            <div className="skills-modern-grid">
              {skillsArray.map((skill, index) => (
                <div key={index} className="skill-modern-card">
                  <div className="skill-glow-effect"></div>
                  <div className="skill-content">
                    <span className="skill-text">{skill}</span>
                    <div className="skill-indicator"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!hasExperience && !hasEducation && !hasSkills && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Ready for Your Information</h3>
            <p>Fill out the form to see your professional resume come to life</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .modern-template {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1a202c;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .background-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: -2;
        }

        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${getLighterShade(accentColor, 0.02)} 0%, rgba(255,255,255,0.98) 100%);
          z-index: -1;
        }

        .modern-header {
          background: linear-gradient(135deg, ${accentColor} 0%, ${getDarkerShade(accentColor)} 100%);
          color: white;
          padding: 2.5rem 2rem;
          position: relative;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          margin-bottom: 2rem;
        }

        .header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .header-left {
          flex: 1;
        }

        .header-name {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 12px rgba(0,0,0,0.15);
          line-height: 1.1;
        }

        .header-profession {
          font-size: 1.3rem;
          font-weight: 400;
          opacity: 0.95;
          margin: 0 0 1rem 0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .header-accent-line {
          width: 80px;
          height: 4px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          margin-top: 1rem;
        }

        .header-right {
          flex-shrink: 0;
          min-width: 280px;
        }

        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255,255,255,0.25);
          transform: translateX(-3px);
        }

        .contact-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.2);
          border-radius: 6px;
          flex-shrink: 0;
        }

        .contact-text {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .modern-content {
          padding: 0 2rem 2rem 2rem;
          position: relative;
          z-index: 1;
        }

        .two-column-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .content-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: ${accentColor};
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .title-line {
          flex: 1;
          height: 3px;
          background: linear-gradient(90deg, ${accentColor} 0%, ${getLighterShade(accentColor, 0.3)} 100%);
          border-radius: 2px;
        }

        .title-line.full-width {
          flex: 1;
        }

        .modern-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid ${getLighterShade(accentColor, 0.15)};
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .modern-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .card-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, ${accentColor} 0%, ${getDarkerShade(accentColor)} 100%);
          animation: pulse-width 2s ease-in-out infinite;
        }

        @keyframes pulse-width {
          0%, 100% { width: 4px; }
          50% { width: 6px; }
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .role-info {
          flex: 1;
        }

        .role-title, .degree-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .company-name, .institution-name {
          font-size: 1.1rem;
          color: ${accentColor};
          font-weight: 600;
          margin: 0;
        }

        .duration-chip, .year-chip {
          background: ${getLighterShade(accentColor, 0.15)};
          color: ${accentColor};
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid ${getLighterShade(accentColor, 0.25)};
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .year-chip {
          margin-top: 1rem;
          display: inline-flex;
          width: fit-content;
        }

        .experience-description {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 1rem 0 0 0;
          padding-top: 1rem;
          border-top: 1px solid ${getLighterShade(accentColor, 0.15)};
        }

        .skills-section {
          margin-top: 2rem;
        }

        .skills-modern-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .skill-modern-card {
          background: white;
          padding: 1.5rem 1rem;
          border-radius: 12px;
          text-align: center;
          border: 2px solid ${getLighterShade(accentColor, 0.15)};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-modern-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.1);
          border-color: ${accentColor};
        }

        .skill-glow-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${getLighterShade(accentColor, 0.08)} 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-modern-card:hover .skill-glow-effect {
          opacity: 1;
        }

        .skill-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .skill-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: ${accentColor};
          margin: 0;
        }

        .skill-indicator {
          width: 30px;
          height: 3px;
          background: ${accentColor};
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-modern-card:hover .skill-indicator {
          opacity: 1;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
          background: ${getLighterShade(accentColor, 0.03)};
          border-radius: 20px;
          border: 2px dashed ${getLighterShade(accentColor, 0.2)};
          margin: 2rem 0;
        }

        .empty-state-icon {
          color: ${accentColor};
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 1rem 0;
        }

        .empty-state p {
          font-size: 1.1rem;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .modern-header {
            padding: 2rem 1.5rem;
          }

          .header-content {
            flex-direction: column;
            gap: 2rem;
          }

          .header-name {
            font-size: 2.5rem;
          }

          .header-profession {
            font-size: 1.1rem;
          }

          .header-right {
            min-width: 100%;
          }

          .modern-content {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }

          .two-column-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-title {
            font-size: 1.2rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .experience-header {
            flex-direction: column;
            gap: 1rem;
          }

          .duration-chip {
            align-self: flex-start;
          }

          .skills-modern-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
          }

          .empty-state {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernTemplate;
            