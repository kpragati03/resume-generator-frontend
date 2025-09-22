# 📄 Resume Generator - Frontend

A modern, responsive web application for creating professional resumes with multiple templates, real-time preview, and PDF export functionality. Built with React and deployed on Vercel.

## ✨ Features

### 🎨 **Template Variety**
- **Classic Template** - Traditional, professional layout
- **Modern Template** - Contemporary design with dark/light theme support
- **Creative Template** - Unique, eye-catching design
- **Professional Template** - Corporate-style with glassmorphism effects

### 🔧 **Core Functionality**
- **Real-time Preview** - See changes instantly as you type
- **Progress Tracking** - Visual progress bar showing completion percentage
- **Resume Scoring** - Live scoring system (0-100%) based on completeness
- **PDF Export** - High-quality PDF generation using html2pdf.js
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 👤 **User Management**
- **Authentication System** - Secure login/registration
- **Resume History** - Save and manage multiple resumes
- **User Profiles** - Personal account management
- **Resume Sharing** - Share resumes via unique links

### 🎯 **Smart Features**
- **Theme Toggle** - Dark/Light mode support
- **Color Customization** - Choose accent colors for templates
- **Auto-save** - Local storage backup
- **Form Validation** - Real-time input validation

## 🚀 Live Demo

**Frontend:** [https://resume-generator-frontend-two.vercel.app](https://resume-generator-frontend-two.vercel.app)

**Backend Repository:** [https://github.com/kpragati03/resume-generator-backend](https://github.com/kpragati03/resume-generator-backend)

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 19.1.1 |
| **Routing** | React Router DOM 7.8.2 |
| **Styling** | Tailwind CSS 4.1.12, Bootstrap 5.3.8 |
| **HTTP Client** | Axios 1.11.0 |
| **PDF Generation** | html2pdf.js 0.10.3 |
| **Icons** | React Icons 5.5.0 |
| **Build Tool** | React Scripts 5.0.1 |
| **Deployment** | Vercel |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js              # User login component
│   │   │   └── Register.js           # User registration component
│   │   ├── user/
│   │   │   └── UserProfile.js        # User profile management
│   │   ├── Education.js              # Education form component
│   │   ├── Experience.js             # Work experience form
│   │   ├── PersonalDetails.js        # Personal info form
│   │   ├── ResumeBuilder.js          # Main builder interface
│   │   ├── ResumeHistory.js          # Saved resumes list
│   │   ├── SharedResume.js           # Public resume view
│   │   └── Skills.js                 # Skills input component
│   ├── preview/
│   │   └── ResumePreview.js          # Live resume preview
│   ├── progress/
│   │   └── ProgressBar.js            # Form completion tracker
│   ├── templates/
│   │   ├── classic/
│   │   │   └── ClassicTemplate.js    # Traditional resume layout
│   │   ├── creative/
│   │   │   └── CreativeTemplate.js   # Creative resume design
│   │   ├── modern/
│   │   │   └── ModernTemplate.js     # Modern design with themes
│   │   ├── professional/
│   │   │   └── ProfessionalTemplate.js # Corporate glassmorphism
│   │   └── TemplateSelector.js       # Template chooser
│   ├── App.css                       # Global styles
│   ├── App.js                        # Main application component
│   ├── config.js                     # API configuration
│   └── index.js                      # Application entry point
├── public/
│   ├── index.html
│   └── favicon.ico
├── package.json                      # Dependencies and scripts
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see [backend repository](https://github.com/kpragati03/resume-generator-backend))

### 1. Clone the Repository
```bash
git clone https://github.com/kpragati03/resume-generator-frontend.git
cd resume-generator-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `src/config.js` file:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://resume-generator-website.up.railway.app';
export default API_BASE_URL;
```

### 4. Start Development Server
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App |

## 🎨 Component Overview

### Core Components

#### **App.js**
- Main application orchestrator
- Handles routing, authentication state, and theme management
- Manages resume data flow between components
- Implements PDF generation logic

#### **ResumePreview.js**
- Real-time preview of resume
- Template rendering engine
- PDF export trigger
- Responsive design adaptation

#### **Template Components**
Each template is a self-contained React component with:
- **Props:** `{ data, isDarkMode }`
- **Features:** Theme support, responsive design, PDF optimization
- **Styling:** Inline styles for PDF compatibility

### Form Components

#### **PersonalDetails.js**
```javascript
// Handles: Name, Email, Phone, Address, Profession
const PersonalDetails = ({ handleInputChange, data, theme }) => {
  // Form implementation
};
```

#### **Experience.js**
```javascript
// Handles: Company, Role, Duration, Description
const Experience = ({ handleInputChange, data, theme }) => {
  // Form implementation with dynamic fields
};
```

#### **Skills.js**
```javascript
// Handles: Comma-separated skills input
const Skills = ({ handleInputChange, data, theme }) => {
  // Skills parser and manager
};
```

## 🔧 Key Features Implementation

### Real-time Scoring System
```javascript
const calculateLiveScore = useCallback((data) => {
  let score = 0;
  if (data.name) score += 6;
  if (data.email) score += 7;
  // ... additional scoring logic
  return score;
}, []);
```

### PDF Generation
```javascript
const handlePDFDownload = useCallback(async () => {
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${resumeName}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  await window.html2pdf().set(opt).from(element).save();
}, []);
```

### Theme Management
```javascript
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  setIsDarkMode(savedTheme === 'dark');
}, []);
```

## 🎨 Styling Architecture

### CSS Framework Integration
- **Tailwind CSS**: Utility-first styling for rapid development
- **Bootstrap**: Component library for consistent UI elements
- **Custom CSS**: Template-specific styles in App.css

### Theme System
```css
/* Light Theme */
.light-theme {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
  --accent-color: #3b82f6;
}

/* Dark Theme */
.dark-theme {
  --bg-primary: #1a202c;
  --text-primary: #f7fafc;
  --accent-color: #8b5cf6;
}
```

## 🔌 API Integration

### Authentication Endpoints
```javascript
// Login
POST /api/auth/login
{ email, password }

// Register  
POST /api/auth/register
{ name, email, password }

// Get User
GET /api/auth/me
Headers: { 'x-auth-token': token }
```

### Resume Endpoints
```javascript
// Save Resume
POST /api/resume
{ resumeData, selectedTemplate, color }

// Get User Resumes
GET /api/resume/user
Headers: { 'x-auth-token': token }

// Share Resume
GET /api/share/resume/:id
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 768px) { /* Tablet */ }  
@media (max-width: 1200px) { /* Desktop */ }
```

### Component Adaptations
- **Navigation**: Collapsible mobile menu
- **Forms**: Single-column layout on mobile
- **Templates**: Responsive typography and spacing
- **Preview**: Scalable preview container

## 🚀 Deployment

### Vercel Deployment
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   - `REACT_APP_API_URL`: https://resume-generator-website.up.railway.app

3. **Build Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

## 🔍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |

## 📊 Performance Optimizations

### Code Splitting
```javascript
// Lazy loading templates
const ModernTemplate = React.lazy(() => import('./templates/modern/ModernTemplate'));
```

### Memoization
```javascript
// Prevent unnecessary re-renders
const MemoizedPreview = React.memo(ResumePreview);
const memoizedScore = useMemo(() => calculateScore(data), [data]);
```

### Asset Optimization
- Image compression for templates
- CDN usage for external libraries
- CSS minification in production

## 🐛 Troubleshooting

### Common Issues

#### PDF Generation Fails
```javascript
// Ensure html2pdf is loaded
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  script.onload = () => setHtml2pdfLoaded(true);
  document.head.appendChild(script);
}, []);
```

#### Template Not Rendering
- Check data props are correctly passed
- Verify theme prop is boolean
- Ensure CSS is properly loaded

#### API Connection Issues
- Verify backend is running at https://resume-generator-website.up.railway.app
- Check CORS configuration
- Validate API endpoints

## 🔮 Future Enhancements

- [ ] **Additional Templates**: Minimalist, Academic, Designer templates
- [ ] **Advanced Export**: Word document export, multiple formats
- [ ] **Collaboration**: Team resume building features
- [ ] **AI Integration**: Smart content suggestions
- [ ] **Analytics**: Resume performance tracking
- [ ] **Internationalization**: Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Developer

**Pragati Kumari**
- GitHub: [@kpragati03](https://github.com/kpragati03)
- Email: kumaripragatiii03@gmail.com
- LinkedIn: [kpragati03](https://www.linkedin.com/in/kpragati03/)

---

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for PDF generation
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vercel](https://vercel.com/) for seamless deployment
- [Bootstrap](https://getbootstrap.com/) for UI components
- [Railway](https://railway.app/) for backend hosting

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[![Frontend Stars](https://img.shields.io/github/stars/kpragati03/resume-generator-frontend.svg?style=social&label=Star&maxAge=2592000)](https://github.com/kpragati03/resume-generator-frontend/stargazers)
[![Backend Stars](https://img.shields.io/github/stars/kpragati03/resume-generator-backend.svg?style=social&label=Backend%20Stars&maxAge=2592000)](https://github.com/kpragati03/resume-generator-backend/stargazers)

Made with ❤️ and React by **Pragati Kumari**

[🌐 Live Demo](https://resume-generator-frontend-two.vercel.app) | [⚡ Backend Repo](https://github.com/kpragati03/resume-generator-backend)

</div>
