import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const ResumeHistory = ({ onSelectResume, onViewResume, isDarkMode = false }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  
  const dropdownTriggerRefs = useRef({});

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/resume', config);
        setResumes(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // Calculate dropdown position
  useEffect(() => {
    if (openDropdownId && dropdownTriggerRefs.current[openDropdownId]) {
      const rect = dropdownTriggerRefs.current[openDropdownId].getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [openDropdownId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('resume-dropdown-portal');
      if (dropdown && !dropdown.contains(event.target)) {
        const triggerRef = dropdownTriggerRefs.current[openDropdownId];
        if (triggerRef && !triggerRef.contains(event.target)) {
          setOpenDropdownId(null);
        }
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdownId]);

  const handleRename = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.put(`http://localhost:5000/api/resume/${id}/rename`, { newName }, config);
      const updatedResumes = resumes.map(res =>
        res._id === id ? { ...res, name: newName } : res
      );
      setResumes(updatedResumes);
      setEditingId(null);
      setNewName('');
      setOpenDropdownId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to rename resume.');
    }
  };

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/share/resume/${id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Shareable link copied to clipboard!');
        setOpenDropdownId(null);
      })
      .catch((err) => console.error('Failed to copy link:', err));
  };

  const toggleDropdown = (resumeId) => {
    setOpenDropdownId(openDropdownId === resumeId ? null : resumeId);
  };

  const handleViewResume = (resume) => {
    onViewResume(resume);
    setOpenDropdownId(null);
  };

  const handleSelectResume = (resume) => {
    onSelectResume(resume);
    setOpenDropdownId(null);
  };

  const startRenaming = (resumeId, currentName) => {
    setEditingId(resumeId);
    setNewName(currentName);
    setOpenDropdownId(null);
  };

  // Get theme-aware styles
  const getContainerStyle = () => ({
    minHeight: '100vh',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1e1e2e 0%, #2d3748 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    backgroundImage: isDarkMode 
      ? 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
      : 'none',
    padding: '2rem 1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  const getCardStyle = () => ({
    maxWidth: '1000px',
    margin: '0 auto',
    background: isDarkMode ? 'rgba(30, 30, 50, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: isDarkMode 
      ? '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1)'
      : '0 32px 64px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(102, 126, 234, 0.1)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.6s ease-out',
  });

  const getButtonStyle = (variant = 'primary', isHovered = false) => {
    const baseStyle = {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      outline: 'none',
    };

    const variants = {
      primary: {
        background: isDarkMode 
          ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: isDarkMode 
          ? '0 0 20px rgba(139, 92, 246, 0.4)'
          : '0 8px 20px rgba(102, 126, 234, 0.3)',
        ...(isHovered && {
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode 
            ? '0 0 30px rgba(139, 92, 246, 0.6)'
            : '0 12px 30px rgba(102, 126, 234, 0.4)',
        })
      },
      success: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        boxShadow: isDarkMode 
          ? '0 0 15px rgba(16, 185, 129, 0.4)'
          : '0 4px 12px rgba(16, 185, 129, 0.3)',
        ...(isHovered && {
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode 
            ? '0 0 25px rgba(16, 185, 129, 0.6)'
            : '0 8px 20px rgba(16, 185, 129, 0.4)',
        })
      },
      secondary: {
        background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 116, 139, 0.1)',
        color: isDarkMode ? '#94a3b8' : '#64748b',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)'}`,
        ...(isHovered && {
          background: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(100, 116, 139, 0.15)',
          transform: 'translateY(-1px)',
        })
      },
      glass: {
        background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
        color: isDarkMode ? '#94a3b8' : '#64748b',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        backdropFilter: 'blur(10px)',
        ...(isHovered && {
          background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
          color: isDarkMode ? '#8b5cf6' : '#667eea',
          borderColor: isDarkMode ? '#8b5cf6' : '#667eea',
          transform: 'translateY(-2px)',
        })
      }
    };

    return { ...baseStyle, ...variants[variant] };
  };

  const getInputStyle = () => ({
    background: isDarkMode ? 'rgba(30, 30, 50, 0.8)' : '#ffffff',
    border: `2px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'}`,
    borderRadius: '16px',
    padding: '0.75rem 1rem',
    color: isDarkMode ? '#e2e8f0' : '#1a202c',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  });

  // Dropdown Portal Component
  const DropdownPortal = ({ resumeId }) => {
    if (openDropdownId !== resumeId) return null;

    return createPortal(
      <>
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode ? 'rgba(15, 15, 35, 0.4)' : 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            zIndex: 999999,
          }}
          onClick={() => setOpenDropdownId(null)}
        />
        <div 
          id="resume-dropdown-portal"
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
            minWidth: '200px',
            background: isDarkMode ? 'rgba(30, 30, 50, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
            borderRadius: '12px',
            padding: '0.5rem',
            boxShadow: isDarkMode 
              ? '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1)'
              : '0 25px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000000,
            animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <DropdownItem
            icon="👁️"
            text="View Resume"
            onClick={() => {
              const resume = resumes.find(r => r._id === resumeId);
              handleViewResume(resume);
            }}
          />
          <DropdownItem
            icon="✏️"
            text="Edit Resume"
            onClick={() => {
              const resume = resumes.find(r => r._id === resumeId);
              handleSelectResume(resume);
            }}
          />
          <DropdownItem
            icon="📝"
            text="Rename"
            onClick={() => {
              const resume = resumes.find(r => r._id === resumeId);
              startRenaming(resume._id, resume.name);
            }}
          />
          <div style={{
            height: '1px',
            background: isDarkMode 
              ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)',
            margin: '0.5rem 0'
          }}></div>
          <DropdownItem
            icon="🔗"
            text="Share Resume"
            onClick={() => handleShare(resumeId)}
            isShare={true}
          />
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </>,
      document.body
    );
  };

  const DropdownItem = ({ icon, text, onClick, isShare = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getItemStyle = () => {
      const baseStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        border: 'none',
        background: 'transparent',
        color: isDarkMode ? '#e2e8f0' : '#1a202c',
        textAlign: 'left',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2px'
      };

      if (isHovered) {
        if (isShare) {
          return {
            ...baseStyle,
            background: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(102, 126, 234, 0.15)',
            color: isDarkMode ? '#8b5cf6' : '#667eea',
            transform: 'translateX(4px)',
            boxShadow: isDarkMode 
              ? '0 0 15px rgba(139, 92, 246, 0.3)' 
              : '0 4px 12px rgba(102, 126, 234, 0.2)',
          };
        } else {
          return {
            ...baseStyle,
            background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
            transform: 'translateX(4px)',
            boxShadow: isDarkMode 
              ? '0 0 10px rgba(255, 255, 255, 0.1)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
          };
        }
      }

      return baseStyle;
    };

    return (
      <button
        onClick={onClick}
        style={getItemStyle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={{
          filter: isDarkMode && isHovered ? 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.5))' : 'none'
        }}>{icon}</span>
        <span>{text}</span>
      </button>
    );
  };

  if (loading) {
    return (
      <div style={getContainerStyle()}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
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
              Loading your resumes...
            </h3>
            <p style={{
              fontSize: '1rem',
              color: isDarkMode ? '#94a3b8' : '#64748b',
              margin: 0,
            }}>
              Please wait while we fetch your data
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

  return (
    <div style={getContainerStyle()}>
      <div style={getCardStyle()}>
        {isDarkMode && (
          <div style={{
            content: '',
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
          {/* Header Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '3rem',
            paddingBottom: '2rem',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: isDarkMode 
                ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: isDarkMode 
                ? '0 0 30px rgba(139, 92, 246, 0.4)' 
                : '0 8px 20px rgba(102, 126, 234, 0.3)',
              marginRight: '1.5rem',
              filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))' : 'none',
            }}>
              📋
            </div>
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                margin: '0 0 0.5rem 0',
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none',
              }}>
                My Resumes
              </h2>
              <p style={{
                color: isDarkMode ? '#94a3b8' : '#64748b',
                fontSize: '1rem',
                margin: 0
              }}>
                Manage and organize your resume collection
              </p>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
              borderRadius: '16px',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
              backdropFilter: 'blur(15px)',
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                opacity: 0.6,
                animation: 'float 3s ease-in-out infinite',
                filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))' : 'none',
              }}>
                📄
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: isDarkMode ? '#e2e8f0' : '#1a202c',
                marginBottom: '0.75rem',
                textShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
              }}>
                No Resumes Yet
              </h3>
              <p style={{
                fontSize: '1rem',
                color: isDarkMode ? '#94a3b8' : '#64748b',
                lineHeight: '1.6',
                maxWidth: '400px',
                margin: '0 auto 2rem auto'
              }}>
                You haven't created any resumes yet. Start building your professional profile and showcase your skills!
              </p>
              <button 
                style={getButtonStyle('primary')}
                onClick={() => window.location.reload()}
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div>
              {/* Stats Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                  textAlign: 'center',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
                  }}>
                    {resumes.length}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontWeight: '500'
                  }}>
                    Total Resumes
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                  textAlign: 'center',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: isDarkMode ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
                  }}>
                    {new Date().getFullYear()}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontWeight: '500'
                  }}>
                    Current Year
                  </div>
                </div>
              </div>

              {/* Resume List */}
              <div style={{ display: 'grid', gap: '1rem' }}>
                {resumes.map((resume, index) => (
                  <ResumeCard
                    key={resume._id}
                    resume={resume}
                    index={index}
                    editingId={editingId}
                    newName={newName}
                    setNewName={setNewName}
                    onRename={handleRename}
                    onSelect={handleSelectResume}
                    onToggleDropdown={toggleDropdown}
                    onCancelEdit={() => {
                      setEditingId(null);
                      setNewName('');
                    }}
                    isDarkMode={isDarkMode}
                    openDropdownId={openDropdownId}
                    dropdownTriggerRefs={dropdownTriggerRefs}
                    getButtonStyle={getButtonStyle}
                    getInputStyle={getInputStyle}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Render dropdown portals */}
      {resumes.map(resume => (
        <DropdownPortal key={`dropdown-${resume._id}`} resumeId={resume._id} />
      ))}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

// Resume Card Component
const ResumeCard = ({ 
  resume, 
  index, 
  editingId, 
  newName, 
  setNewName, 
  onRename, 
  onSelect, 
  onToggleDropdown,
  onCancelEdit,
  isDarkMode,
  openDropdownId,
  dropdownTriggerRefs,
  getButtonStyle,
  getInputStyle
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyle = () => ({
    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(15px)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
    animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    ...(isHovered && !editingId && {
      transform: 'translateY(-2px)',
      boxShadow: isDarkMode 
        ? '0 25px 50px rgba(139, 92, 246, 0.2), 0 0 30px rgba(139, 92, 246, 0.1)'
        : '0 20px 40px rgba(0, 0, 0, 0.15)',
    })
  });

  return (
    <div 
      style={getCardStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editingId === resume._id ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width: '100%'
        }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={getInputStyle()}
              autoFocus
              placeholder="Enter resume name..."
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onRename(resume._id)}
              style={{ ...getButtonStyle('success'), padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              style={{ ...getButtonStyle('secondary'), padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              paddingRight: '1rem',
              transition: 'all 0.3s ease',
            }}
            onClick={() => onSelect(resume)}
          >
            <div 
              style={{
                fontSize: '2rem',
                marginRight: '1rem',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))' : 'none',
                ...(isHovered && { transform: 'scale(1.1) rotate(5deg)' })
              }}
            >
              📄
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: isDarkMode ? '#e2e8f0' : '#1a202c',
                margin: '0 0 0.25rem 0',
                lineHeight: '1.3',
                textShadow: isDarkMode ? '0 0 5px rgba(139, 92, 246, 0.2)' : 'none',
              }}>
                {resume.name || `Resume ${index + 1}`}
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: isDarkMode ? '#94a3b8' : '#64748b',
                margin: '0 0 0.25rem 0'
              }}>
                Created {new Date(resume.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  boxShadow: isDarkMode ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
                }}>
                  {resume.selectedTemplate || 'Classic'} Template
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                  color: isDarkMode ? '#94a3b8' : '#64748b',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                }}>
                  Last modified {new Date(resume.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button
              ref={el => dropdownTriggerRefs.current[resume._id] = el}
              style={{
                ...getButtonStyle('glass'),
                width: '40px',
                height: '40px',
                padding: 0,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: openDropdownId === resume._id ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
              onClick={() => onToggleDropdown(resume._id)}
            >
              ⋮
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add fadeInUp animation to the global styles
const globalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  if (!document.head.querySelector('style[data-resume-history]')) {
    styleElement.setAttribute('data-resume-history', 'true');
    document.head.appendChild(styleElement);
  }
}

export default ResumeHistory;