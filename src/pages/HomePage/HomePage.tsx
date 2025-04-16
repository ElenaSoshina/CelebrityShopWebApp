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
      // Пытаемся найти элемент каждые 100 мс
      const interval = setInterval(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          // Когда элемент найден, производим скролл
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          clearInterval(interval);
        }
      }, 100);
      
      // Прекращаем попытки через 3 секунды, если элемент так и не появился
      setTimeout(() => clearInterval(interval), 3000);
    };

    // Если передан параметр scrollTo в state, запускаем скролл
    if (location.state && (location.state as any).scrollTo) {
      // Небольшая задержка, чтобы дать время элементам отрендериться
      setTimeout(() => {
        scrollToSection((location.state as any).scrollTo);
      }, 100);
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <Hero />
      {/* Оборачиваем GiftCards в блок с id для скроллинга "Каталог" */}
      <div id="game-store">
        <GiftCards />
      </div>
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
};

export default HomePage;
