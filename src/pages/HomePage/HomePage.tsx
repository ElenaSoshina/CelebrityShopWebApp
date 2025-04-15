import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';
import { GiftCards } from '../../components/GiftCards/GiftCards';
import { FAQ } from '../../components/FAQ/FAQ';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        requestAnimationFrame(() => {
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      }
    };

    // Проверяем state при навигации
    if (location.state && (location.state as any).scrollTo) {
      setTimeout(() => {
        scrollToSection((location.state as any).scrollTo);
      }, 1000);
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <Hero />
      <GiftCards />
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}; 