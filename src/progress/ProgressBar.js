import React from 'react';

const ProgressBar = ({ currentStep }) => {
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

  return (
    <div className="progress-container fade-in">
      {/* Progress Track with Enhanced Styling */}
      <div style={{
        position: 'relative',
        marginBottom: '2rem',
        background: 'var(--bg-tertiary)',
        height: '12px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div 
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            borderRadius: '20px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            width: `${Math.max(progress, 8)}%`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
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
      <div className="progress-steps" style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        position: 'relative'
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
              flex: 1,
              maxWidth: '140px',
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Step Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: currentStep >= index 
                ? (currentStep === index 
                  ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)'
                  : 'linear-gradient(135deg, var(--success-color) 0%, #059669 100%)')
                : 'var(--bg-primary)',
              border: `3px solid ${
                currentStep >= index 
                  ? (currentStep === index ? 'var(--primary-color)' : 'var(--success-color)')
                  : 'var(--border-color)'
              }`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              color: currentStep >= index ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              marginBottom: '1rem',
              boxShadow: currentStep >= index 
                ? (currentStep === index 
                  ? '0 0 25px rgba(102, 126, 234, 0.4)' 
                  : '0 0 20px rgba(16, 185, 129, 0.3)')
                : 'var(--shadow-sm)',
              transform: currentStep >= index 
                ? (currentStep === index ? 'scale(1.15)' : 'scale(1.05)')
                : 'scale(1)',
              position: 'relative',
              overflow: 'hidden'
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
                  border: '2px solid var(--primary-color)',
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
                  ? (currentStep === index ? 'var(--primary-color)' : 'var(--success-color)')
                  : 'var(--text-muted)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>
                Step {step.number}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: currentStep >= index 
                  ? (currentStep === index ? 'var(--primary-color)' : 'var(--success-color)')
                  : 'var(--text-secondary)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>
                {step.title}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: '1.3'
              }}>
                {step.description}
              </div>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                top: '32px',
                left: '80px',
                right: '-80px',
                height: '3px',
                background: currentStep > index 
                  ? 'var(--gradient-success)' 
                  : 'var(--border-color)',
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
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-glass)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-lg)',
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
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0'
        }}></div>

        <div className="current-step-info">
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{
              fontSize: '2rem',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}>
              {steps[currentStep]?.icon}
            </span>
            Step {currentStep + 1}: {steps[currentStep]?.title}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            margin: '0',
            fontWeight: '500'
          }}>
            {getStepDescription(currentStep)}
          </p>

          {/* Progress Pills */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--primary-color)'
            }}>
              {currentStep + 1} of {steps.length} completed
            </div>
            
            {currentStep > 0 && (
              <div style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--success-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
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
          alignItems: 'flex-end'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))'
          }}>
            {Math.round(progress)}%
          </div>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Complete
          </div>

          {/* Circular Progress */}
          <div style={{
            width: '60px',
            height: '60px',
            position: 'relative',
            marginTop: '1rem'
          }}>
            <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="4"
              />
              <circle
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke="var(--primary-color)"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 25}`}
                strokeDashoffset={`${2 * Math.PI * 25 * (1 - progress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      {progress > 60 && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--border-radius)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          <span style={{ fontSize: '2rem' }}>🎉</span>
          <div>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontWeight: '700',
              color: 'var(--success-color)',
              fontSize: '1.1rem'
            }}>
              Great progress! You're almost there!
            </p>
            <p style={{
              margin: '0',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              Keep going to create your perfect resume
            </p>
          </div>
        </div>
      )}
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