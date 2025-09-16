import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import ClassicTemplate from '../templates/classic/ClassicTemplate';
import ModernTemplate from '../templates/modern/ModernTemplate';
import CreativeTemplate from '../templates/creative/CreativeTemplate';
import ProfessionalTemplate from '../templates/professional/ProfessionalTemplate';

const SharedResume = ({ isDarkMode = false }) => {
    const { id } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const contentRef = useRef();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/share/${id}`);
                
                // Fix data format for template compatibility
                const processedData = {
                    ...res.data,
                    // Convert skills array to string if needed
                    skills: Array.isArray(res.data.skills) 
                        ? res.data.skills.join(', ') 
                        : (res.data.skills || ''),
                    
                    // Ensure experience array exists
                    experience: res.data.experience || [],
                    
                    // Ensure education array exists
                    education: res.data.education || [],
                    
                    // Ensure other fields have default values
                    personalDetails: {
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        ...res.data.personalDetails
                    }
                };
                
                setResumeData(processedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching shared resume:', err);
                setError('Could not fetch resume. It may have been deleted or the link is invalid.');
                setLoading(false);
            }
        };

        if (id) {
            fetchResume();
        }
    }, [id]);

    // FIXED SHARED RESUME PDF DOWNLOAD
    const handleSharedPDFDownload = async () => {
        if (!contentRef.current) {
            alert('Resume content not found');
            return;
        }

        setIsDownloading(true);
        
        try {
            // Wait for DOM to be fully rendered
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find the resume template content with multiple fallback selectors
            let resumeElement = 
                contentRef.current.querySelector('.resume-template') ||
                contentRef.current.querySelector('.template-container') ||
                contentRef.current.querySelector('[class*="template"]') ||
                contentRef.current.querySelector('.resume-content') ||
                contentRef.current.querySelector('.preview-content > div') ||
                contentRef.current.children[0];

            if (!resumeElement) {
                console.error('Resume element not found. Available elements:', contentRef.current.innerHTML);
                alert('Resume template not found. Please try again.');
                return;
            }

            console.log('Found resume element:', resumeElement);

            // Create a clean copy for PDF generation
            const cleanElement = resumeElement.cloneNode(true);

            // Remove unwanted elements
            const unwantedSelectors = [
                '.preview-header', '.preview-actions', '.form-navigation', '.modern-btn',
                'button', '[class*="btn"]', '.export-actions', '.action-button',
                '.nav-controls', '.workspace-left', '.workspace-right', '.main-workspace',
                '.header-section', '.auth-container', '.loading-container'
            ];
            
            unwantedSelectors.forEach(selector => {
                const elements = cleanElement.querySelectorAll(selector);
                elements.forEach(el => el.remove());
            });

            // Create a temporary container with proper PDF styling
            const tempContainer = document.createElement('div');
            tempContainer.style.cssText = `
                position: fixed;
                top: -10000px;
                left: -10000px;
                width: 794px;
                min-height: 1123px;
                background: white;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                line-height: 1.6;
                color: #333333;
                padding: 40px;
                box-sizing: border-box;
                overflow: visible;
                z-index: -1000;
            `;

            // Apply proper styling to the cloned element
            cleanElement.style.cssText = `
                width: 100%;
                background: white;
                color: #333333;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            `;

            tempContainer.appendChild(cleanElement);
            document.body.appendChild(tempContainer);

            // Wait for styles to apply and fonts to load
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify content is there
            if (!cleanElement.innerText.trim()) {
                console.error('No text content found in resume element');
                alert('Resume content is empty. Please check the resume data.');
                document.body.removeChild(tempContainer);
                return;
            }

            console.log('Resume content for PDF:', cleanElement.innerText.substring(0, 100) + '...');

            // PDF generation options
            const opt = {
                margin: [15, 15, 15, 15],
                filename: `${resumeData.name || 'Resume'}.pdf`,
                image: { 
                    type: 'jpeg', 
                    quality: 1.0 
                },
                html2canvas: { 
                    scale: 3,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    letterRendering: true,
                    logging: false,
                    width: 794,
                    height: Math.max(tempContainer.scrollHeight, 1123),
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 794,
                    windowHeight: Math.max(tempContainer.scrollHeight, 1123)
                },
                jsPDF: { 
                    unit: 'pt', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            console.log('Starting PDF generation...');
            await html2pdf().set(opt).from(tempContainer).save();
            console.log('PDF generated successfully');
            
            // Clean up
            document.body.removeChild(tempContainer);
            
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert(`PDF generation failed: ${error.message}. Please try again.`);
        } finally {
            setIsDownloading(false);
        }
    };

    const renderTemplate = () => {
        const templateProps = { data: resumeData, isDarkMode };
        switch (resumeData.selectedTemplate) {
            case 'modern':
                return <ModernTemplate {...templateProps} />;
            case 'creative':
                return <CreativeTemplate {...templateProps} />;
            case 'professional':
                return <ProfessionalTemplate {...templateProps} />;
            case 'classic':
            default:
                return <ClassicTemplate {...templateProps} />;
        }
    };

    // Theme-aware styles
    const getContainerStyle = () => ({
        minHeight: '100vh',
        background: isDarkMode 
            ? 'linear-gradient(135deg, #1e1e2e 0%, #2d3748 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundImage: isDarkMode 
            ? 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
            : 'none',
        padding: '2rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    });

    const getCardStyle = () => ({
        background: isDarkMode ? 'rgba(30, 30, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(25px)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        borderRadius: '20px',
        boxShadow: isDarkMode 
            ? '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1)'
            : '0 20px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        overflow: 'hidden',
    });

    const getButtonStyle = (variant = 'primary', isDisabled = false) => {
        const baseStyle = {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            outline: 'none',
            opacity: isDisabled ? 0.7 : 1,
        };

        if (variant === 'primary') {
            return {
                ...baseStyle,
                background: isDarkMode 
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: isDarkMode 
                    ? '0 0 20px rgba(139, 92, 246, 0.4)'
                    : '0 8px 20px rgba(102, 126, 234, 0.3)',
                ...((!isDisabled) && {
                    ':hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: isDarkMode 
                            ? '0 0 30px rgba(139, 92, 246, 0.6)'
                            : '0 12px 30px rgba(102, 126, 234, 0.4)',
                    }
                })
            };
        }

        return baseStyle;
    };

    const getBadgeStyle = () => ({
        background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(15px)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        borderRadius: '25px',
        padding: '0.75rem 1.5rem',
        color: isDarkMode ? '#e2e8f0' : '#1a202c',
        fontSize: '0.9rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.2)' : 'none',
        textShadow: isDarkMode ? '0 0 5px rgba(139, 92, 246, 0.3)' : 'none',
    });

    if (loading) {
        return (
            <div style={getContainerStyle()}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}>
                    <div style={{
                        textAlign: 'center',
                        background: isDarkMode ? 'rgba(30, 30, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(25px)',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                        borderRadius: '20px',
                        padding: '3rem 2rem',
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: isDarkMode 
                            ? '0 25px 50px rgba(139, 92, 246, 0.3)' 
                            : '0 20px 40px rgba(0, 0, 0, 0.15)',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            border: `4px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderTop: `4px solid ${isDarkMode ? '#8b5cf6' : '#667eea'}`,
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 2rem',
                            filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none',
                        }}></div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: isDarkMode ? '#e2e8f0' : '#1a202c',
                            margin: '0 0 1rem 0',
                            textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
                        }}>
                            Loading Resume...
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: isDarkMode ? '#94a3b8' : '#64748b',
                            margin: 0,
                        }}>
                            Please wait while we fetch the resume
                        </p>
                    </div>
                </div>
                
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error || !resumeData) {
        return (
            <div style={getContainerStyle()}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}>
                    <div style={{
                        textAlign: 'center',
                        background: isDarkMode ? 'rgba(30, 30, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(25px)',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                        borderRadius: '20px',
                        padding: '3rem 2rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: isDarkMode 
                            ? '0 25px 50px rgba(139, 92, 246, 0.3)' 
                            : '0 20px 40px rgba(0, 0, 0, 0.15)',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1.5rem',
                            opacity: 0.7,
                            filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(245, 101, 101, 0.5))' : 'none'
                        }}>
                            ⚠️
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: isDarkMode ? '#e2e8f0' : '#1a202c',
                            marginBottom: '1rem',
                            textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none'
                        }}>
                            Resume Not Found
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: isDarkMode ? '#94a3b8' : '#64748b',
                            marginBottom: '2rem',
                            lineHeight: '1.6'
                        }}>
                            {error || "The resume you're looking for doesn't exist or has been removed."}
                        </p>
                        <button 
                            style={getButtonStyle('primary')}
                            onClick={() => window.location.href = '/'}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={getContainerStyle()}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header */}
                <div style={{
                    ...getCardStyle(),
                    borderRadius: '20px 20px 0 0',
                    padding: '2rem',
                    marginBottom: 0,
                }}>
                    {isDarkMode && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}></div>
                    )}
                    
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: isDarkMode ? '#e2e8f0' : '#1a202c',
                                margin: '0 0 0.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none'
                            }}>
                                <span style={{
                                    filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none'
                                }}>👁️</span>
                                Resume Preview
                            </h1>
                            <p style={{
                                fontSize: '1rem',
                                color: isDarkMode ? '#94a3b8' : '#64748b',
                                margin: 0
                            }}>
                                Shared resume • View only
                            </p>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={getBadgeStyle()}>
                                <span>🎨</span>
                                {resumeData.selectedTemplate || 'Classic'} Template
                            </div>
                            <button 
                                onClick={handleSharedPDFDownload}
                                disabled={isDownloading}
                                style={getButtonStyle('primary', isDownloading)}
                                onMouseEnter={(e) => {
                                    if (!isDownloading) {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = isDarkMode 
                                            ? '0 0 30px rgba(139, 92, 246, 0.6)'
                                            : '0 12px 30px rgba(102, 126, 234, 0.4)';
                                        if (isDarkMode) e.target.style.filter = 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.7))';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isDownloading) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = isDarkMode 
                                            ? '0 0 20px rgba(139, 92, 246, 0.4)'
                                            : '0 8px 20px rgba(102, 126, 234, 0.3)';
                                        if (isDarkMode) e.target.style.filter = 'none';
                                    }
                                }}
                            >
                                <i className={isDownloading ? 'fas fa-spinner fa-spin' : 'fas fa-download'}></i>
                                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resume Content - WRAPPED PROPERLY FOR PDF */}
                <div style={{
                    ...getCardStyle(),
                    borderRadius: '0 0 20px 20px',
                    padding: '2rem',
                    minHeight: '600px'
                }}>
                    {isDarkMode && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}></div>
                    )}
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div ref={contentRef} className="resume-content-wrapper">
                            <div className="resume-template">
                                {renderTemplate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedResume;