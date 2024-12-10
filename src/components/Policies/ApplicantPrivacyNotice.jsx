import './Policies.css';

const ApplicantPrivacyNotice = () => {
  return (
    <div className="policy-container">
      <h1>Applicant Privacy Notice</h1>
      <h3>Information We Collect</h3>
      <p>
        When you apply for a position at Green Bites, we collect personal information such as 
        your name, contact details, resume, cover letter, and references. We may also gather 
        additional details, including background check information and records of communication 
        during the hiring process.
      </p>
      <h3>How We Use Applicant Data</h3>
      <p>
        Applicant data is used solely for evaluating qualifications, conducting interviews, 
        assessing suitability for employment, and communicating regarding employment 
        opportunities. We may retain your data for future job openings unless you request 
        its deletion.
      </p>
      <h3>Data Retention and Security</h3>
      <p>
        Your data is stored securely and accessed only by authorized personnel. We retain your 
        information for a reasonable period to comply with legal obligations and manage 
        recruitment processes effectively.
      </p>
      <h3>Your Rights</h3>
      <p>
        As an applicant, you have the right to access, correct, or request the deletion of 
        your personal information. Please contact <a href="mailto:privacy@greenbites.com">
        privacy@greenbites.com</a> for inquiries or requests related to your data.
      </p>
    </div>
  );
};

export default ApplicantPrivacyNotice;
