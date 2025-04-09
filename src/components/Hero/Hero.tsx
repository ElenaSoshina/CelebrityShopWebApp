import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Геймерская вселенная,</h1>
        <p className={styles.heroSubtitle}>
          созданная своими для своих<span className={styles.emoji}> 🎮</span>
        </p>
        <p className={styles.heroDescription}>Игры, донаты, валюта — всё в одном месте!</p>
      </div>
    </section>
  );
};

export default Hero; 