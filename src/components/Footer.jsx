import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <p>© 2024 Green Bites. All rights reserved.</p>
      </div>
      <div className="footer-center">
        <div className="social-icons">
          <a href="#" className="social-link" aria-label="Instagram">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2.163C6.513,2.163,2.163,6.513,2.163,12c0,5.486,4.35,9.837,9.837,9.837s9.837-4.35,9.837-9.837 C21.837,6.513,17.486,2.163,12,2.163z M12,19.837c-4.469,0-8.837-3.368-8.837-7.837C3.163,7.531,7.531,3.163,12,3.163 s8.837,4.368,8.837,8.837C20.837,16.469,16.469,19.837,12,19.837z"></path>
              <path d="M16.956,7.541C16.957,7.773,16.913,8.004,16.828,8.22c-0.084,0.216-0.207,0.413-0.362,0.58 c-0.154,0.167-0.337,0.3-0.538,0.391C15.727,9.293,15.512,9.341,15.293,9.341h-0.002C14.843,9.341,14.415,9.156,14.109,8.85 C13.803,8.544,13.617,8.117,13.617,7.667c0-0.451,0.185-0.878,0.49-1.183c0.305-0.305,0.733-0.49,1.183-0.49 c0.45,0,0.878,0.185,1.183,0.49C16.77,6.789,16.956,7.217,16.956,7.667C16.956,7.697,16.955,7.729,16.956,7.541z"></path>
              <path d="M12,7.834c-1.515,0-2.837,0.873-3.6,2.186c-0.763,1.312-0.763,2.805,0,4.117C9.163,15.447,10.485,16.32,12,16.32 s2.837-0.873,3.6-2.186c0.763-1.312,0.763-2.805,0-4.117C14.837,8.706,13.515,7.834,12,7.834z M12,14.32 c-0.935,0-1.832-0.385-2.508-1.061C8.816,12.583,8.432,11.686,8.432,10.752s0.385-1.83,1.061-2.506 C9.168,7.569,10.065,7.184,12,7.184c1.935,0,2.832,0.385,3.508,1.061C16.183,8.922,16.568,9.819,16.568,10.752 s-0.385,1.83-1.061,2.506C13.832,13.935,12.935,14.32,12,14.32z"></path>
            </svg>
          </a>
          <a href="#" className="social-link" aria-label="Facebook">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675,0H1.325C0.593,0,0,0.594,0,1.325v21.351C0,23.406,0.593,24,1.325,24H12.82V14.708H9.692V11.08h3.128V8.414 c0-2.771,1.692-4.28,4.163-4.28c1.183,0,2.197,0.088,2.491,0.128v2.89h-1.709c-1.34,0-1.6,0.637-1.6,1.569V11.08h3.2l-0.538,3.628 h-2.662V24h5.235C23.407,24,24,23.406,24,22.676V1.325C24,0.594,23.407,0,22.675,0z"/>
            </svg>
          </a>
        </div>
        <div className="links-container">
          <a href="#" className="footer-link">Accessibility Statement</a>
          <a href="#" className="footer-link">Terms of Use</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Cookie Policy</a>
          <a href="#" className="footer-link">Applicant Privacy Notice</a>
        </div>
      </div>
      <div className="footer-latest-change">
        <p className="latest-change-text">Version: 12/7/2024</p>
      </div>
    </footer>
  );
};

export default Footer;