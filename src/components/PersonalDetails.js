import React, { useState } from "react";
import "./PersonalDetails.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaLightbulb, FaBriefcase } from "react-icons/fa";

export default function PersonalDetails({ handleInputChange, data, theme }) {
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');
  const isDarkMode = theme === 'dark';

  // Validate fields
  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else {
      if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        error = "Enter a valid email";
      }
      if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
        error = "Enter a valid 10-digit phone number";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFocusedField('');
  };

  // Handle change and pass to parent
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('PersonalDetails handleChange:', name, value);
    console.log('Current data received:', data);
    
    // Create a new event object for the parent handler
    const syntheticEvent = {
      target: {
        name: name,
        value: value
      }
    };
    
    handleInputChange(syntheticEvent);
    validateField(name, value);
  };

  console.log('PersonalDetails render - current data:', data);

  return (
    <div className={`personal-details-container theme-${theme}`}>
      <div className="personal-details-card">
        {/* Header */}
        <div className="header-section">
          <div className="header-icon">
            <FaUser size={24} />
          </div>
          <div className="header-content">
            <h2 className="header-title">Personal Details</h2>
            <p className="header-subtitle">
              Fill out your personal information to get started
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Step 1 of 5</span>
            <span className="progress-value">20%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "20%" }}></div>
          </div>
        </div>

        {/* Form */}
        <div className="form-section">
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label className="form-label">
                <FaUser className="field-icon" /> Full Name
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={data.name || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('name')}
                  placeholder="Enter your full name"
                  className={`form-input ${focusedField === 'name' ? 'focused' : ''} ${data.name && !errors.name ? 'success' : ''} ${errors.name ? 'error' : ''}`}
                />
                {data.name && !errors.name && (
                  <span className="validation-icon success">
                    <FaCheckCircle />
                  </span>
                )}
                {errors.name && (
                  <span className="validation-icon error">
                    <FaTimesCircle />
                  </span>
                )}
              </div>
              {errors.name && (
                <p className={`error-message theme-${theme}`}>
                  <FaTimesCircle /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope className="field-icon" /> Email Address
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={data.email || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('email')}
                  placeholder="Enter your email"
                  className={`form-input ${focusedField === 'email' ? 'focused' : ''} ${data.email && !errors.email ? 'success' : ''} ${errors.email ? 'error' : ''}`}
                />
                {data.email && !errors.email && (
                  <span className="validation-icon success">
                    <FaCheckCircle />
                  </span>
                )}
                {errors.email && (
                  <span className="validation-icon error">
                    <FaTimesCircle />
                  </span>
                )}
              </div>
              {errors.email && (
                <p className={`error-message theme-${theme}`}>
                  <FaTimesCircle /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <FaPhone className="field-icon" /> Phone Number
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('phone')}
                  placeholder="Enter your phone number"
                  className={`form-input ${focusedField === 'phone' ? 'focused' : ''} ${data.phone && !errors.phone ? 'success' : ''} ${errors.phone ? 'error' : ''}`}
                />
                {data.phone && !errors.phone && (
                  <span className="validation-icon success">
                    <FaCheckCircle />
                  </span>
                )}
                {errors.phone && (
                  <span className="validation-icon error">
                    <FaTimesCircle />
                  </span>
                )}
              </div>
              {errors.phone && (
                <p className={`error-message theme-${theme}`}>
                  <FaTimesCircle /> {errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">
                <FaMapMarkerAlt className="field-icon" /> Address
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="address"
                  value={data.address || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('address')}
                  placeholder="Enter your address"
                  className={`form-input ${focusedField === 'address' ? 'focused' : ''} ${data.address && !errors.address ? 'success' : ''} ${errors.address ? 'error' : ''}`}
                />
                {data.address && !errors.address && (
                  <span className="validation-icon success">
                    <FaCheckCircle />
                  </span>
                )}
              </div>
              {errors.address && (
                <p className={`error-message theme-${theme}`}>
                  <FaTimesCircle /> {errors.address}
                </p>
              )}
            </div>

            {/* Profession */}
            <div className="form-group">
              <label className="form-label">
                <FaBriefcase className="field-icon" /> Profession
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="profession"
                  value={data.profession || ''}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('profession')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter your profession/title"
                  className={`form-input ${focusedField === 'profession' ? 'focused' : ''} ${data.profession ? 'success' : ''}`}
                />
                {data.profession && (
                  <span className="validation-icon success">
                    <FaCheckCircle />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="tips-section">
          <div className="tips-header">
            <FaLightbulb />
            <h3>Tips for filling out this section</h3>
          </div>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">
                <FaCheckCircle />
              </span>
              Make sure your name matches official documents.
            </div>
            <div className="tip-item">
              <span className="tip-icon">
                <FaCheckCircle />
              </span>
              Use a professional email address.
            </div>
            <div className="tip-item">
              <span className="tip-icon">
                <FaCheckCircle />
              </span>
              Double-check your phone number for accuracy.
            </div>
          </div>
        </div>

        {/* Status */}
        {Object.keys(errors).length === 0 && data.name && data.email && data.phone && data.address && (
          <div className="status-section">
            <div className="status-icon">
              <FaCheckCircle size={24} />
            </div>
            <div className="status-content">
              <h4>All set!</h4>
              <p>Your personal details look good</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}