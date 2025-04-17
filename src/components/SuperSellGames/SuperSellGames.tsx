import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SuperSellGames.module.css';

const games = [
  { id: 'brawl-stars', name: 'Brawl Stars', image: `${process.env.PUBLIC_URL}/assets/images/supersell/brawl-stars.jpg` },
  { id: 'clash-royale', name: 'Clash Royale', image: `${process.env.PUBLIC_URL}/assets/images/supersell/clashroyale.jpg` },
  { id: 'clash-of-clans', name: 'Clash of Clans', image: `${process.env.PUBLIC_URL}/assets/images/supersell/clashofclans.jpg` },
  { id: 'squad-buster', name: 'Squad Busters', image: `${process.env.PUBLIC_URL}/assets/images/supersell/squad-buster.jpg` },
  { id: 'mo-co', name: 'Mo-Co', image: `${process.env.PUBLIC_URL}/assets/images/supersell/mo-co.webp` }
];

export const SuperSellGames: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const gamesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (gamesRef.current) {
      const scrollPosition = gamesRef.current.scrollLeft;
      const maxScroll = gamesRef.current.scrollWidth - gamesRef.current.clientWidth;
      const dotIndex = Math.round((scrollPosition / maxScroll) * (games.length - 1));
      setActiveDot(dotIndex);
    }
  };

  const scrollToPosition = (dotIndex: number) => {
    if (gamesRef.current) {
      const maxScroll = gamesRef.current.scrollWidth - gamesRef.current.clientWidth;
      const scrollPosition = (dotIndex / (games.length - 1)) * maxScroll;
      gamesRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleGameClick = (slug: string) => {
    const backendName = slug.replace(/-/g, '_');
    navigate(`/game/${slug}`);
  };

  return (
    <section id="supersell" className={styles.superSellGames}>
      <h2 className={styles.title}>SuperSell игры</h2>
      <div className={styles.gamesWrapper}>
        <div className={styles.gamesCarousel} ref={gamesRef} onScroll={handleScroll}>
          {games.map(game => (
            <div 
              key={game.id} 
              className={styles.gameCard}
              onClick={() => handleGameClick(game.id)}
            >
              <div className={styles.imageWrapper}>
                <img src={game.image} alt={game.name} />
              </div>
              <h3 className={styles.gameName}>{game.name}</h3>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: games.length }, (_, i) => (
            <div
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