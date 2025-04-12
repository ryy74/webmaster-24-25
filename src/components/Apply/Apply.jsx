import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiCheckCircle,
  FiFileText,
  FiLoader,
  FiMail,
  FiPaperclip,
  FiPhone,
  FiUser,
} from 'react-icons/fi';

import { useLanguage } from '../../contexts/LanguageContext';

import './Apply.css';

function ApplicationForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: null,
    portfolio: null,
    message: '',
  });
  const [resumeFileName, setResumeFileName] = useState('');
  const [coverLetterFileName, setCoverLetterFileName] = useState('');
  const [portfolioFileName, setPortfolioFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { t } = useLanguage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormState((prev) => ({ ...prev, [name]: files[0] }));

      if (name === 'resume') {
        setResumeFileName(files[0].name);
      } else if (name === 'coverLetter') {
        setCoverLetterFileName(files[0].name);
      } else if (name === 'portfolio') {
        setPortfolioFileName(files[0].name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="application-container">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            className="application-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            key="form"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t('joinTeam')}
            </motion.h2>

            <motion.p
              className="form-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('applySub')}
            </motion.p>

            <motion.form
              className="application-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <FiUser className="form-icon" />
                    {t('firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    <FiUser className="form-icon" />
                    {t('lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <FiMail className="form-icon" />
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FiPhone className="form-icon" />
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="position">
                  <FiFileText className="form-icon" />
                  {t('position')}
                </label>
                <select
                  id="position"
                  name="position"
                  value={formState.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('selectTitle')}</option>
                  <option value="software-engineer">
                    {t('softwareEngineer')}
                  </option>
                  <option value="product-designer">{t('productDesign')}</option>
                  <option value="marketing-specialist">{t('marketing')}</option>
                  <option value="customer-support">
                    {t('customerSupport')}
                  </option>
                  <option value="in-person">{t('inPerson')}</option>
                  <option value="other">{t('otherRole')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience">
                  <FiFileText className="form-icon" />
                  {t('yearsExp')}
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formState.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('selectTitle')}</option>
                  <option value="0-1">{t('expOne')}</option>
                  <option value="1-3">{t('expTwo')}</option>
                  <option value="3-5">{t('expThree')}</option>
                  <option value="5-10">{t('expFour')}</option>
                  <option value="10+">{t('expFive')}</option>
                </select>
              </div>

              <div className="form-group file-upload-group">
                <label htmlFor="resume">
                  <FiPaperclip className="form-icon" />
                  {t('rCV')}
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="file-input"
                  />
                  <div className="file-upload-button">{t('chooseFile')}</div>
                  <div className="file-name">
                    {resumeFileName || 'No file chosen'}
                  </div>
                </div>
                <div className="file-format-hint">{t('acceptPDD')}</div>
              </div>

              <div className="form-group file-upload-group">
                <label htmlFor="coverLetter">
                  <FiPaperclip className="form-icon" />
                  {t('coverLetter')}
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="coverLetter"
                    name="coverLetter"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="file-input"
                  />
                  <div className="file-upload-button">{t('chooseFile')}</div>
                  <div className="file-name">
                    {coverLetterFileName || 'No file chosen'}
                  </div>
                </div>
                <div className="file-format-hint">{t('acceptPDD')}</div>
              </div>

              <div className="form-group file-upload-group">
                <label htmlFor="portfolio">
                  <FiPaperclip className="form-icon" />
                  {t('pwSample')}
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="portfolio"
                    name="portfolio"
                    onChange={handleFileChange}
                    accept=".pdf,.zip,.jpg,.png"
                    className="file-input"
                  />
                  <div className="file-upload-button">{t('chooseFile')}</div>
                  <div className="file-name">
                    {portfolioFileName || 'No file chosen'}
                  </div>
                </div>
                <div className="file-format-hint">{t('acceptPZJP')}</div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <FiFileText className="form-icon" />
                  {t('additionalInfo')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={t('placeholder')}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="spinner" />
                    {t('loadingSubmit')}
                  </>
                ) : (
                  t('submitButton')
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            className="success-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            key="success"
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FiCheckCircle />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('appReceived')}
            </motion.h2>
            <motion.button
              className="reset-button"
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {t('submitAppAgain')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ApplicationForm;
