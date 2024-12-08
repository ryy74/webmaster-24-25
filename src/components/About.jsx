import React from 'react';

const About = () => {
  return (
    <section style={styles.about}>
      <h2>About Us</h2>
      <p>At gimmeanamepls, we are committed to providing wholesome, plant-based meals made with locally sourced ingredients. Our mission is to create a sustainable future, one bite at a time.</p>
    </section>
  );
};

const styles = {
  about: {
    padding: '20px',
    lineHeight: '1.6',
  },
};

export default About;