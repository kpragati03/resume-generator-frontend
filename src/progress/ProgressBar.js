import React from 'react';

const ProgressBar = ({ currentStep, theme }) => {
  const isDarkMode = theme === 'dark';
  
  const steps = [
    { 
      number: 1, 
      title: "Template", 
      icon: "🎨",
      description: "Choose your design"
    },
    { 
      number: 2, 
      title: "Personal", 
      icon: "👤",
      description: "Basic information"
    },
    { 
      number: 3, 
      title: "Education", 
      icon: "🎓",
      description: "Academic background"
    },
    { 
      number: 4, 
      title: "Experience", 
      icon: "💼",
      description: "Work history"
    },
    { 
      number: 5, 
      title: "Skills", 
      icon: "⚡",
      description: "Technical abilities"
    }
  ];

  const progress = (currentStep / (steps.length - 1)) * 100;

  const themeColors = {
    light: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      bgTertiary: '#e2e8f0',
      bgCard: 'rgba(255, 255, 255, 0.9)',
      textPrimary: '#1a202c',
      textSecondary: '#4a5568',
      textMuted: '#718096',
      borderColor: 'rgba(226, 232, 240, 0.8)',
      borderGlass: 'rgba(226, 232, 240, 0.6)',
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      successColor: '#10b981',
      gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSuccess: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      shadowSm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.08)',
      shadowLg: '0 8px 25px rgba(0, 0, 0, 0.08)'
    },
    dark: {
      bgPrimary: '#1a202c',
      bgSecondary: '#2d3748',
      bgTertiary: '#4a5568',
      bgCard: 'rgba(45, 55, 72, 0.9)',
      textPrimary: '#f7fafc',
      textSecondary: '#e2e8f0',
      textMuted: '#a0aec0',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      primaryColor: '#8b5cf6',
      secondaryColor: '#06b6d4',
      successColor: '#10b981',
      gradientPrimary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
      gradientSuccess: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      shadowSm: '0 4px 15px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 8px 25px rgba(139, 92, 246, 0.15)',
      shadowLg: '0 20px 40px rgba(139, 92, 246, 0.2)'
    }
  };

  const colors = themeColors[theme] || themeColors.light;
  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const getStepDescription = (step) => {
    const descriptions = [
      "Choose your preferred template design and customize colors to match your style",
      "Add your personal information, contact details, and professional summary", 
      "Include your educational background, degrees, and academic achievements",
      "Detail your work experience, roles, and professional accomplishments",
      "List your technical skills, certifications, and core competencies"
    ];
    return descriptions[step] || "";
  };

  return (
    <div className={`theme-${theme}`} style={{
      background: colors.bgPrimary,
      minHeight: '100vh',
      padding: '2rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations for dark mode */}
      {isDarkMode && (
        <>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 15s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 15s ease-in-out infinite reverse'
          }}></div>
        </>
      )}

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Progress Track */}
        <div style={{
          position: 'relative',
          marginBottom: '3rem',
          background: colors.bgTertiary,
          height: '12px',
          borderRadius: '20px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: `inset 0 2px 4px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
        }}>
          <div style={{
            height: '100%',
            background: colors.gradientPrimary,
            borderRadius: '20px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            width: `${Math.max(progress, 8)}%`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none'
          }}>
            {/* Shimmer Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 2s infinite'
            }}></div>
          </div>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          position: 'relative',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {steps.map((step, index) => (
            <div
              key={step.number}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 3,
                flex: '1',
                minWidth: '140px',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Step Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: currentStep >= index 
                  ? (currentStep === index 
                    ? colors.gradientPrimary
                    : colors.gradientSuccess)
                  : colors.bgCard,
                border: `3px solid ${
                  currentStep >= index 
                    ? (currentStep === index ? colors.primaryColor : colors.successColor)
                    : colors.borderColor
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: currentStep >= index ? '#ffffff' : colors.textMuted,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                marginBottom: '1.5rem',
                boxShadow: currentStep >= index 
                  ? (currentStep === index 
                    ? `0 0 30px ${colors.primaryColor}40` 
                    : `0 0 25px ${colors.successColor}30`)
                  : colors.shadowSm,
                transform: currentStep >= index 
                  ? (currentStep === index ? 'scale(1.15)' : 'scale(1.05)')
                  : 'scale(1)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
              }}>
                {currentStep > index ? '✅' : step.icon}
                
                {/* Active Step Pulse Effect */}
                {currentStep === index && (
                  <div style={{
                    position: 'absolute',
                    top: '-3px',
                    left: '-3px',
                    right: '-3px',
                    bottom: '-3px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.primaryColor}`,
                    opacity: '0.6',
                    animation: 'pulse 2s infinite'
                  }}></div>
                )}
              </div>

              {/* Step Content */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: currentStep >= index 
                    ? (currentStep === index ? colors.primaryColor : colors.successColor)
                    : colors.textMuted,
                  marginBottom: '0.5rem',
                  transition: 'color 0.3s ease',
                  textShadow: isDarkMode && currentStep >= index ? `0 0 10px ${currentStep === index ? colors.primaryColor : colors.successColor}` : 'none'
                }}>
                  Step {step.number}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: currentStep >= index 
                    ? (currentStep === index ? colors.primaryColor : colors.successColor)
                    : colors.textSecondary,
                  marginBottom: '0.5rem',
                  transition: 'color 0.3s ease',
                  textShadow: isDarkMode && currentStep >= index ? `0 0 8px ${currentStep === index ? colors.primaryColor : colors.successColor}` : 'none'
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: colors.textMuted,
                  lineHeight: '1.4'
                }}>
                  {step.description}
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '90px',
                  right: '-90px',
                  height: '3px',
                  background: currentStep > index 
                    ? colors.gradientSuccess
                    : colors.borderColor,
                  zIndex: 1,
                  transition: 'background 0.6s ease',
                  borderRadius: '2px'
                }}></div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Info Card */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.5rem',
          background: colors.bgCard,
          borderRadius: '20px',
          border: `1px solid ${colors.borderGlass}`,
          backdropFilter: 'blur(20px)',
          boxShadow: colors.shadowLg,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: colors.gradientPrimary,
            borderRadius: '20px 20px 0 0'
          }}></div>

          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: colors.textPrimary,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                fontSize: '2.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                textShadow: isDarkMode ? `0 0 15px ${colors.primaryColor}60` : 'none'
              }}>
                {steps[currentStep]?.icon}
              </span>
              Step {currentStep + 1}: {steps[currentStep]?.title}
            </h3>
            <p style={{
              fontSize: '1.2rem',
              color: colors.textSecondary,
              margin: '0',
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              {getStepDescription(currentStep)}
            </p>

            {/* Progress Pills */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                padding: '0.75rem 1.5rem',
                background: isDarkMode 
                  ? 'rgba(139, 92, 246, 0.2)' 
                  : 'rgba(102, 126, 234, 0.1)',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(102, 126, 234, 0.3)'}`,
                borderRadius: '25px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: colors.primaryColor,
                backdropFilter: 'blur(10px)',
                boxShadow: isDarkMode ? `0 0 20px ${colors.primaryColor}30` : 'none'
              }}>
                {currentStep + 1} of {steps.length} completed
              </div>
              
              {currentStep > 0 && (
                <div style={{
                  padding: '0.75rem 1.5rem',
                  background: isDarkMode 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(16, 185, 129, 0.1)',
                  border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`,
                  borderRadius: '25px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: colors.successColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isDarkMode ? `0 0 15px ${colors.successColor}30` : 'none'
                }}>
                  ✨ {currentStep} steps done
                </div>
              )}
            </div>
          </div>

          <div style={{
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1.5rem'
          }}>
            {/* Conditional rendering for percentage display based on theme */}
            {!isDarkMode && (
              <>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  background: colors.gradientPrimary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  filter: `drop-shadow(0 0 10px ${colors.primaryColor}60)`
                }}>
                  {Math.round(progress)}%
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: colors.textMuted,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Complete
                </div>
              </>
            )}

            {isDarkMode && (
              <div style={{
                padding: '1rem 2rem',
                background: 'rgba(139, 92, 246, 0.2)',
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                borderRadius: '15px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                textAlign: 'center',
                minWidth: '100px',
                animation: 'fadeInUp 0.6s ease-out'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: colors.gradientPrimary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  filter: `drop-shadow(0 0 8px ${colors.primaryColor})`
                }}>
                  {Math.round(progress)}%
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Complete
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        {progress > 60 && (
          <div style={{
            marginTop: '2rem',
            padding: '2rem 2.5rem',
            background: isDarkMode 
              ? 'rgba(16, 185, 129, 0.15)' 
              : 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            animation: 'fadeInUp 0.6s ease-out',
            backdropFilter: 'blur(20px)',
            boxShadow: isDarkMode ? `0 0 25px ${colors.successColor}20` : colors.shadowMd
          }}>
            <span style={{ 
              fontSize: '2.5rem',
              textShadow: isDarkMode ? `0 0 15px ${colors.successColor}40` : 'none'
            }}>🎉</span>
            <div>
              <p style={{
                margin: '0 0 0.5rem 0',
                fontWeight: '700',
                color: colors.successColor,
                fontSize: '1.3rem',
                textShadow: isDarkMode ? `0 0 10px ${colors.successColor}` : 'none'
              }}>
                Amazing progress! You're almost there!
              </p>
              <p style={{
                margin: '0',
                color: colors.textSecondary,
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Keep going to create your perfect resume
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-20px) rotate(10deg); 
          }
          66% { 
            transform: translateY(10px) rotate(-10deg); 
          }
        }

        @media (max-width: 768px) {
          /* Mobile responsive styles would go here */
        }

        @media (max-width: 480px) {
          /* Small mobile responsive styles would go here */
        }
      `}</style>
    </div>
  );
};

const getStepDescription = (step) => {
  const descriptions = [
    "Choose your preferred template design and customize colors to match your style",
    "Add your personal information, contact details, and professional summary", 
    "Include your educational background, degrees, and academic achievements",
    "Detail your work experience, roles, and professional accomplishments",
    "List your technical skills, certifications, and core competencies"
  ];
  return descriptions[step] || "";
};

export default ProgressBar;