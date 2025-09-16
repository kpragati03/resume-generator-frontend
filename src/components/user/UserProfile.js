import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const UserProfile = ({ user, onLogout, toggleHistoryView, theme }) => {
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
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  };

  // Define a very light purple base for glassmorphism
  const glassBasePurple = 'rgba(230, 230, 250, 0.2)'; // Lavender blush with transparency
  const glassBorderLight = 'rgba(255, 255, 255, 0.3)';
  const glassBorderDark = 'rgba(255, 255, 255, 0.1)';

  const themeStyles = {
    light: {
      trigger: {
        background: glassBasePurple,
        border: `1px solid ${glassBorderLight}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      },
      triggerHover: {
        background: 'rgba(230, 230, 250, 0.3)', // Slightly more opaque on hover
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)'
      },
      backdrop: 'rgba(240, 240, 255, 0.5)', // Very light purple backdrop
      menuCard: {
        background: 'rgba(245, 245, 255, 0.9)', // Lighter, more opaque purple for menu
        border: `1px solid ${glassBorderLight}`,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.08)'
      },
      text: {
        primary: '#212529', // Dark text for contrast on light purple
        secondary: '#495057',
        muted: '#6c757d'
      }
    },
    dark: {
      trigger: {
        background: 'rgba(70, 40, 100, 0.2)', // Darker translucent purple
        border: `1px solid ${glassBorderDark}`,
        boxShadow: '0 8px 32px rgba(144, 205, 244, 0.15)'
      },
      triggerHover: {
        background: 'rgba(70, 40, 100, 0.3)', // Slightly more opaque on hover
        boxShadow: '0 8px 32px rgba(144, 205, 244, 0.25)'
      },
      backdrop: 'rgba(15, 15, 35, 0.8)', // Keep dark backdrop for contrast
      menuCard: {
        background: 'rgba(45, 55, 72, 0.95)', // Keep existing dark menu card for dark mode
        border: `1px solid ${glassBorderDark}`,
        boxShadow: '0 25px 50px rgba(144, 205, 244, 0.2), 0 10px 20px rgba(0, 0, 0, 0.5)'
      },
      text: {
        primary: '#f7fafc',
        secondary: '#e2e8f0',
        muted: '#a0aec0'
      }
    }
  };

  const currentTheme = themeStyles[theme];

  const MenuPortal = () => {
    if (!showMenu) return null;

    return createPortal(
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentTheme.backdrop,
            backdropFilter: 'blur(8px)', // Glassmorphism blur
            zIndex: 999999
          }}
          onClick={() => setShowMenu(false)}
        />
        <div 
          id="user-dropdown-portal"
          style={{
            position: 'absolute',
            minWidth: '280px',
            maxWidth: '90vw',
            backdropFilter: 'blur(25px)', // Stronger blur for the menu card
            borderRadius: '16px',
            padding: '0.75rem',
            zIndex: 1000000,
            animation: 'menuFade 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
            ...currentTheme.menuCard
          }}
        >
          {/* User Info Header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              // Adjust header background to fit the new glassmorphism theme
              background: theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              marginBottom: '0.75rem',
              border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)'}`
            }}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: theme === 'light' ? 'linear-gradient(135deg, #a77be6 0%, #c299ff 100%)' : 'linear-gradient(135deg, #8a2be2 0%, #dda0dd 100%)', // Purple gradient
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: theme === 'light' ? '0 4px 12px rgba(167, 123, 230, 0.3)' : '0 4px 12px rgba(138, 43, 226, 0.4)'
              }}
            >
              <span>{getInitials(user.name)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h4 
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: currentTheme.text.primary,
                  margin: '0 0 0.25rem 0'
                }}
              >
                {user.name}
              </h4>
              <p 
                style={{
                  fontSize: '0.8rem',
                  color: currentTheme.text.secondary,
                  margin: 0
                }}
              >
                {user.email || 'user@example.com'}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MenuItemPortal
              icon="📄"
              title="Resume History"
              subtitle="View your saved resumes"
              onClick={() => {
                toggleHistoryView();
                setShowMenu(false);
              }}
              theme={theme}
            />

            <div 
              style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'} 50%, transparent 100%)`,
                margin: '0.5rem 0'
              }}
            />

            <MenuItemPortal
              icon="🚪"
              title="Sign Out"
              subtitle="Logout from your account"
              onClick={handleLogout}
              isLogout={true}
              theme={theme}
            />
          </div>
        </div>

        <style jsx>{`
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
        `}</style>
      </div>,
      document.body
    );
  };

  const MenuItemPortal = ({ icon, title, subtitle, onClick, isLogout = false, theme }) => {
    const [isHovered, setIsHovered] = useState(false);

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
          transition: 'all 0.3s ease-in-out',
          marginBottom: '0.25rem',
          ...(isHovered && {
            background: isLogout 
              ? 'rgba(220, 38, 38, 0.1)' 
              : theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)', // Hover background for menu items
            transform: 'translateX(4px)',
            boxShadow: isLogout 
              ? '0 4px 12px rgba(220, 38, 38, 0.2)' 
              : theme === 'light' ? '0 4px 12px rgba(0, 0, 0, 0.05)' : '0 4px 12px rgba(144, 205, 244, 0.1)'
          })
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: isLogout 
              ? 'rgba(220, 38, 38, 0.1)' 
              : theme === 'light' ? 'rgba(167, 123, 230, 0.1)' : 'rgba(138, 43, 226, 0.1)', // Purple accents
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div 
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: isLogout ? '#dc2626' : currentTheme.text.primary,
              marginBottom: '0.2rem',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {title}
          </div>
          <div 
            style={{
              fontSize: '0.75rem',
              color: isLogout ? '#f87171' : currentTheme.text.secondary,
              fontWeight: 500,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {subtitle}
          </div>
        </div>
        <div 
          style={{
            color: isLogout ? '#dc2626' : currentTheme.text.secondary,
            fontSize: '0.8rem',
            flexShrink: 0,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          →
        </div>
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
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          minWidth: '200px',
          backdropFilter: 'blur(20px)', // Glassmorphism blur for the main trigger
          ...currentTheme.trigger,
          ...(showMenu && currentTheme.triggerHover)
        }}
        onMouseOver={(e) => {
          if (!showMenu) {
            Object.assign(e.currentTarget.style, currentTheme.triggerHover);
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseOut={(e) => {
          if (!showMenu) {
            Object.assign(e.currentTarget.style, currentTheme.trigger);
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        <div 
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: theme === 'light' ? 'linear-gradient(135deg, #a77be6 0%, #c299ff 100%)' : 'linear-gradient(135deg, #8a2be2 0%, #dda0dd 100%)', // Purple gradient
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme === 'light' ? '0 4px 12px rgba(167, 123, 230, 0.3)' : '0 4px 12px rgba(138, 43, 226, 0.4)',
            flexShrink: 0
          }}
        >
          <span 
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.5px'
            }}
          >
            {getInitials(user.name)}
          </span>
          <div 
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              background: theme === 'light' ? '#28a745' : '#51cf66',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              boxShadow: theme === 'light' ? '0 2px 8px rgba(40, 167, 69, 0.4)' : '0 2px 8px rgba(81, 207, 102, 0.4)'
            }}
          />
        </div>
        <div 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            minWidth: 0
          }}
        >
          <span 
            style={{
              color: currentTheme.text.primary, // Using primary text color for the name
              fontWeight: 600,
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {user.name}
          </span>
          <span 
            style={{
              color: currentTheme.text.secondary, // Using secondary text color for "Online"
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            Online
          </span>
        </div>
        <div 
          style={{
            color: currentTheme.text.secondary, // Using secondary text color for the arrow
            transition: 'all 0.3s ease-in-out',
            flexShrink: 0,
            transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <MenuPortal />

      <style jsx>{`
        /* Responsive Design */
        @media (max-width: 768px) {
          .user-profile-trigger {
            min-width: 180px !important;
            padding: 0.4rem 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .user-profile-trigger {
            min-width: 160px !important;
            padding: 0.4rem 0.6rem !important;
          }
          
          #user-dropdown-portal {
            min-width: 260px !important;
            max-width: 95vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;