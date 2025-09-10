import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const ResumeHistory = ({ onSelectResume, onViewResume }) => {
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
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(2px)',
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
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            padding: '0.5rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000000,
            animation: 'fadeInUp 0.2s ease',
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
            background: 'rgba(148, 163, 184, 0.3)',
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
        `}</style>
      </>,
      document.body
    );
  };

  const DropdownItem = ({ icon, text, onClick, isShare = false }) => {
    return (
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: 'none',
          background: 'transparent',
          color: '#1a202c',
          textAlign: 'left',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2px'
        }}
        onMouseEnter={(e) => {
          if (isShare) {
            e.target.style.background = 'rgba(102, 126, 234, 0.15)';
            e.target.style.color = '#667eea';
          } else {
            e.target.style.background = 'rgba(0, 0, 0, 0.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#1a202c';
        }}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3 className="loading-text">Loading your resumes...</h3>
          <p className="loading-subtitle">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="modern-card fade-in-up">
        <div className="card-content">
          {/* Header Section */}
          <div className="card-header">
            <div className="card-icon">
              📋
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                My Resumes
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
                Manage and organize your resume collection
              </p>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'var(--bg-glass)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-glass)'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                opacity: 0.6,
                animation: 'float 3s ease-in-out infinite'
              }}>
                📄
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                No Resumes Yet
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                maxWidth: '400px',
                margin: '0 auto 2rem auto'
              }}>
                You haven't created any resumes yet. Start building your professional profile and showcase your skills!
              </p>
              <button 
                className="modern-btn btn-primary"
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
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-glass)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {resumes.length}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                  }}>
                    Total Resumes
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-glass)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'var(--gradient-success)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {new Date().getFullYear()}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                  }}>
                    Current Year
                  </div>
                </div>
              </div>

              {/* Resume List */}
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {resumes.map((resume, index) => (
                  <div
                    key={resume._id}
                    className="modern-card"
                    style={{
                      background: 'var(--bg-glass)',
                      backdropFilter: 'blur(10px)',
                      padding: '0',
                      animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
                      marginBottom: '0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ padding: '1.5rem' }}>
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
                              className="form-input"
                              autoFocus
                              placeholder="Enter resume name..."
                              style={{
                                background: 'var(--bg-primary)',
                                border: '2px solid var(--primary-color)',
                                borderRadius: 'var(--border-radius)',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem'
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleRename(resume._id)}
                              className="modern-btn btn-success btn-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setNewName('');
                              }}
                              className="modern-btn btn-secondary btn-sm"
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
                              paddingRight: '1rem'
                            }}
                            onClick={() => handleSelectResume(resume)}
                          >
                            <div style={{
                              fontSize: '2rem',
                              marginRight: '1rem',
                              transition: 'transform 0.2s ease'
                            }}>
                              📄
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                margin: '0 0 0.25rem 0',
                                lineHeight: '1.3'
                              }}>
                                {resume.name || `Resume ${index + 1}`}
                              </h4>
                              <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
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
                                alignItems: 'center'
                              }}>
                                <span style={{
                                  padding: '0.25rem 0.75rem',
                                  background: 'var(--gradient-primary)',
                                  color: '#ffffff',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  textTransform: 'capitalize'
                                }}>
                                  {resume.selectedTemplate || 'Classic'} Template
                                </span>
                                <span style={{
                                  padding: '0.25rem 0.75rem',
                                  background: 'var(--bg-tertiary)',
                                  color: 'var(--text-secondary)',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500'
                                }}>
                                  Last modified {new Date(resume.updatedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ position: 'relative' }}>
                            <button
                              ref={el => dropdownTriggerRefs.current[resume._id] = el}
                              className="modern-btn btn-glass btn-icon"
                              onClick={() => toggleDropdown(resume._id)}
                              style={{
                                width: '40px',
                                height: '40px',
                                fontSize: '1.2rem'
                              }}
                            >
                              ⋮
                            </button>
                            
                            <DropdownPortal resumeId={resume._id} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeHistory;