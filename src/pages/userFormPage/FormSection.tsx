// src/components/FormSection.tsx

import React, { useState } from 'react';
import styles from './FormSection.module.css';

const FormSection: React.FC = () => {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    tolerance: 50, // Default at 50%
    cv: null as File | null,
  });

  // State to manage form errors
  const [errors, setErrors] = useState({
    name: '',
    jobTitle: '',
    tolerance: '',
    cv: '',
  });

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files && files[0] ? files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'range' ? Number(value) : value,
      }));
    }

    // Clear the error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job Title is required.';
    }

    if (formData.tolerance < 0 || formData.tolerance > 100) {
      newErrors.tolerance = 'Tolerance Level must be between 0 and 100.';
    }

    if (!formData.cv) {
      newErrors.cv = 'Please upload your cv.';
    } else {
      const allowedTypes = [
        'application/pdf',
      ];
      if (!allowedTypes.includes(formData.cv.type)) {
        newErrors.cv = 'Only PDF files are allowed.';
      }
      const maxSize = 10 * 1024 * 1024; // 5MB
      if (formData.cv.size > maxSize) {
        newErrors.cv = 'Cv must be smaller than 10MB.';
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Create FormData object
    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('jobTitle', formData.jobTitle);
    submissionData.append('tolerance', formData.tolerance.toString());
    if (formData.cv) {
      submissionData.append('cv', formData.cv);
    }

    try {
      const response = await fetch('https://resumeroastbackend-ysb5p.kinsta.app/form', {
        method: 'POST',
        body: submissionData,
        
      });
      
      if(response.status == 201){
        setFormData({
          name: '',
          jobTitle: '',
          tolerance: 50,
          cv: null,
        });
        setErrors({
          name: '',
          jobTitle: '',
          tolerance: '',
          cv: '',
        });
        // Optionally, redirect or perform other actions
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(
          errorData.message ||
            'There was an issue submitting the form. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.formSection}>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        {/* Name Input */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name <span className={styles.required}></span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.inputField}
            placeholder="Enter your name..."
            required
            aria-label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Job Title Input */}
        <div className={styles.formGroup}>
          <label htmlFor="jobTitle" className={styles.label}>
            Job Title <span className={styles.required}></span>
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className={styles.inputField}
            placeholder="Enter your job title…"
            required
            aria-label="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          {errors.jobTitle && (
            <span className={styles.error}>{errors.jobTitle}</span>
          )}
        </div>

        {/* Tolerance Level Slider */}
        <div className={styles.formGroup}>
          <label htmlFor="tolerance" className={styles.label}>
            Tolerance Level:
            <span className={styles.required}></span>
          </label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              id="tolerance"
              name="tolerance"
              min="0"
              max="100"
              step="1"
              value={formData.tolerance}
              required
              onChange={handleChange}
              className={styles.slider}
              aria-label="Tolerance Level"
            />
            <div className={styles.sliderLabels}>
              <span className={styles.sliderLabel}>Constructive</span>
              <span className={styles.sliderLabel}>Middle</span>
              <span className={styles.sliderLabel}>Roast</span>
            </div>
          </div>
          {errors.tolerance && (
            <span className={styles.error}>{errors.tolerance}</span>
          )}
        </div>

        {/* Resume Upload */}
        <div className={styles.formGroup}>
          <label htmlFor="cv" className={styles.label}>
            Upload CV <span className={styles.required}></span>
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            className={styles.inputField}
            accept=".pdf"
            required
            aria-label="Upload Cv"
            onChange={handleChange}
          />
          {formData.cv && (
            <div className={styles.fileInfo}>
              <span>{formData.cv.name}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, cv: null }))
                }
              >
              </button>
            </div>
          )}
          {errors.cv && (
            <span className={styles.error}>{errors.cv}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default FormSection;