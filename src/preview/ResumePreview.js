import React, { useState, useMemo, forwardRef, useEffect } from 'react';
import ClassicTemplate from '../templates/classic/ClassicTemplate';
import ModernTemplate from '../templates/modern/ModernTemplate';
import CreativeTemplate from '../templates/creative/CreativeTemplate';
import ProfessionalTemplate from '../templates/professional/ProfessionalTemplate';

// Use forwardRef to correctly pass the ref from the parent component
const ResumePreview = forwardRef(({ data, selectedTemplate = 'classic', onExportPDF, onSaveResume, isDownloading, theme }, ref) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [resumeDataForPDF, setResumeDataForPDF] = useState(null);
  const isDarkMode = theme === 'dark';

  // Update resume data for PDF when data changes
  useEffect(() => {
    if (data) {
      console.log('Updating resume data for PDF:', data);
      setResumeDataForPDF({ ...data });
      
      // Force a small delay to ensure DOM updates
      setTimeout(() => {
        const element = document.getElementById('resume-pdf-content');
        if (element) {
          console.log('PDF element found and data updated');
        }
      }, 100);
    }
  }, [data]);

  const templateComponent = useMemo(() => {
    // Use resumeDataForPDF if available, otherwise fall back to data
    const activeData = resumeDataForPDF || data;
    
    // Add null check for data
    if (!activeData) return null;
    
    console.log('Rendering template with data:', activeData);
    
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={activeData} isDarkMode={isDarkMode} />;
      case 'creative':
        return <CreativeTemplate data={activeData} isDarkMode={isDarkMode} />;
      case 'professional':
        return <ProfessionalTemplate data={activeData} isDarkMode={isDarkMode} />;
      case 'classic':
      default:
        return <ClassicTemplate data={activeData} isDarkMode={isDarkMode} />;
    }
  }, [selectedTemplate, resumeDataForPDF, data, isDarkMode]);

  const handleExportPDF = async () => {
    console.log('Export PDF clicked');
    console.log('Current data for PDF:', resumeDataForPDF || data);
    
    if (!onExportPDF) {
      console.log('No onExportPDF function provided');
      return;
    }
    
    setIsExportingPDF(true);
    console.log('Starting PDF export process...');
    
    // Force update the resume data before PDF generation
    if (data) {
      setResumeDataForPDF({ ...data });
      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    try {
      await onExportPDF();
      console.log('PDF export completed');
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleSaveResume = async (e) => {
    console.log('Save resume clicked');
    if (onSaveResume) {
      try {
        await onSaveResume(e);
        console.log('Resume save completed');
      } catch (error) {
        console.error('Resume save failed:', error);
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const capitalizedTemplate = selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1);

  const themeStyles = {
    light: {
      container: {
        background: '#ffffff',
        border: '1px solid #e9ecef',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      },
      header: {
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      },
      content: {
        background: '#f8f9fa'
      },
      footer: {
        background: '#ffffff',
        borderTop: '1px solid #e9ecef'
      },
      text: {
        primary: '#212529',
        secondary: '#495057',
        muted: '#6c757d'
      },
      button: {
        primary: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
          hover: {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
          }
        },
        secondary: {
          background: '#ffffff',
          color: '#212529',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          hover: {
            background: '#f8f9fa',
            borderColor: '#667eea'
          }
        }
      },
      zoom: {
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        button: {
          background: '#ffffff',
          border: '1px solid #e9ecef',
          hover: {
            background: '#667eea',
            color: 'white',
            borderColor: '#667eea'
          }
        }
      },
      loading: {
        overlay: 'rgba(255, 255, 255, 0.95)'
      }
    },
    dark: {
      container: {
        background: '#1e293b',
        border: '1px solid #475569',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
      },
      header: {
        background: '#0f172a',
        borderBottom: '1px solid #475569'
      },
      content: {
        background: '#0f172a'
      },
      footer: {
        background: '#1e293b',
        borderTop: '1px solid #475569'
      },
      text: {
        primary: '#e2e8f0',
        secondary: '#94a3b8',
        muted: '#64748b'
      },
      button: {
        primary: {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
          color: 'white',
          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
          hover: {
            background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.5)'
          }
        },
        secondary: {
          background: '#1e293b',
          color: '#e2e8f0',
          border: '1px solid #475569',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          hover: {
            background: '#374151',
            borderColor: '#8b5cf6'
          }
        }
      },
      zoom: {
        background: '#1e293b',
        border: '1px solid #475569',
        button: {
          background: '#0f172a',
          border: '1px solid #475569',
          hover: {
            background: '#8b5cf6',
            color: 'white',
            borderColor: '#8b5cf6'
          }
        }
      },
      loading: {
        overlay: 'rgba(15, 23, 42, 0.95)'
      }
    }
  };

  // Ensure we have a valid theme and currentTheme object
  const currentTheme = themeStyles[theme] || themeStyles.light;

  // Show empty state if no data or essential data is missing
  if (!data || (!data.name && !data.email && !data.phone)) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          background: currentTheme.container.background,
          border: `2px dashed ${isDarkMode ? '#475569' : '#e9ecef'}`,
          borderRadius: '20px',
          color: currentTheme.text.secondary,
          textAlign: 'center',
          padding: '2rem',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          style={{
            width: '64px',
            height: '64px',
            marginBottom: '1rem',
            color: currentTheme.text.muted
          }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
        <h3 
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: currentTheme.text.primary,
            margin: '0 0 0.5rem 0'
          }}
        >
          Start Building Your Resume
        </h3>
        <p 
          style={{
            fontSize: '1rem',
            margin: 0,
            color: currentTheme.text.secondary
          }}
        >
          Fill in your details to see a live preview
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        ...currentTheme.container
      }}
    >
      <div 
        className="preview-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          transition: 'all 0.3s ease-in-out',
          ...currentTheme.header
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: currentTheme.text.primary,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{
              color: isDarkMode ? '#8b5cf6' : '#667eea',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          Resume Preview
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleExportPDF}
            disabled={isDownloading || isExportingPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: (isDownloading || isExportingPDF) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease-in-out',
              border: 'none',
              position: 'relative',
              opacity: (isDownloading || isExportingPDF) ? 0.7 : 1,
              ...currentTheme.button.secondary
            }}
            onMouseOver={(e) => {
              if (!isDownloading && !isExportingPDF) {
                Object.assign(e.currentTarget.style, currentTheme.button.secondary.hover);
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (!isDownloading && !isExportingPDF) {
                Object.assign(e.currentTarget.style, currentTheme.button.secondary);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {(isDownloading || isExportingPDF) ? (
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              />
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
            onClick={handleSaveResume}
            disabled={isDownloading || isExportingPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: (isDownloading || isExportingPDF) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease-in-out',
              border: 'none',
              position: 'relative',
              opacity: (isDownloading || isExportingPDF) ? 0.7 : 1,
              ...currentTheme.button.primary
            }}
            onMouseOver={(e) => {
              if (!isDownloading && !isExportingPDF) {
                Object.assign(e.currentTarget.style, currentTheme.button.primary.hover);
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isDownloading && !isExportingPDF) {
                Object.assign(e.currentTarget.style, currentTheme.button.primary);
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {(isDownloading || isExportingPDF) ? (
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              />
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

      <div 
        className="preview-content"
        style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto',
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
          ...currentTheme.content
        }}
      >
        {(isDownloading || isExportingPDF) && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: currentTheme.loading.overlay,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                border: `4px solid ${isDarkMode ? '#475569' : '#e9ecef'}`,
                borderTop: `4px solid ${isDarkMode ? '#8b5cf6' : '#667eea'}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }}
            />
            <p 
              style={{
                color: currentTheme.text.primary,
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                margin: 0
              }}
            >
              Processing your request...
            </p>
          </div>
        )}
        
        {/* Clean PDF-only wrapper - FIXED VERSION */}
        <div 
          id="pdf-wrapper"
          style={{
            position: 'relative',
            maxWidth: '210mm',
            margin: '0 auto',
          }}
        >
          <div 
            id="resume-pdf-content"
            data-pdf-content="true"
            className="resume-template pdf-clean"
            style={{
              boxShadow: isDarkMode ? '0 25px 50px rgba(0, 0, 0, 0.4)' : '0 25px 50px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              transformOrigin: 'top center',
              background: '#ffffff',
              transform: `scale(${zoomLevel / 100})`,
              width: '100%',
              minHeight: '297mm',
              position: 'relative',
              zIndex: 1
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = isDarkMode ? '0 30px 60px rgba(0, 0, 0, 0.5)' : '0 30px 60px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = isDarkMode ? '0 25px 50px rgba(0, 0, 0, 0.4)' : '0 25px 50px rgba(0, 0, 0, 0.1)';
            }}
          >
            {templateComponent}
          </div>
        </div>
      </div>

      <div 
        className="preview-footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          transition: 'all 0.3s ease-in-out',
          ...currentTheme.footer
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <span 
            style={{
              color: currentTheme.text.secondary,
              fontWeight: 500,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Template:
          </span>
          <span 
            style={{
              color: isDarkMode ? '#8b5cf6' : '#667eea',
              fontWeight: 600,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {capitalizedTemplate}
          </span>
        </div>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            transition: 'all 0.3s ease-in-out',
            ...currentTheme.zoom
          }}
        >
          <button 
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoomLevel <= 50 ? 'not-allowed' : 'pointer',
              color: currentTheme.text.primary,
              transition: 'all 0.3s ease-in-out',
              opacity: zoomLevel <= 50 ? 0.5 : 1,
              ...currentTheme.zoom.button
            }}
            onMouseOver={(e) => {
              if (zoomLevel > 50) {
                Object.assign(e.currentTarget.style, currentTheme.zoom.button.hover);
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              if (zoomLevel > 50) {
                Object.assign(e.currentTarget.style, currentTheme.zoom.button);
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <span 
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: currentTheme.text.primary,
              minWidth: '40px',
              textAlign: 'center',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {zoomLevel}%
          </span>
          <button 
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoomLevel >= 150 ? 'not-allowed' : 'pointer',
              color: currentTheme.text.primary,
              transition: 'all 0.3s ease-in-out',
              opacity: zoomLevel >= 150 ? 0.5 : 1,
              ...currentTheme.zoom.button
            }}
            onMouseOver={(e) => {
              if (zoomLevel < 150) {
                Object.assign(e.currentTarget.style, currentTheme.zoom.button.hover);
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              if (zoomLevel < 150) {
                Object.assign(e.currentTarget.style, currentTheme.zoom.button);
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* PDF-specific clean styles - ENHANCED VERSION */
        .pdf-clean {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .pdf-clean * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
          -webkit-text-fill-color: initial !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
        }

        .pdf-clean h1,
        .pdf-clean h2,
        .pdf-clean h3,
        .pdf-clean h4,
        .pdf-clean h5,
        .pdf-clean h6,
        .pdf-clean p,
        .pdf-clean span,
        .pdf-clean div {
          -webkit-text-fill-color: inherit !important;
          color: inherit !important;
          background-clip: padding-box !important;
          -webkit-background-clip: padding-box !important;
        }

        /* Remove problematic styles for PDF */
        .pdf-clean .name-style,
        .pdf-clean [style*="webkit-text-fill-color: transparent"],
        .pdf-clean [style*="background-clip: text"] {
          -webkit-text-fill-color: white !important;
          color: white !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
        }

        @media print {
          .pdf-clean {
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
            background: white !important;
            page-break-inside: avoid;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .pdf-clean * {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            filter: none !important;
            -webkit-filter: none !important;
          }

          .pdf-clean .background-element-1,
          .pdf-clean .background-element-2,
          .pdf-clean [style*="position: fixed"],
          .pdf-clean [style*="position: absolute"][style*="z-index"] {
            display: none !important;
          }

          /* Ensure header text is visible */
          .pdf-clean .header h1,
          .pdf-clean .header .name {
            color: white !important;
            -webkit-text-fill-color: white !important;
            background: none !important;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .preview-header {
            padding: 1rem 1.5rem !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }

          .preview-actions {
            width: 100% !important;
            justify-content: center !important;
          }

          .action-button {
            flex: 1 !important;
            justify-content: center !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.85rem !important;
          }

          .preview-content {
            padding: 1rem !important;
          }

          .preview-footer {
            padding: 1rem 1.5rem !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }

          .zoom-controls {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .preview-actions {
            flex-direction: column !important;
          }

          .action-button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;