import React from 'react';

const ClassicTemplate = ({ data }) => {
  const { color, name, profession, email, phone, address, education, experience, skills } = data;

  const getHeaderColor = (baseColor) => {
    const colorMap = {
      '#007bff': '#0056b3',
      '#28a745': '#1e7e34', 
      '#dc3545': '#c82333',
      '#343a40': '#23272b',
      '#6f42c1': '#5a32a3',
      '#fd7e14': '#e66100',
      '#20c997': '#1aa179',
      '#e83e8c': '#d91a72'
    };
    return colorMap[baseColor] || baseColor;
  };
  
  const headerColor = getHeaderColor(color);
  const accentColor = color || '#667eea';
  const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  return (
    <div className="classic-template">
      {/* Header Section */}
      <div className="template-header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="name-title">{name || 'Your Name'}</h1>
          <p className="profession-title">{profession || 'Your Profession'}</p>
        </div>
        <div className="header-decoration"></div>
      </div>

      {/* Content Section */}
      <div className="template-content">
        {/* Contact Information */}
        <section className="content-section">
          <h2 className="section-title">
            <div className="title-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            Contact Information
          </h2>
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{email || 'your.email@example.com'}</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="contact-text">{address || 'Your Address, City, State'}</span>
            </div>
          </div>
        </section>

        {/* Education */}
        {education && education.length > 0 && education[0].degree && (
          <section className="content-section">
            <h2 className="section-title">
              <div className="title-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              Education
            </h2>
            <div className="education-item">
              <div className="timeline-dot"></div>
              <div className="education-content">
                <h3 className="education-degree">{education[0].degree}</h3>
                <p className="education-institution">{education[0].institution}</p>
                <p className="education-year">Class of {education[0].year}</p>
              </div>
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && experience[0].company && (
          <section className="content-section">
            <h2 className="section-title">
              <div className="title-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              Professional Experience
            </h2>
            <div className="experience-item">
              <div className="timeline-dot"></div>
              <div className="experience-content">
                <h3 className="experience-role">{experience[0].role}</h3>
                <p className="experience-company">{experience[0].company}</p>
                <p className="experience-duration">{experience[0].duration}</p>
                {experience[0].description && (
                  <p className="experience-description">{experience[0].description}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <section className="content-section">
            <h2 className="section-title">
              <div className="title-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              Core Skills
            </h2>
            <div className="skills-container">
              {skillsArray.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .classic-template {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #2d3748;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .template-header {
          background: linear-gradient(135deg, ${headerColor} 0%, ${accentColor} 100%);
          color: white;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .header-decoration {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          transform: rotate(45deg);
        }

        .header-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .name-title {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profession-title {
          font-size: 1.4rem;
          font-weight: 400;
          margin: 0;
          opacity: 0.95;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .template-content {
          padding: 2.5rem;
          background: white;
        }

        .content-section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: ${accentColor};
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid ${accentColor};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, ${accentColor}, transparent);
        }

        .title-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${accentColor};
          color: white;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-left: 4px solid ${accentColor};
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${accentColor}05 0%, transparent 100%);
        }

        .contact-item:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border-left-width: 6px;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${accentColor};
          color: white;
          border-radius: 10px;
          margin-right: 1rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px ${accentColor}40;
        }

        .contact-text {
          font-size: 1rem;
          color: #4a5568;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .education-item, .experience-item {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-left: 6px solid ${accentColor};
          position: relative;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .education-item:hover, .experience-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }

        .timeline-dot {
          position: absolute;
          left: -9px;
          top: 2rem;
          width: 12px;
          height: 12px;
          background: ${accentColor};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 3px ${accentColor}40;
        }

        .education-content, .experience-content {
          position: relative;
          z-index: 1;
        }

        .education-degree, .experience-role {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .education-institution, .experience-company {
          font-size: 1.1rem;
          color: ${accentColor};
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .education-year, .experience-duration {
          font-size: 0.95rem;
          color: #718096;
          margin: 0 0 0.75rem 0;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .education-year::before, .experience-duration::before {
          content: '';
          width: 6px;
          height: 6px;
          background: ${accentColor};
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .experience-description {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 0;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
          margin-top: 0.75rem;
        }

        .skill-tag {
          background: linear-gradient(135deg, ${accentColor} 0%, ${headerColor} 100%);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 12px ${accentColor}30;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${accentColor}40;
        }

        .skill-tag:hover::before {
          left: 100%;
        }

        @media (max-width: 768px) {
          .template-header {
            padding: 2rem 1.5rem;
          }

          .name-title {
            font-size: 2.25rem;
          }

          .profession-title {
            font-size: 1.1rem;
          }

          .template-content {
            padding: 1.5rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 1.1rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .education-item, .experience-item {
            padding: 1.5rem;
          }

          .skills-container {
            gap: 0.5rem;
          }

          .skill-tag {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .template-header {
            padding: 1.5rem 1rem;
          }

          .name-title {
            font-size: 1.875rem;
          }

          .template-content {
            padding: 1rem;
          }

          .contact-item {
            padding: 0.875rem 1rem;
          }

          .education-item, .experience-item {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClassicTemplate;