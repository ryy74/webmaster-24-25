import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 gimmeanamepls. All rights reserved.</p>
      <p>Follow us on <a href="#" style={styles.link}>Instagram</a> | <a href="#" style={styles.link}>Facebook</a></p>
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
  link: {
    color: '#fff',
    textDecoration: 'underline',
  },
};

export default Footer;