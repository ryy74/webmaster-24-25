import React from 'react';

const Home = () => {
  return (
    <section style={styles.home}>
      <h2>Welcome to gimmeanamepls!</h2>
      <p>Experience fresh, sustainable, vegan and vegetarian meals.</p>
    </section>
  );
};

const styles = {
  home: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default Home;