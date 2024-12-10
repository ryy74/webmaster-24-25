import './Policies.css';

const AccessibilityStatement = () => {
  return (
    <div className="policy-container">
      <h1>Accessibility Statement</h1>
      <h3>Our Commitment</h3>
      <p>
        At Green Bites, we are committed to making our website accessible to everyone, 
        including individuals with disabilities. We continuously strive to enhance 
        accessibility and usability in line with industry standards. We believe everyone 
        deserves equal access to information and services, regardless of their abilities.
      </p>
      <h3>Standards and Guidelines</h3>
      <p>
        Our website is designed and developed in accordance with Web Content Accessibility 
        Guidelines (WCAG) 2.1, aiming to meet Level AA compliance. We regularly audit 
        and test our site to identify and fix any accessibility barriers.
      </p>
      <h3>Accessibility Features</h3>
      <p>
        Some of the features we have implemented include alternative text for images, 
        keyboard navigability, high-contrast design options, and the use of ARIA (Accessible 
        Rich Internet Applications) roles for screen readers.
      </p>
      <h3>Feedback and Assistance</h3>
      <p>
        If you encounter any accessibility barriers or need assistance, please contact us at 
        <a href="mailto:accessibility@greenbites.com"> accessibility@greenbites.com</a>. 
        We value your feedback and are dedicated to improving your experience on our website.
      </p>
    </div>
  );
};

export default AccessibilityStatement;
