import React, { useState, useRef } from 'react';
import styles from './ShooterGames.module.css';
import { GameCard } from '../GameCard/GameCard';

const games = [
  { id: 'blood-strike', name: 'Blood Strike', image: `${process.env.PUBLIC_URL}/assets/images/shooters/bloodstrike.jpg` },
  { id: 'pubg-mobile', name: 'PUBG MOBILE', image: `${process.env.PUBLIC_URL}/assets/images/shooters/pubg-mobile.jpg` },
  { id: 'pubg-new-state', name: 'PUBG NEW STATE', image: `${process.env.PUBLIC_URL}/assets/images/shooters/pubg-newstate.jpg` },
  { id: 'free-fire', name: 'Free Fire', image: `${process.env.PUBLIC_URL}/assets/images/shooters/free-fire.jpg` },
  { id: 'lost-light', name: 'Lost Light', image: `${process.env.PUBLIC_URL}/assets/images/shooters/lostlight.jpg` },
  { id: 'arena-breakout', name: 'Arena Breakout', image: `${process.env.PUBLIC_URL}/assets/images/shooters/arena-breakout.jpg` },
  { id: 'standoff-2', name: 'Standoff 2', image: `${process.env.PUBLIC_URL}/assets/images/shooters/standoff2.jpg` },
  { id: 't3-arena', name: 'T3 Arena', image: `${process.env.PUBLIC_URL}/assets/images/shooters/t3arena.jpg` },
  { id: 'mobile-legends', name: 'Mobile Legends RU', image: `${process.env.PUBLIC_URL}/assets/images/shooters/mobile-legents.jpg` },
  { id: 'genshin-impact', name: 'Genshin Impact', image: `${process.env.PUBLIC_URL}/assets/images/shooters/impact.jpg` }
];

export const ShooterGames: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const dotIndex = Math.round((scrollPosition / maxScroll) * (games.length - 1));
      setActiveDot(dotIndex);
    }
  };

  const scrollToPosition = (dotIndex: number) => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const scrollPosition = (dotIndex / (games.length - 1)) * maxScroll;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="shooters" className={styles.shooterGames}>
      <h2 className={styles.title}>Шутеры, стратегии</h2>
      <p className={styles.subtitle}>Пополнение игр</p>
      <div className={styles.gamesWrapper}>
        <div className={styles.gamesCarousel} ref={carouselRef} onScroll={handleScroll}>
          {games.map(game => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: games.length }, (_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${activeDot === i ? styles.active : ''}`}
              onClick={() => scrollToPosition(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 