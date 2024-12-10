import './Policies.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <h3>Information We Collect</h3>
      <p>
        We collect personal information you provide, such as name, email, and payment details. 
        Additionally, we gather non-personal data like IP addresses, browser types, and 
        site activity through analytics tools.
      </p>
      <h3>How We Use Information</h3>
      <p>
        We use your information to process transactions, provide customer support, and 
        enhance your experience on our website. This includes personalizing content 
        and marketing communications.
      </p>
      <h3>Sharing Your Information</h3>
      <p>
        Your information may be shared with trusted third parties, such as payment processors 
        and marketing platforms, to fulfill services. We ensure all parties comply with 
        privacy laws.
      </p>
      <h3>Your Data Rights</h3>
      <p>
        You have the right to access, modify, or delete your personal information. Please contact 
        <a href="mailto:privacy@greenbites.com"> privacy@greenbites.com</a> for any requests.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
