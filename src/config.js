// API Configuration - Use environment variable if available, otherwise fallback to Railway URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://resume-generator-website.up.railway.app';

export default API_BASE_URL;
