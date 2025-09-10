import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const UserProfile = ({ user, onLogout, toggleHistoryView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Calculate menu position based on trigger element
  useEffect(() => {
    if (showMenu && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      });
    }
  }, [showMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        const menu = document.getElementById('user-dropdown-portal');
        if (menu && !menu.contains(event.target)) {
          setShowMenu(false);
        }
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  const handleLogout = () => {
    setShowMenu(false);
    // Clear any stored user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Call the logout function passed from parent
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  };

  const MenuPortal = () => {
    if (!showMenu) return null;

    return createPortal(
      <>
        <div 
          className="menu-backdrop-portal"
          onClick={() => setShowMenu(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(5px)',
            zIndex: 999999,
          }}
        />
        <div 
          id="user-dropdown-portal"
          className="user-dropdown-portal"
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
            minWidth: '280px',
            maxWidth: '90vw',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '0.75rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000000,
            animation: 'menuFade 0.3s ease-out',
          }}
        >
          {/* User Info Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '12px',
            marginBottom: '0.75rem',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}>
              <span>{getInitials(user.name)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a202c',
                margin: '0 0 0.25rem 0',
              }}>{user.name}</h4>
              <p style={{
                fontSize: '0.8rem',
                color: '#64748b',
                margin: '0',
              }}>{user.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            {/* Resume History Button */}
            <MenuItemPortal
              icon="📄"
              title="Resume History"
              subtitle="View your saved resumes"
              onClick={() => {
                toggleHistoryView();
                setShowMenu(false);
              }}
            />

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)',
              margin: '0.5rem 0',
            }}></div>

            {/* Logout Button */}
            <MenuItemPortal
              icon="🚪"
              title="Sign Out"
              subtitle="Logout from your account"
              onClick={handleLogout}
              isLogout={true}
            />
          </div>
        </div>

        <style>{`
          @keyframes menuFade {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .user-dropdown-portal::-webkit-scrollbar {
            width: 6px;
          }
          
          .user-dropdown-portal::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
          }
          
          .user-dropdown-portal::-webkit-scrollbar-thumb {
            background: rgba(102, 126, 234, 0.3);
            border-radius: 3px;
          }
        `}</style>
      </>,
      document.body
    );
  };

  const MenuItemPortal = ({ icon, title, subtitle, onClick, isLogout = false }) => {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem',
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          transition: 'all 0.2s ease',
          marginBottom: '0.25rem',
        }}
        onMouseEnter={(e) => {
          if (isLogout) {
            e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            e.target.style.color = '#dc2626';
          } else {
            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
          }
          e.target.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'inherit';
          e.target.style.transform = 'translateX(0)';
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: isLogout ? 'rgba(239, 68, 68, 0.1)' : 'rgba(102, 126, 234, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: isLogout ? '#dc2626' : '#1a202c',
            marginBottom: '0.2rem',
          }}>{title}</div>
          <div style={{
            fontSize: '0.75rem',
            color: isLogout ? '#f87171' : '#64748b',
            fontWeight: '500',
          }}>{subtitle}</div>
        </div>
        <div style={{
          color: isLogout ? '#dc2626' : '#94a3b8',
          fontSize: '0.8rem',
          flexShrink: 0,
        }}>→</div>
      </button>
    );
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div 
        ref={triggerRef}
        onClick={() => setShowMenu(!showMenu)} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: '200px',
          ...(showMenu && {
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          })
        }}
        onMouseEnter={(e) => {
          if (!showMenu) {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (!showMenu) {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        <div style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
          flexShrink: 0,
        }}>
          <span style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '0.875rem',
            letterSpacing: '0.5px',
          }}>{getInitials(user.name)}</span>
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            background: '#10b981',
            border: '2px solid white',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
          }}></div>
        </div>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          minWidth: 0,
        }}>
          <span style={{
            color: 'white',
            fontWeight: '600',
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{user.name}</span>
          <span style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
            fontWeight: '500',
          }}>Online</span>
        </div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <MenuPortal />
    </div>
  );
};

export default UserProfile;