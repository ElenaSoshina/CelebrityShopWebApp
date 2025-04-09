import React, { useState, useRef } from 'react';
import styles from './ShooterGames.module.css';
import { GameCard } from '../GameCard/GameCard';
import bloodStrike from '../../assets/images/shooters/bloodstrike.jpg';
import pubgMobile from '../../assets/images/shooters/pubg-mobile.jpg';
import pubgNewState from '../../assets/images/shooters/pubg-newstate.jpg';
import freeFire from '../../assets/images/shooters/free-fire.jpg';
import lostLight from '../../assets/images/shooters/lostlight.jpg';
import arenaBreakout from '../../assets/images/shooters/arena-breakout.jpg';
import standoff from '../../assets/images/shooters/standoff2.jpg';
import t3arena from '../../assets/images/shooters/t3arena.jpg';
import mobileLegends from '../../assets/images/shooters/mobile-legents.jpg';
import genshin from '../../assets/images/shooters/impact.jpg';

const games = [
  { id: 'blood-strike', name: 'Blood Strike', image: bloodStrike },
  { id: 'pubg-mobile', name: 'PUBG MOBILE', image: pubgMobile },
  { id: 'pubg-new-state', name: 'PUBG NEW STATE', image: pubgNewState },
  { id: 'free-fire', name: 'Free Fire', image: freeFire },
  { id: 'lost-light', name: 'Lost Light', image: lostLight },
  { id: 'arena-breakout', name: 'Arena Breakout', image: arenaBreakout },
  { id: 'standoff-2', name: 'Standoff 2', image: standoff },
  { id: 't3-arena', name: 'T3 Arena', image: t3arena },
  { id: 'mobile-legends', name: 'Mobile Legends RU', image: mobileLegends },
  { id: 'genshin-impact', name: 'Genshin Impact', image: genshin }
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