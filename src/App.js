import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import './App.css';
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

function App() {
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
    color: '#667eea',
  });
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  // NEW STATES for full page view
  const [showFullResume, setShowFullResume] = useState(false);
  const [currentViewingResume, setCurrentViewingResume] = useState(null);

  const contentRef = useRef();

  // MOVE calculateLiveScore BEFORE useMemo
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

  // NOW useMemo can use calculateLiveScore
  const currentResumeScore = useMemo(() => calculateLiveScore(resumeData), [resumeData, calculateLiveScore]);

  // Personal Details ke liye separate simple handler
  // Updated to use functional setState to avoid stale closure and ensure inputs are editable
  const handlePersonalDetailsChange = useCallback((e) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const newData = { ...prev, [name]: value };
      const updatedScore = calculateLiveScore(newData);
      return { ...newData, score: updatedScore };
    });
  }, [calculateLiveScore]);

  // IMPORTANT FIX: robust handler — supports:
  // 1) personal fields: handleInputChange(e) or handleInputChange(e, undefined)
  // 2) section object: handleInputChange(e, 'someSection')
  // 3) section array with index: handleInputChange(e, 'education', 0)
  const handleInputChange = useCallback((e, section, index) => {
    const { name, value } = e.target;

    setResumeData(prevResumeData => {
      let newResumeData = { ...prevResumeData };

      if (section) {
        const sectionValue = prevResumeData[section];

        // If section is an array and index provided/omitted -> update proper item
        if (Array.isArray(sectionValue)) {
          const idx = (typeof index !== 'undefined') ? index : 0; // default to first entry
          const newSectionData = sectionValue.map((item, i) => {
            if (i === idx) {
              return { ...item, [name]: value };
            }
            return item;
          });
          newResumeData = { ...prevResumeData, [section]: newSectionData };
        } else if (sectionValue && typeof sectionValue === 'object') {
          // section exists as object
          newResumeData = { ...prevResumeData, [section]: { ...sectionValue, [name]: value } };
        } else {
          // section doesn't exist or unexpected type -> create as single-object array
          newResumeData = { ...prevResumeData, [section]: [{ [name]: value }] };
        }
      } else {
        // no section provided -> top-level field (like name, email)
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

      // Create nested structure that backend expects
      const processedResumeData = {
        name: resumeData.name,
        email: resumeData.email,
        phone: resumeData.phone,
        address: resumeData.address,
        profession: resumeData.profession,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: resumeData.skills 
          ? resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          : []
      };

      const dataToSend = {
        resumeData: processedResumeData,
        selectedTemplate: selectedTemplate,
        color: resumeData.color
      };

      // ADD DEBUGGING
      console.log('=== FRONTEND DEBUG ===');
      console.log('Current resumeData state:', resumeData);
      console.log('processedResumeData:', processedResumeData);
      console.log('Final dataToSend:', dataToSend);
      console.log('resumeData.name:', resumeData.name);
      console.log('resumeData.email:', resumeData.email);
      console.log('resumeData.phone:', resumeData.phone);
      console.log('resumeData.address:', resumeData.address);
      console.log('Is name empty?', !resumeData.name);
      console.log('Is email empty?', !resumeData.email);
      console.log('Is phone empty?', !resumeData.phone);
      console.log('Is address empty?', !resumeData.address);
      
      const res = await axios.post('http://localhost:5000/api/resume', dataToSend, config);
      console.log('Resume saved successfully!', res.data);
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

  // UPDATED nextStep function with scroll to top
  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
    // Scroll to top of page immediately after step change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  // UPDATED prevStep function with scroll to top  
  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
    // Scroll to top of page immediately after step change
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
      color: '#667eea',
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
    
    // Scroll to top when creating new resume
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
    if (!contentRef.current) {
      alert('Resume content not found');
      return;
    }

    setIsDownloading(true);
    
    try {
      const element = contentRef.current;
      
      const opt = {
        margin: 0.5,
        filename: `${resumeData.name || user.name || 'Resume'}-${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [resumeData.name, user.name]);

  const handleFullViewPDFDownload = useCallback(async () => {
    if (!contentRef.current || !currentViewingResume) {
      alert('Resume content not found');
      return;
    }

    setIsDownloading(true);
    
    try {
      const element = contentRef.current;
      
      const opt = {
        margin: 0.5,
        filename: `${currentViewingResume.name || 'Resume'}-${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [currentViewingResume]);

  const handleColorChange = useCallback((hex) => {
    setResumeData(prev => ({ ...prev, color: hex }));
  }, []);
  
  const handleTemplateChange = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);
  
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleAuthSuccess = useCallback(async (token) => {
    localStorage.setItem('token', token);
    
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      
      const res = await axios.get('http://localhost:5000/api/auth/me', config);
      
      setUser({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email
      });
      
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
      color: resume.color || '#667eea'
    };
    
    console.log('Processed resume data:', processedResume);
    console.log('Template to be set:', resume.selectedTemplate || 'classic');
    console.log('Color to be set:', resume.color || '#667eea');
    
    setResumeData(processedResume);
    setSelectedTemplate(resume.selectedTemplate || 'classic');
    
    setShowHistory(false);
    setShowFullResume(false);
    setCurrentViewingResume(null);
    setCurrentStep(1);
    
    // Scroll to top when selecting resume
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    console.log('=== RESUME SELECTION COMPLETE ===');
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
      color: resume.color || '#667eea',
      selectedTemplate: resume.selectedTemplate || 'classic'
    };
    
    console.log('Processed viewing resume:', processedResume);
    console.log('Template for full view:', processedResume.selectedTemplate);
    console.log('Color for full view:', processedResume.color);
    
    setCurrentViewingResume(processedResume);
    setShowFullResume(true);
    setShowHistory(false);
    
    // Scroll to top when viewing resume
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    console.log('=== FULL VIEW SETUP COMPLETE ===');
  }, []);

  const handleCloseFullView = useCallback(() => {
    setShowFullResume(false);
    setCurrentViewingResume(null);
    setShowHistory(true);
  }, []);

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return <TemplateSelector handleColorChange={handleColorChange} handleTemplateChange={handleTemplateChange} selectedTemplate={selectedTemplate} />;
      case 1:
        // PersonalDetails uses its own handler in your original code; keep using it
        return <PersonalDetails handleInputChange={handlePersonalDetailsChange} data={resumeData} />;
      case 2:
        // Education expects data for first education entry (you pass the array element)
        return <Education handleInputChange={handleInputChange} data={resumeData.education[0]} />;
      case 3:
        return <Experience handleInputChange={handleInputChange} data={resumeData.experience[0]} />;
      case 4:
        return <Skills handleInputChange={handleInputChange} data={resumeData} />;
      default:
        return null;
    }
  }, [currentStep, handleColorChange, handleTemplateChange, selectedTemplate, handleInputChange, handlePersonalDetailsChange, resumeData]);

  const renderResumeForm = useCallback(() => {
    return (
      <div className="modern-form-container fade-in">
        <ProgressBar currentStep={currentStep} />
        <div className="form-content">
          {renderStep()}
        </div>
        <div className="form-navigation">
          {currentStep > 0 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="modern-btn btn-secondary slide-in-left"
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
              className="modern-btn btn-primary slide-in-right"
            >
              Next
              <i className="fas fa-arrow-right"></i>
            </button>
          ) : (
            <button 
              type="submit" 
              onClick={handleSubmit} 
              className="modern-btn btn-success slide-in-right"
            >
              <i className="fas fa-save"></i>
              Save Resume to Database
            </button>
          )}
        </div>
      </div>
    );
  }, [currentStep, prevStep, nextStep, handleSubmit, renderStep]);

  const renderAuthForms = useCallback(() => {
    return (
      <div className="auth-container fade-in-up">
        <div className="auth-header">
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to continue building your resume' : 'Join us to create amazing resumes'}
          </p>
        </div>
        
        <div className="auth-form">
          {isLogin ? (
            <Login handleAuthSuccess={handleAuthSuccess} />
          ) : (
            <Register handleAuthSuccess={handleAuthSuccess} />
          )}
        </div>
        
        <div className="auth-toggle">
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button 
            className="toggle-btn" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    );
  }, [isLogin, handleAuthSuccess]);

  // Rest of your useEffects and functions remain the same...
  useEffect(() => {
    const savedResumeData = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    const savedDarkMode = localStorage.getItem('isDarkMode');
    
    if (savedResumeData) {
      try {
        const parsedData = JSON.parse(savedResumeData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }

    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = {
            headers: {
              'x-auth-token': token,
            },
          };
          
          const res = await axios.get('http://localhost:5000/api/auth/me', config);
          
          setIsLoggedIn(true);
          setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email
          });
          
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

  // Loading component
  const LoadingComponent = useMemo(() => (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h3 className="loading-text">Loading your workspace...</h3>
        <p className="loading-subtitle">Preparing your resume builder</p>
      </div>
    </div>
  ), []);

  if (isLoadingUser) {
    return LoadingComponent;
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <div className="app-content">
            
            {/* Header Section */}
            <div className="header-section fade-in">
              <h1 className="main-title">Resume Generator</h1>
              <p className="subtitle">Create stunning professional resumes in minutes</p>
            </div>
            
            {/* Navigation Controls */}
            <div className="nav-controls fade-in-up">
              <div className="nav-left">
                <button 
                  onClick={handleCreateNewResume} 
                  className="modern-btn btn-success"
                >
                  <i className="fas fa-plus"></i>
                  Create New Resume
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className="modern-btn btn-glass"
                >
                  <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              
              <div className="nav-right">
                {isLoggedIn ? (
                  <UserProfile user={user} onLogout={handleLogout} toggleHistoryView={toggleHistoryView} />
                ) : (
                  <>
                    <button 
                      onClick={() => setShowAuth(true)} 
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

            {/* Main Content */}
            {showFullResume ? (
              <div className="full-resume-view fade-in">
                <div className="full-resume-header">
                  <div className="view-title">
                    <h3>Resume Preview - Full View</h3>
                    <p>Complete resume ready for download</p>
                  </div>
                  <div className="view-actions">
                    <button 
                      onClick={handleCloseFullView} 
                      className="modern-btn btn-secondary"
                    >
                      <i className="fas fa-arrow-left"></i>
                      Back to History
                    </button>
                    <button 
                      onClick={() => {
                        handleResumeSelect(currentViewingResume);
                      }} 
                      className="modern-btn btn-primary"
                    >
                      <i className="fas fa-edit"></i>
                      Edit Resume
                    </button>
                    <button 
                      onClick={handleCreateNewResume} 
                      className="modern-btn btn-success"
                    >
                      <i className="fas fa-plus"></i>
                      Create New Resume
                    </button>
                    <button 
                      onClick={handleFullViewPDFDownload} 
                      className="modern-btn btn-info"
                      disabled={isDownloading}
                    >
                      <i className={isDownloading ? 'fas fa-spinner fa-spin' : 'fas fa-download'}></i>
                      {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
                
                <div className="resume-preview-container modern-card">
                  <div ref={contentRef}>
                    <ResumePreview 
                      data={currentViewingResume} 
                      selectedTemplate={currentViewingResume?.selectedTemplate || 'classic'} 
                      onExportPDF={handleFullViewPDFDownload}
                      onSaveResume={() => {}}
                      isDownloading={isDownloading}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="main-workspace">
                <div className="workspace-left slide-in-left">
                  <div className="workspace-card modern-card">
                    {showAuth ? renderAuthForms() : showHistory ? 
                      <ResumeHistory 
                        onSelectResume={handleResumeSelect}
                        onViewResume={handleViewResume}
                      /> : 
                      renderResumeForm()
                    }
                  </div>
                </div>
                
                <div className="workspace-right slide-in-right">
                  <div className="preview-card modern-card">
                    <div className="preview-header">
                      <h3 className="preview-title">Live Preview</h3>
                      <div className="resume-score">
                        <span className="score-label">Resume Score:</span>
                        <span className="score-value">{currentResumeScore}%</span>
                        <div className="score-bar">
                          <div 
                            className="score-fill" 
                            style={{width: `${currentResumeScore}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="preview-content" ref={contentRef}>
                      <ResumePreview 
                        data={resumeData} 
                        selectedTemplate={selectedTemplate}
                        onExportPDF={handlePDFDownload}
                        onSaveResume={handleSubmit}
                        isDownloading={isDownloading}
                      />
                    </div>
                    
                    <div className="preview-actions">
                      <button 
                        onClick={handleCreateNewResume} 
                        className="modern-btn btn-success"
                      >
                        <i className="fas fa-plus"></i>
                        Create New Resume
                      </button>
                      <button 
                        onClick={handlePDFDownload} 
                        className="modern-btn btn-primary"
                        disabled={isDownloading}
                      >
                        <i className={isDownloading ? 'fas fa-spinner fa-spin' : 'fas fa-download'}></i>
                        {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      } />
      <Route path="/share/resume/:id" element={<SharedResume />} />
    </Routes>
  );
}

export default App;