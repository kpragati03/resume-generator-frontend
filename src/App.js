import API_BASE_URL from './config';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Import local components
import PersonalDetails from './components/PersonalDetails';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ResumePreview from './preview/ResumePreview';
import ProgressBar from './progress/ProgressBar';
import TemplateSelector from './templates/TemplateSelector';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/user/UserProfile';
import ResumeHistory from './components/ResumeHistory';
import SharedResume from './components/SharedResume';
import './App.css';

// Theme Toggle Button Component
const ThemeToggleButton = ({ isDarkMode, toggleTheme }) => {
  const toggleStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    border: isDarkMode ? '1px solid #374151' : '1px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isDarkMode 
      ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    minWidth: '80px',
    gap: '8px'
  };

  const trackStyle = {
    width: '40px',
    height: '20px',
    backgroundColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
    borderRadius: '10px',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  const thumbStyle = {
    position: 'absolute',
    top: '2px',
    left: isDarkMode ? '22px' : '2px',
    width: '16px',
    height: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    color: isDarkMode ? '#fbbf24' : '#f59e0b'
  };

  const textStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: isDarkMode ? '#f1f5f9' : '#334155'
  };

  return (
    <button onClick={toggleTheme} style={toggleStyle} aria-label="Toggle theme">
      <div style={trackStyle}>
        <div style={thumbStyle}>
          <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
      </div>
      <span style={textStyle}>
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? 'dark' : 'light';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '', 
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    skills: '',
    score: 0,
    color: '#1B6CA8',
  });
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showFullResume, setShowFullResume] = useState(false);
  const [currentViewingResume, setCurrentViewingResume] = useState(null);
  const [html2pdfLoaded, setHtml2pdfLoaded] = useState(false);

  const contentRef = useRef();

  // Load html2pdf library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      console.log('html2pdf library loaded successfully');
      setHtml2pdfLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load html2pdf library');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Calculate Live Score
  const calculateLiveScore = useCallback((data) => {
    let score = 0;
    if (data.name) score += 6;
    if (data.email) score += 7;
    if (data.phone) score += 6;
    if (data.address) score += 6;
    if (data.profession) score += 5;

    if (data.education && data.education.length > 0) {
      if (data.education[0].degree) score += 8;
      if (data.education[0].institution) score += 8;
      if (data.education[0].year) score += 9;
    }

    if (data.experience && data.experience.length > 0) {
      if (data.experience[0].company) score += 7;
      if (data.experience[0].role) score += 8;
      if (data.experience[0].duration) score += 7;
      if (data.experience[0].description) score += 8;
    }

    if (data.skills) score += 15;

    return score;
  }, []);

  const currentResumeScore = useMemo(() => calculateLiveScore(resumeData), [resumeData, calculateLiveScore]);

  // Personal Details change handler
  const handlePersonalDetailsChange = useCallback((e) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const newData = { ...prev, [name]: value };
      const updatedScore = calculateLiveScore(newData);
      return { ...newData, score: updatedScore };
    });
  }, [calculateLiveScore]);

  // Input change handler
  const handleInputChange = useCallback((e, section, index) => {
    const { name, value } = e.target;

    setResumeData(prevResumeData => {
      let newResumeData = { ...prevResumeData };

      if (section) {
        const sectionValue = prevResumeData[section];

        if (Array.isArray(sectionValue)) {
          const idx = (typeof index !== 'undefined') ? index : 0;
          const newSectionData = sectionValue.map((item, i) => {
            if (i === idx) {
              return { ...item, [name]: value };
            }
            return item;
          });
          newResumeData = { ...prevResumeData, [section]: newSectionData };
        } else if (sectionValue && typeof sectionValue === 'object') {
          newResumeData = { ...prevResumeData, [section]: { ...sectionValue, [name]: value } };
        } else {
          newResumeData = { ...prevResumeData, [section]: [{ [name]: value }] };
        }
      } else {
        newResumeData = { ...prevResumeData, [name]: value };
      }

      const updatedScore = calculateLiveScore(newResumeData);
      return { ...newResumeData, score: updatedScore };
    });
  }, [calculateLiveScore]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      console.log('=== SAVING RESUME TO DATABASE ===');

      if (!token) {
        alert('Please log in to save your resume.');
        setShowAuth(true);
        return;
      }
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
      };

      const processedResumeData = {
        name: resumeData.name || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        address: resumeData.address || '',
        profession: resumeData.profession || '',
        education: resumeData.education || [{ degree: '', institution: '', year: '' }],
        experience: resumeData.experience || [{ company: '', role: '', duration: '', description: '' }],
        skills: resumeData.skills 
          ? resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          : []
      };

      const dataToSend = {
        resumeData: processedResumeData,
        selectedTemplate: selectedTemplate,
        color: resumeData.color
      };

      console.log('=== DETAILED DEBUG INFO ===');
      console.log('resumeData.name:', resumeData.name);
      console.log('resumeData.email:', resumeData.email);
      console.log('resumeData.phone:', resumeData.phone);
      console.log('resumeData.address:', resumeData.address);
      console.log('processedResumeData:', processedResumeData);
      console.log('Final dataToSend:', JSON.stringify(dataToSend, null, 2));
      
