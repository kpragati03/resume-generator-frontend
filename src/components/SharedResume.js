import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ClassicTemplate from '../templates/classic/ClassicTemplate';
import ModernTemplate from '../templates/modern/ModernTemplate';
import CreativeTemplate from '../templates/creative/CreativeTemplate';
import ProfessionalTemplate from '../templates/professional/ProfessionalTemplate';

const SharedResume = () => {
    const { id } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const renderTemplate = () => {
        switch (resumeData.selectedTemplate) {
            case 'modern':
                return <ModernTemplate data={resumeData} />;
            case 'creative':
                return <CreativeTemplate data={resumeData} />;
            case 'professional':
                return <ProfessionalTemplate data={resumeData} />;
            case 'classic':
            default:
                return <ClassicTemplate data={resumeData} />;
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <h3 className="loading-text">Loading Resume...</h3>
                    <p className="loading-subtitle">Please wait while we fetch the resume</p>
                </div>
            </div>
        );
    }

    if (error || !resumeData) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: '3rem 2rem',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1.5rem',
                        opacity: 0.7
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '1rem'
                    }}>
                        Resume Not Found
                    </h3>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        lineHeight: '1.6'
                    }}>
                        {error || "The resume you're looking for doesn't exist or has been removed."}
                    </p>
                    <button 
                        className="modern-btn btn-primary"
                        onClick={() => window.location.href = '/'}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0',
                    padding: '2rem',
                    marginBottom: 0
                }}>
                    <div style={{
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
                                color: 'var(--text-primary)',
                                margin: '0 0 0.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>👁️</span>
                                Resume Preview
                            </h1>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                Shared resume • View only
                            </p>
                        </div>
                        <div style={{
                            background: 'var(--bg-glass)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: '25px',
                            padding: '0.75rem 1.5rem',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span>🎨</span>
                            {resumeData.selectedTemplate || 'Classic'} Template
                        </div>
                    </div>
                </div>

                {/* Resume Content */}
                <div style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-xl)',
                    minHeight: '600px'
                }}>
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
};

export default SharedResume;