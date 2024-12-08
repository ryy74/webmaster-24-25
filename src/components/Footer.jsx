import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 gimmeanamepls. All rights reserved.</p>
      <p>Follow us on <a href="#" style={styles.link}>Instagram</a> | <a href="#" style={styles.link}>Facebook</a></p>
      <div style={styles.linksContainer}>
        <a href="#" style={styles.link}>Accessibility Statement</a>
        <a href="#" style={styles.link}>Terms of Use</a>
        <a href="#" style={styles.link}>Privacy Policy</a>
        <a href="#" style={styles.link}>Cookie Policy</a>
        <a href="#" style={styles.link}>Applicant Privacy Notice</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#27ae60',
    color: '#fff',
  },
  linksContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  link: {
    color: '#fff',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default Footer;