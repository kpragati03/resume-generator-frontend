import React from 'react';

const CreativeTemplate = ({ data }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;
  const accentColor = color || '#667eea';

  const getComplementaryColor = (hex, opacity = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getDarkerShade = (hex) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'YN';
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  return (
    <div className="creative-template">
      {/* Background Elements */}
      <div className="background-overlay"></div>
      <div className="geometric-shape shape-1"></div>
      <div className="geometric-shape shape-2"></div>
      <div className="geometric-shape shape-3"></div>
      
      <div className="template-layout">
        {/* Creative Sidebar */}
        <div className="creative-sidebar">
          <div className="sidebar-overlay"></div>
          
          {/* Profile Section */}
          <div className="profile-section">
            <div className="avatar-container">
              <div className="avatar-ring"></div>
              <div className="avatar">
                {getInitials(name)}
              </div>
              <div className="avatar-glow"></div>
            </div>
            <h1 className="profile-name">{name || 'Your Name'}</h1>
            <p className="profile-profession">{profession || 'Your Profession'}</p>
            <div className="profile-divider"></div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h3 className="sidebar-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Contact
            </h3>
            
            <div className="contact-item">
              <div className="contact-icon email-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{email || 'your.email@example.com'}</span>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon phone-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{phone || '+1 (555) 123-4567'}</span>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon location-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{address || 'Your Address, City, State'}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="creative-main">
          
          {/* Experience Section */}
          {experience && experience.length > 0 && experience[0].company && (
            <section className="content-section">
              <h2 className="section-title">
                <div className="title-decoration"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Professional Experience
              </h2>
              <div className="experience-card">
                <div className="card-accent-line"></div>
                <div className="card-header">
                  <div className="role-company">
                    <h3 className="role-title">{experience[0].role}</h3>
                    <p className="company-name">{experience[0].company}</p>
                  </div>
                  <div className="duration-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
          {education && education.length > 0 && education[0].degree && (
            <section className="content-section">
              <h2 className="section-title">
                <div className="title-decoration"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Education
              </h2>
              <div className="education-card">
                <div className="card-accent-line"></div>
                <div className="education-content">
                  <h3 className="degree-title">{education[0].degree}</h3>
                  <p className="institution-name">{education[0].institution}</p>
                  <div className="year-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
            <section className="content-section">
              <h2 className="section-title">
                <div className="title-decoration"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Core Skills
              </h2>
              <div className="skills-grid">
                {skillsArray.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-glow"></div>
                    <div className="skill-content">
                      <span className="skill-name">{skill}</span>
                      <div className="skill-sparkle">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        .creative-template {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1a202c;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${getComplementaryColor(accentColor, 0.03)} 0%, rgba(255,255,255,0.98) 100%);
          z-index: -1;
        }

        .geometric-shape {
          position: absolute;
          border-radius: 50% 20% 80% 30%;
          opacity: 0.06;
          z-index: -1;
          animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, ${accentColor}, ${getDarkerShade(accentColor)});
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, ${accentColor}, ${getDarkerShade(accentColor)});
          bottom: 20%;
          left: -75px;
          animation-delay: -7s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(225deg, ${accentColor}, ${getDarkerShade(accentColor)});
          top: 50%;
          right: 10%;
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(15px) rotate(240deg); }
        }

        .template-layout {
          display: flex;
          min-height: 100vh;
        }

        .creative-sidebar {
          width: 32%;
          background: linear-gradient(180deg, ${accentColor} 0%, ${getDarkerShade(accentColor)} 100%);
          color: white;
          padding: 2.5rem 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .sidebar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.08) 100%);
          pointer-events: none;
        }

        .profile-section {
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .avatar-container {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .avatar-ring {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 4px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          position: relative;
          z-index: 1;
        }

        .avatar-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          animation: glow 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        .profile-name {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .profile-profession {
          font-size: 1rem;
          font-weight: 400;
          opacity: 0.9;
          margin: 0 0 1.5rem 0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .profile-divider {
          width: 60px;
          height: 3px;
          background: rgba(255,255,255,0.6);
          margin: 0 auto;
          border-radius: 2px;
        }

        .contact-section {
          position: relative;
          z-index: 2;
        }

        .sidebar-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid rgba(255,255,255,0.3);
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255,255,255,0.15);
          transform: translateX(5px);
        }

        .contact-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .contact-text {
          font-size: 0.9rem;
          margin: 0;
          word-break: break-word;
          line-height: 1.4;
        }

        .creative-main {
          flex: 1;
          padding: 2.5rem 2rem;
          position: relative;
          z-index: 1;
        }

        .content-section {
          margin-bottom: 2.5rem;
          position: relative;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: ${accentColor};
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .title-decoration {
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, ${accentColor} 0%, ${getDarkerShade(accentColor)} 100%);
          border-radius: 2px;
          position: absolute;
          left: -1rem;
        }

        .experience-card, .education-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border: 1px solid ${getComplementaryColor(accentColor, 0.2)};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .experience-card:hover, .education-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .card-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, ${accentColor} 0%, ${getDarkerShade(accentColor)} 100%);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .role-company, .education-content {
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
          margin: 0 0 0.5rem 0;
        }

        .duration-badge, .year-badge {
          background: ${getComplementaryColor(accentColor, 0.15)};
          color: ${accentColor};
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid ${getComplementaryColor(accentColor, 0.3)};
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .year-badge {
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
          border-top: 1px solid ${getComplementaryColor(accentColor, 0.2)};
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .skill-card {
          background: white;
          padding: 1.5rem 1rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          border: 2px solid ${getComplementaryColor(accentColor, 0.2)};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          border-color: ${accentColor};
        }

        .skill-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${getComplementaryColor(accentColor, 0.05)} 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover .skill-glow {
          opacity: 1;
        }

        .skill-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .skill-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: ${accentColor};
          margin: 0;
        }

        .skill-sparkle {
          color: ${accentColor};
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover .skill-sparkle {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .template-layout {
            flex-direction: column;
          }

          .creative-sidebar {
            width: 100%;
            padding: 2rem 1.5rem;
          }

          .avatar {
            width: 100px;
            height: 100px;
            font-size: 2rem;
          }

          .avatar-ring {
            top: -6px;
            left: -6px;
            right: -6px;
            bottom: -6px;
          }

          .creative-main {
            padding: 2rem 1.5rem;
          }

          .section-title {
            font-size: 1.3rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
          }

          .duration-badge {
            align-self: flex-start;
          }

          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreativeTemplate;