// API Configuration
const config = {
  // Development URL (when running locally)
  development: 'http://localhost:5000',
  
  // Production URL (Railway deployment)
  production: 'https://resume-generator-website.up.railway.app',
};

// Automatically detect environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? config.production 
  : config.production; // Use Railway URL for now

export default API_BASE_URL;