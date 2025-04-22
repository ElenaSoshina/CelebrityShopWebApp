import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';
import { GameStore } from '../../components/GameStore/GameStore';
import { SuperSellGames } from '../../components/SuperSellGames/SuperSellGames';
import { GiftCards } from '../../components/GiftCards/GiftCards';
import { PCGames } from '../../components/PCGames/PCGames';
import { ShooterGames } from '../../components/ShooterGames/ShooterGames';
import { FAQ } from '../../components/FAQ/FAQ';

export const HomePage: React.FC = () => {
  // const location = useLocation<{ scrollTo?: string }>();
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 80; // ваша высота хедера
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location.state]);
  return (
    <div className={styles.container}>
      <Hero />
      <GameStore />
      <SuperSellGames />
      <GiftCards />
      <PCGames />
      <ShooterGames />
      <FAQ />
    </div>
  );
};

export default HomePage;
