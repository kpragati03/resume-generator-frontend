import React, { useState, useMemo, useRef } from 'react';
import ClassicTemplate from '../templates/classic/ClassicTemplate';
import ModernTemplate from '../templates/modern/ModernTemplate';
import CreativeTemplate from '../templates/creative/CreativeTemplate';
import ProfessionalTemplate from '../templates/professional/ProfessionalTemplate';

const ResumePreview = ({ data, selectedTemplate = 'classic', onExportPDF, onSaveResume, isDownloading }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const previewRef = useRef(null);

  const templateComponent = useMemo(() => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  }, [selectedTemplate, data]);

  const handleExportPDF = async () => {
    if (!onExportPDF) return;
    
    setIsExportingPDF(true);
    
    // Hide non-essential elements for PDF
    const header = document.querySelector('.preview-header');
    const footer = document.querySelector('.preview-footer');
    const content = document.querySelector('.preview-content');
    
    // Store original styles
    const originalStyles = {
      header: header ? header.style.display : '',
      footer: footer ? footer.style.display : '',
      content: content ? { padding: content.style.padding, background: content.style.background } : {}
    };
    
    try {
      // Hide header and footer
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
      
      // Adjust content for PDF
      if (content) {
        content.style.padding = '0';
        content.style.background = 'white';
      }
      
      // Call the PDF export function
      await onExportPDF();
      
    } finally {
      // Restore original styles
      if (header) header.style.display = originalStyles.header;
      if (footer) footer.style.display = originalStyles.footer;
      if (content) {
        content.style.padding = originalStyles.content.padding;
        content.style.background = originalStyles.content.background;
      }
      
      setIsExportingPDF(false);
    }
  };

  const handleSaveResume = async () => {
    if (onSaveResume) {
      await onSaveResume();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const capitalizedTemplate = selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1);

  // Show empty state if no data
  if (!data || (!data.name && !data.email && !data.phone)) {
    return (
      <div className="empty-resume-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
        <h3>Start Building Your Resume</h3>
        <p>Fill in your details to see a live preview</p>
      </div>
    );
  }

  return (
    <>
      <div className="resume-preview-container" ref={previewRef}>
        <div className="preview-header">
          <div className="preview-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Resume Preview
          </div>
          <div className="preview-actions">
            <button 
              className="action-button secondary"
              onClick={handleExportPDF}
              disabled={isDownloading || isExportingPDF}
              aria-label="Export resume as PDF"
            >
              {(isDownloading || isExportingPDF) ? (
                <div className="spinner" aria-hidden="true" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              Export PDF
            </button>
            <button 
              className="action-button primary"
              onClick={handleSaveResume}
              disabled={isDownloading || isExportingPDF}
              aria-label="Save resume"
            >
              {(isDownloading || isExportingPDF) ? (
                <div className="spinner" aria-hidden="true" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              Save Resume
            </button>
          </div>
        </div>

        <div className="preview-content">
          {(isDownloading || isExportingPDF) && (
            <div className="loading-overlay">
              <div className="loading-spinner" />
              <p>Processing your request...</p>
            </div>
          )}
          <div 
            id="resume-pdf-content"
            className="template-wrapper"
            style={{ 
              transform: `scale(${zoomLevel / 100})`,
            }}
          >
            {templateComponent}
          </div>
        </div>

        <div className="preview-footer">
          <div className="template-indicator">
            <span className="template-label">Template:</span>
            <span className="template-name">{capitalizedTemplate}</span>
          </div>
          <div className="zoom-controls">
            <button 
              className="zoom-button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              aria-label="Zoom out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <span className="zoom-level">{zoomLevel}%</span>
            <button 
              className="zoom-button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              aria-label="Zoom in"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
                <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ResumePreviewStyles />
    </>
  );
};

const ResumePreviewStyles = () => (
  <style jsx>{`
    .resume-preview-container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(226, 232, 240, 0.8);
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
      border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    }

    .preview-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a202c;
    }

    .preview-title svg {
      color: #667eea;
    }

    .preview-actions {
      display: flex;
      gap: 1rem;
    }

    .action-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      position: relative;
    }

    .action-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none !important;
    }

    .action-button.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
    }

    .action-button.primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .action-button.secondary {
      background: white;
      color: #4a5568;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .action-button.secondary:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e0;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .preview-content {
      flex: 1;
      padding: 2rem;
      background: #f8fafc;
      overflow: auto;
      position: relative;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    .loading-overlay p {
      color: #4a5568;
      font-weight: 500;
    }

    .template-wrapper {
      max-width: 210mm;
      margin: 0 auto;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      transform-origin: top center;
    }

    .template-wrapper:hover {
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    }

    .preview-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: white;
      border-top: 1px solid rgba(226, 232, 240, 0.6);
    }

    .template-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .template-label {
      color: #64748b;
      font-weight: 500;
    }

    .template-name {
      color: #667eea;
      font-weight: 600;
    }

    .zoom-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #f8fafc;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .zoom-button {
      width: 32px;
      height: 32px;
      border: none;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #4a5568;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .zoom-button:hover:not(:disabled) {
      background: #667eea;
      color: white;
      transform: scale(1.05);
    }

    .zoom-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .zoom-level {
      font-size: 0.85rem;
      font-weight: 600;
      color: #4a5568;
      min-width: 40px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .preview-header {
        padding: 1rem 1.5rem;
        flex-direction: column;
        gap: 1rem;
      }

      .preview-actions {
        width: 100%;
        justify-content: center;
      }

      .action-button {
        flex: 1;
        justify-content: center;
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
      }

      .preview-content {
        padding: 1rem;
      }

      .preview-footer {
        padding: 1rem 1.5rem;
        flex-direction: column;
        gap: 1rem;
      }

      .zoom-controls {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .preview-actions {
        flex-direction: column;
      }

      .action-button {
        width: 100%;
      }
    }
  `}</style>
);

export default ResumePreview;