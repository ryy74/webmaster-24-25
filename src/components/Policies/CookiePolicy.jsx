import './Policies.css';

const CookiePolicy = () => {
  return (
    <div className="policy-container">
      <h1>Cookie Policy</h1>
      <h3>What Are Cookies?</h3>
      <p>
        Cookies are small text files stored on your device to enhance your browsing experience, 
        track website usage, and provide personalized content. They help us analyze traffic 
        and improve functionality.
      </p>
      <h3>Types of Cookies We Use</h3>
      <p>
        We use various types of cookies, including:
        <ul>
          <li><b>Essential Cookies:</b> Necessary for the basic functionality of our website.</li>
          <li><b>Performance Cookies:</b> Help us analyze website traffic and user behavior.</li>
          <li><b>Functional Cookies:</b> Remember user preferences and settings.</li>
          <li><b>Marketing Cookies:</b> Track browsing habits to provide targeted advertising.</li>
        </ul>
      </p>
      <h3>Managing Cookies</h3>
      <p>
        You can manage cookie preferences through your browser settings. Note that disabling 
        cookies may limit certain functionalities of our website.
      </p>
      <h3>Third-Party Cookies</h3>
      <p>
        Some cookies may be placed by third-party services we use, such as analytics providers 
        or embedded content (e.g., videos). These third parties may collect additional 
        information as per their privacy policies.
      </p>
    </div>
  );
};

export default CookiePolicy;