const res = await axios.post(`${API_BASE_URL}/api/resume`, dataToSend, config);      console.log('Resume saved successfully!', res.data);
      alert('Resume saved successfully!');
      
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        handleLogout();
        setShowAuth(true);
      } else if (err.response?.status === 400) {
        alert(`Validation Error: ${err.response?.data?.message || 'Invalid data'}`);
      } else {
        alert(`Failed to save resume: ${err.response?.data?.message || err.message}`);
      }
    }
  }, [resumeData, selectedTemplate]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleCreateNewResume = useCallback(() => {
    const newResumeData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      profession: '',
      education: [{ degree: '', institution: '', year: '' }],
      experience: [{ company: '', role: '', duration: '', description: '' }],
      skills: '',
      score: 0,
      color: '#1B6CA8',
    };
    
    setResumeData(newResumeData);
    setSelectedTemplate('classic');
    setCurrentStep(0);
    setShowHistory(false);
    setShowFullResume(false);
    setCurrentViewingResume(null);
    setShowAuth(false);
    
    localStorage.removeItem('resumeData');
    localStorage.removeItem('selectedTemplate');
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowAuth(false);
    setUser({});
  }, []);

  const handlePDFDownload = useCallback(async () => {
    if (!window.html2pdf || !html2pdfLoaded) {
      alert('PDF library is still loading. Please try again in a moment.');
      return;
    }

    console.log('Starting PDF download...');
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let pdfElement = document.querySelector('[data-pdf-content="true"]') || 
                       document.querySelector('.resume-template') || 
                       document.querySelector('.resume-preview-container > div') || 
                       document.querySelector('[class*="template"]') || 
                       document.querySelector('.preview-content > div') || 
                       contentRef.current;
      
      if (!pdfElement) {
        alert('Resume content not found. Please make sure your resume is visible.');
        setIsDownloading(false);
        return;
      }

      console.log('Found PDF element:', pdfElement);

      const clonedElement = pdfElement.cloneNode(true);
      
      clonedElement.style.transform = 'none';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.background = '#ffffff';
      clonedElement.style.position = 'relative';
      clonedElement.style.zIndex = 'auto';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '20px';
      clonedElement.style.width = '794px';
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.overflow = 'visible';

      clonedElement.querySelectorAll('[style*="position: absolute"]').forEach(el => {
        if (parseInt(el.style.zIndex) > 10 || el.style.zIndex === 'auto') {
          el.remove();
        }
      });

      clonedElement.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
        if (el.style.transform && el.style.transform !== 'none') el.style.transform = 'none';
        if (el.style.filter && el.style.filter.includes('blur')) el.style.filter = 'none';
      });

      clonedElement.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div').forEach(el => {
        if (el.style.color === 'transparent' || el.style.opacity === '0') {
          el.style.color = '#000000';
          el.style.opacity = '1';
        }
        if (el.style.webkitTextFillColor === 'transparent') {
          el.style.webkitTextFillColor = 'initial';
          el.style.webkitBackgroundClip = 'initial';
          el.style.backgroundClip = 'initial';
        }
        if (!el.style.fontWeight) {
          el.style.fontWeight = window.getComputedStyle(el).fontWeight;
        }
      });

      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '794px';
      tempContainer.style.background = '#ffffff';
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);

      const resumeName = resumeData.name || currentViewingResume?.name || user.name || 'Resume';
      const cleanName = resumeName.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_');

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${cleanName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff',
          width: 794, height: 1123, scrollX: 0, scrollY: 0, logging: false,
          letterRendering: true, foreignObjectRendering: false, imageTimeout: 15000, removeContainer: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true, precision: 16 }
      };

      console.log('Generating PDF with filename:', opt.filename);
      await window.html2pdf().set(opt).from(clonedElement).save();
      console.log('PDF generated successfully!');
      
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again or contact support if the issue persists.');
    } finally {
      setIsDownloading(false);
    }
  }, [resumeData, currentViewingResume, user.name, html2pdfLoaded]);

  const handleFullViewPDFDownload = useCallback(async () => {
    if (!currentViewingResume || !window.html2pdf || !html2pdfLoaded) {
      alert('PDF library is still loading. Please try again in a moment.');
      return;
    }

    console.log('Starting full view PDF download...');
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let pdfElement = document.querySelector('[data-pdf-content="true"]') ||
                       document.querySelector('.resume-template') ||
                       document.querySelector('.resume-preview-container > div') ||
                       document.querySelector('[class*="template"]') ||
                       document.querySelector('.preview-content > div');
      
      if (!pdfElement) {
        alert('Resume content not found. Please make sure your resume is visible.');
        setIsDownloading(false);
        return;
      }

      console.log('Found PDF element for full view:', pdfElement);

      const clonedElement = pdfElement.cloneNode(true);
      
      clonedElement.style.transform = 'none';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.background = '#ffffff';
      clonedElement.style.position = 'relative';
      clonedElement.style.zIndex ='auto';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '20px';
      clonedElement.style.width = '794px';
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.overflow = 'visible';

      clonedElement.querySelectorAll('[style*="position: absolute"]').forEach(el => {
        if (parseInt(el.style.zIndex) > 10 || el.style.zIndex === 'auto') {
          el.remove();
        }
      });

      clonedElement.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
        if (el.style.transform && el.style.transform !== 'none') el.style.transform = 'none';
        if (el.style.filter && el.style.filter.includes('blur')) el.style.filter = 'none';
      });

      clonedElement.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div').forEach(el => {
        if (el.style.color === 'transparent' || el.style.opacity === '0') {
          el.style.color = '#000000';
          el.style.opacity = '1';
        }
        if (el.style.webkitTextFillColor === 'transparent') {
          el.style.webkitTextFillColor = 'initial';
          el.style.webkitBackgroundClip = 'initial';
          el.style.backgroundClip = 'initial';
        }
        if (!el.style.fontWeight) {
          el.style.fontWeight = window.getComputedStyle(el).fontWeight;
        }
      });

      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '794px';
      tempContainer.style.background = '#ffffff';
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);

      const resumeName = currentViewingResume.name || 'Resume';
      const cleanName = resumeName.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_');

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${cleanName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff',
          width: 794, height: 1123, scrollX: 0, scrollY: 0, logging: false,
          letterRendering: true, foreignObjectRendering: false, imageTimeout: 15000, removeContainer: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true, precision: 16 }
      };

      console.log('Generating full view PDF with filename:', opt.filename);
      await window.html2pdf().set(opt).from(clonedElement).save();
      console.log('Full view PDF generated successfully!');
      
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('Full view PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again or contact support if the issue persists.');
    } finally {
      setIsDownloading(false);
    }
  }, [currentViewingResume, html2pdfLoaded]);

  const handleColorChange = useCallback((hex) => {
    setResumeData(prev => ({ ...prev, color: hex }));
  }, []);
  
  const handleTemplateChange = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);

  const handleAuthSuccess = useCallback(async (token) => {
    localStorage.setItem('token', token);
    
    try {
      const config = { headers: { 'x-auth-token': token } };
const res = await axios.get(`${API_BASE_URL}/api/auth/me`, config);      
      setUser({ id: res.data.id, name: res.data.name, email: res.data.email });
      setIsLoggedIn(true);
      setShowAuth(false);
      
      console.log('Auth Success! Real user data:', res.data);
      
    } catch (err) {
      console.error('Failed to fetch user data after auth:', err);
      setIsLoggedIn(true);
      setShowAuth(false);
      setUser({ name: 'User' });
    }
  }, []);

  const toggleHistoryView = useCallback(() => {
    setShowHistory(prev => !prev);
  }, []);

  const handleResumeSelect = useCallback((resume) => {
    console.log('=== SELECTING RESUME FOR EDITING ===');
    console.log('Original resume data:', resume);
    
    const processedResume = {
      name: resume.name || '',
      email: resume.email || '',
      phone: resume.phone || '',
      address: resume.address || '',
      profession: resume.profession || '',
      education: resume.education && resume.education.length > 0 ? resume.education : [{ degree: '', institution: '', year: '' }],
      experience: resume.experience && resume.experience.length > 0 ? resume.experience : [{ company: '', role: '', duration: '', description: '' }],
      skills: Array.isArray(resume.skills) ? resume.skills.join(', ') : resume.skills || '',
      score: resume.score || 0,
      color: resume.color || '#1B6CA8'
    };
    
    setResumeData(processedResume);
    setSelectedTemplate(resume.selectedTemplate || 'classic');
    
    setShowHistory(false);
    setShowFullResume(false);
    setCurrentViewingResume(null);
    setCurrentStep(1);
    
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleViewResume = useCallback((resume) => {
    console.log('=== VIEWING RESUME IN FULL PAGE ===');
    console.log('Original resume data:', resume);
    
    const processedResume = {
      name: resume.name || '',
      email: resume.email || '',
      phone: resume.phone || '',
      address: resume.address || '',
      profession: resume.profession || '',
      education: resume.education && resume.education.length > 0 ? resume.education : [{ degree: '', institution: '', year: '' }],
      experience: resume.experience && resume.experience.length > 0 ? resume.experience : [{ company: '', role: '', duration: '', description: '' }],
      skills: Array.isArray(resume.skills) ? resume.skills.join(', ') : resume.skills || '',
      score: resume.score || 0,
      color: resume.color || '#1B6CA8',
      selectedTemplate: resume.selectedTemplate || 'classic'
    };
    
    setCurrentViewingResume(processedResume);
    setShowFullResume(true);
    setShowHistory(false);
    
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleCloseFullView = useCallback(() => {
    setShowFullResume(false);
    setCurrentViewingResume(null);
    setShowHistory(true);
  }, []);

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return <TemplateSelector 
          handleColorChange={handleColorChange} 
          handleTemplateChange={handleTemplateChange} 
          selectedTemplate={selectedTemplate} 
          selectedColor={resumeData.color}
          theme={theme}
        />;
      case 1:
        return <PersonalDetails 
          handleInputChange={handlePersonalDetailsChange} 
          data={resumeData} 
          theme={theme}
        />;
      case 2:
        return <Education 
          handleInputChange={handleInputChange} 
          data={resumeData.education[0]} 
          theme={theme}
        />;
      case 3:
        return <Experience 
          handleInputChange={handleInputChange} 
          data={resumeData.experience[0]} 
          theme={theme}
        />;
      case 4:
        return <Skills 
          handleInputChange={handleInputChange} 
          data={resumeData} 
          theme={theme}
        />;
      default: return null;
    }
  }, [currentStep, handleColorChange, handleTemplateChange, selectedTemplate, handleInputChange, handlePersonalDetailsChange, resumeData, theme]);

  const renderResumeForm = useCallback(() => {
    return (
      <div className="modern-card">
        <ProgressBar currentStep={currentStep} theme={theme} />
        <div className="form-content" style={{ marginTop: '2rem' }}>
          {renderStep()}
        </div>
        <div className="form-navigation">
          {currentStep > 0 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="modern-btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i>
              Back
            </button>
          )}
          <div className="flex-spacer"></div>
          {currentStep < 4 ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="modern-btn btn-primary"
            >
              Next
              <i className="fas fa-arrow-right"></i>
            </button>
          ) : (
            <button 
              type="submit" 
              onClick={handleSubmit} 
              className="modern-btn btn-success"
            >
              <i className="fas fa-save"></i>
              Save Resume to Database
            </button>
          )}
        </div>
      </div>
    );
  }, [currentStep, prevStep, nextStep, handleSubmit, renderStep, theme]);

  // --- MODIFIED: This function is updated to pass the correct props ---
  const renderAuthForms = useCallback(() => {
    return (
      <div className="modern-card auth-container">
        <div className="auth-header">
          <h2 className="main-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="subtitle">
            {isLogin ? 'Sign in to continue building your resume' : 'Join us to create amazing resumes'}
          </p>
        </div>
        
        <div>
          {isLogin ? (
            <Login 
              handleAuthSuccess={handleAuthSuccess} 
              theme={theme} 
              onSwitchToRegister={() => setIsLogin(false)} // Pass function to switch to Register
            />
          ) : (
            <Register 
              handleAuthSuccess={handleAuthSuccess} 
              theme={theme} 
              onSwitchToLogin={() => setIsLogin(true)} // Pass function to switch to Login
            />
          )}
        </div>
        
        {/* REMOVED: The external toggle button is no longer needed here */}
      </div>
    );
  }, [isLogin, handleAuthSuccess, theme]);

  useEffect(() => {
    const savedResumeData = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedResumeData) {
      try {
        setResumeData(JSON.parse(savedResumeData));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = { headers: { 'x-auth-token': token } };
const res = await axios.get(`${API_BASE_URL}/api/auth/me`, config);          
          setIsLoggedIn(true);
          setUser({ id: res.data.id, name: res.data.name, email: res.data.email });
          console.log('Real user data fetched:', res.data);
          
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser({});
        }
      } else {
        setIsLoggedIn(false);
      }
      setIsLoadingUser(false);
    };

    checkAuthAndFetchUser();
  }, []);

  const LoadingComponent = useMemo(() => (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h3 className="loading-text">
          Loading your workspace...
        </h3>
        <p className="loading-subtitle">
          Preparing your resume builder
        </p>
      </div>
    </div>
  ), []);
  
  if (isLoadingUser) {
    return LoadingComponent;
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className={`app-container ${theme}-theme`}>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            @media (max-width: 1200px) { .main-workspace { flex-direction: column; align-items: center; } }
            @media (max-width: 768px) {
              .workspace-container { flex-direction: column; }
              .nav-controls { flex-direction: column; gap: 1rem; }
              .nav-left, .nav-right { justify-content: center; flex-wrap: wrap; gap: 0.5rem; }
            }
            @media (max-width: 480px) {
              .preview-actions { flex-direction: column; }
              .action-button { width: 100%; }
            }
          `}</style>
          
          <div className="app-content">
            <div className="header-section">
              <h1 className="main-title">Resume Generator</h1>
              <p className="subtitle">Create stunning professional resumes in minutes</p>
            </div>
            
            <div className="nav-controls">
               <div className="nav-left">
                  <button 
                    onClick={handleCreateNewResume} 
                    className="modern-btn btn-success"
                  >
                    <i className="fas fa-plus"></i>
                    Create New Resume
                  </button>
                  <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                </div>
               
               <div className="nav-right">
                  {isLoggedIn ? (
                    <UserProfile 
                      user={user} 
                      onLogout={handleLogout} 
                      toggleHistoryView={toggleHistoryView}
                      theme={theme}
                    />
                  ) : (
                    <>
                      <button 
                        onClick={() => { setShowAuth(true); setIsLogin(true); }}
                        className="modern-btn btn-outline"
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Login
                      </button>
                      <button
                        onClick={() => { setShowAuth(true); setIsLogin(false); }} 
                        className="modern-btn btn-primary"
                      >
                        <i className="fas fa-user-plus"></i>
                        Sign Up
                      </button>
                    </>
                  )} 
                </div>
              </div>

            {showFullResume ? (
              <div className="full-resume-view">
                <div className="modern-card full-resume-header">
                  <div className="view-title">
                    <h3>Resume Preview - Full View</h3>
                    <p>Complete resume ready for download</p>
                  </div>
                  <div className="view-actions">
                    <button onClick={handleCloseFullView} className="modern-btn btn-secondary">
                      <i className="fas fa-arrow-left"></i> Back to History
                    </button>
                    <button onClick={() => { handleResumeSelect(currentViewingResume); }} className="modern-btn btn-primary">
                      <i className="fas fa-edit"></i> Edit Resume
                    </button>
                    <button onClick={handleCreateNewResume} className="modern-btn btn-success">
                      <i className="fas fa-plus"></i> Create New Resume
                    </button>
                    <button onClick={handleFullViewPDFDownload} className="modern-btn btn-info" disabled={isDownloading}>
                      <i className={isDownloading ? 'fas fa-spinner fa-spin' : 'fas fa-download'}></i>
                      {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
                
                <div className="resume-preview-container">
                  <ResumePreview 
                    ref={contentRef}
                    data={currentViewingResume} 
                    selectedTemplate={currentViewingResume?.selectedTemplate || 'classic'} 
                    onExportPDF={handleFullViewPDFDownload}
                    onSaveResume={handleSubmit}
                    isDownloading={isDownloading}
                    theme={theme}
                  />
                </div>
              </div>
            ) : (
              <div className="main-workspace-vertical">
                <div className="workspace-form">
                  {showAuth ? renderAuthForms() : showHistory ? 
                    <ResumeHistory 
                      onSelectResume={handleResumeSelect}
                      onViewResume={handleViewResume}
                      theme={theme}
                    /> : 
                    renderResumeForm()
                  }
                </div>
                
                {currentStep > 0 && !showAuth && !showHistory && (
                  <div className="workspace-preview">
                    <div className="preview-card">
                      <div className="preview-header">
                        <h3 className="preview-title">Live Preview</h3>
                        <div className="resume-score">
                          <span className="score-label">Resume Score:</span>
                          <span className="score-value">{currentResumeScore}%</span>
                          <div className="score-bar">
                            <div className="score-fill" style={{ width: `${currentResumeScore}%` }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="preview-content">
                        <ResumePreview 
                          ref={contentRef}
                          data={resumeData} 
                          selectedTemplate={selectedTemplate}
                          onExportPDF={handlePDFDownload}
                          onSaveResume={handleSubmit}
                          isDownloading={isDownloading}
                          theme={theme}
                        />
                      </div>
                      
                      <div className="preview-actions">
                        <button onClick={handleCreateNewResume} className="modern-btn btn-success">
                          <i className="fas fa-plus"></i> Create New Resume
                        </button>
                        {/* Download PDF button removed */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      } />
      <Route path="/share/resume/:id" element={<SharedResume theme={theme} />} />
    </Routes>
  );
}

export default App;