import React, { useState } from 'react';

const TemplateSelector = ({ handleColorChange, handleTemplateChange, selectedTemplate }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#667eea');

  const colors = [
    { 
      name: 'Ocean Breeze', 
      hex: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      light: '#f0f3ff'
    },
    { 
      name: 'Sunset Glow', 
      hex: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      light: '#fef0ff'
    },
    { 
      name: 'Emerald Dream', 
      hex: '#11998e',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      light: '#f0fdf4'
    },
    { 
      name: 'Royal Purple', 
      hex: '#6c5ce7',
      gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      light: '#f5f3ff'
    },
    { 
      name: 'Golden Hour', 
      hex: '#fdcb6e',
      gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
      light: '#fffbeb'
    },
    { 
      name: 'Arctic Blue', 
      hex: '#74b9ff',
      gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      light: '#f0f9ff'
    },
    { 
      name: 'Rose Garden', 
      hex: '#fd79a8',
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      light: '#fdf2f8'
    },
    { 
      name: 'Forest Deep', 
      hex: '#00b894',
      gradient: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
      light: '#ecfdf5'
    }
  ];
  
  const templates = [
    { 
      name: 'Classic Professional', 
      id: 'classic',
      description: 'Clean and traditional layout perfect for corporate roles',
      features: ['Traditional Layout', 'ATS Friendly', 'Corporate Style'],
      recommended: 'Finance, Legal, Corporate'
    },
    { 
      name: 'Modern Minimalist', 
      id: 'modern',
      description: 'Contemporary design with clean lines and modern typography',
      features: ['Clean Design', 'Modern Typography', 'Minimal Layout'],
      recommended: 'Tech, Startups, Design'
    },
    { 
      name: 'Creative Showcase', 
      id: 'creative',
      description: 'Bold and artistic design for creative professionals',
      features: ['Visual Impact', 'Creative Layout', 'Portfolio Ready'],
      recommended: 'Design, Marketing, Arts'
    },
    { 
      name: 'Executive Premium', 
      id: 'professional',
      description: 'Sophisticated design for senior-level positions',
      features: ['Premium Design', 'Executive Style', 'Leadership Focus'],
      recommended: 'Management, C-Suite, Consulting'
    }
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color.hex);
    handleColorChange(color.hex);
  };

  return (
    <div className="template-selector">
      {/* Header Section */}
      <div className="selector-header">
        <div className="header-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        </div>
        <div className="header-content">
          <h2 className="header-title">Choose Your Perfect Style</h2>
          <p className="header-subtitle">Select a professional template and color scheme that represents you best</p>
        </div>
      </div>

      {/* Template Selection */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <rect x="7" y="7" width="3" height="9" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="7" width="3" height="5" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Resume Templates
          </h3>
          <p className="section-description">Choose a layout that matches your industry and career level</p>
        </div>

        <div className="templates-grid">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateChange(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="template-preview">
                <div className="preview-header"></div>
                <div className="preview-content">
                  <div className="preview-line long"></div>
                  <div className="preview-line medium"></div>
                  <div className="preview-line short"></div>
                  <div className="preview-line medium"></div>
                  <div className="preview-tags">
                    <div className="preview-tag"></div>
                    <div className="preview-tag"></div>
                  </div>
                </div>
              </div>

              <div className="template-info">
                <h4 className="template-name">{template.name}</h4>
                <p className="template-description">{template.description}</p>
                
                <div className="template-features">
                  {template.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>

                <div className="template-recommended">
                  <span className="recommended-label">Best for:</span>
                  <span className="recommended-text">{template.recommended}</span>
                </div>
              </div>

              {selectedTemplate === template.id && (
                <div className="selection-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              )}

              <div className="template-overlay">
                <div className="overlay-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Preview Template
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette Section */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="13.5" cy="6.5" r=".5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="10.5" r=".5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="7.5" r=".5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="6.5" cy="12.5" r=".5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Color Palette
          </h3>
          <p className="section-description">Select colors that reflect your personality and industry</p>
        </div>

        <div className="colors-container">
          <div className="colors-grid">
            {colors.map((color, index) => (
              <div
                key={color.name}
                className={`color-option ${selectedColor === color.hex ? 'selected' : ''}`}
                style={{ background: color.gradient }}
                onClick={() => handleColorSelect(color)}
                onMouseEnter={() => setHoveredColor(color.name)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div className="color-overlay">
                  {selectedColor === color.hex && (
                    <div className="color-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="color-name">{color.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style Preview */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Live Preview
          </h3>
          <p className="section-description">See how your selections will look on your resume</p>
        </div>

        <div className="preview-container">
          <div className="preview-card">
            <div 
              className="preview-header-section"
              style={{ 
                background: colors.find(c => c.hex === selectedColor)?.gradient || colors[0].gradient 
              }}
            >
              <div className="preview-name">John Doe</div>
              <div className="preview-title">Software Engineer</div>
            </div>
            <div className="preview-body">
              <div className="preview-section">
                <div className="preview-section-title">Experience</div>
                <div className="preview-item">
                  <div className="preview-role">Senior Developer</div>
                  <div className="preview-company">Tech Company</div>
                </div>
              </div>
              <div className="preview-section">
                <div className="preview-section-title">Skills</div>
                <div className="preview-skills">
                  <span 
                    className="preview-skill"
                    style={{ background: selectedColor }}
                  >
                    React
                  </span>
                  <span 
                    className="preview-skill"
                    style={{ background: selectedColor }}
                  >
                    JavaScript
                  </span>
                  <span 
                    className="preview-skill"
                    style={{ background: selectedColor }}
                  >
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <div className="summary-header">
            <div className="summary-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h4 className="summary-title">Your Selection Summary</h4>
          </div>
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Template:</span>
              <span className="summary-value">
                {templates.find(t => t.id === selectedTemplate)?.name || 'Classic Professional'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Color Scheme:</span>
              <span className="summary-value">
                {colors.find(c => c.hex === selectedColor)?.name || 'Ocean Breeze'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Best For:</span>
              <span className="summary-value">
                {templates.find(t => t.id === selectedTemplate)?.recommended || 'Finance, Legal, Corporate'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .template-selector {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .selector-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid rgba(102, 126, 234, 0.1);
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          flex-shrink: 0;
        }

        .header-content {
          flex: 1;
        }

        .header-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }

        .header-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.75rem 0;
        }

        .section-title svg {
          color: #667eea;
        }

        .section-description {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .template-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .template-card:hover {
          border-color: #667eea;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

        .template-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
        }

        .template-preview {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }

        .preview-header {
          height: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          margin-bottom: 0.75rem;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .preview-line {
          height: 4px;
          background: #cbd5e0;
          border-radius: 2px;
        }

        .preview-line.long { width: 100%; }
        .preview-line.medium { width: 75%; }
        .preview-line.short { width: 50%; }

        .preview-tags {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .preview-tag {
          width: 40px;
          height: 16px;
          background: #667eea;
          border-radius: 8px;
        }

        .template-info {
          flex: 1;
        }

        .template-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 0.5rem 0;
        }

        .template-description {
          font-size: 0.95rem;
          color: #64748b;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .template-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .feature-tag {
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border-radius: 12px;
          font-weight: 500;
        }

        .template-recommended {
          font-size: 0.9rem;
          color: #4a5568;
        }

        .recommended-label {
          font-weight: 600;
          margin-right: 0.5rem;
        }

        .recommended-text {
          color: #667eea;
          font-weight: 500;
        }

        .selection-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .template-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .template-card:hover .template-overlay {
          opacity: 1;
        }

        .overlay-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .colors-container {
          position: relative;
        }

        .colors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
        }

        .color-option {
          height: 120px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 3px solid transparent;
          display: flex;
          align-items: end;
          padding: 1rem;
        }

        .color-option:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .color-option.selected {
          border-color: white;
          box-shadow: 0 0 0 3px #667eea, 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .color-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .color-check {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a202c;
          backdrop-filter: blur(10px);
        }

        .color-name {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }

        .preview-container {
          display: flex;
          justify-content: center;
        }

        .preview-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          width: 300px;
        }

        .preview-header-section {
          padding: 1.5rem;
          color: white;
          text-align: center;
        }

        .preview-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .preview-title {
          font-size: 1rem;
          opacity: 0.9;
        }

        .preview-body {
          padding: 1.5rem;
        }

        .preview-section {
          margin-bottom: 1.5rem;
        }

        .preview-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.75rem;
          border-bottom: 2px solid #667eea;
          padding-bottom: 0.25rem;
        }

        .preview-item {
          margin-bottom: 0.5rem;
        }

        .preview-role {
          font-weight: 600;
          color: #1a202c;
        }

        .preview-company {
          font-size: 0.9rem;
          color: #64748b;
        }

        .preview-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .preview-skill {
          padding: 0.375rem 0.75rem;
          color: white;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .summary-section {
          margin-top: 2rem;
        }

        .summary-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 20px;
          padding: 2rem;
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .summary-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
        }

        .summary-content {
          display: grid;
          gap: 1rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .summary-label {
          font-weight: 600;
          color: #4a5568;
        }

        .summary-value {
          font-weight: 600;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .template-selector {
            padding: 1.5rem;
          }

          .selector-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .header-title {
            font-size: 1.75rem;
          }

          .templates-grid {
            grid-template-columns: 1fr;
          }

          .colors-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }

          .color-option {
            height: 100px;
            padding: 0.75rem;
          }

          .summary-item {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;