import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SuperSellGames.module.css';
import brawlStars from '../../assets/images/supersell/brawl-stars.jpg';
import clashRoyale from '../../assets/images/supersell/clashroyale.jpg';
import clashOfClans from '../../assets/images/supersell/clashofclans.jpg';
import hayDay from '../../assets/images/supersell/hayday.jpg';
import boomBeach from '../../assets/images/supersell/boombeach.jpg';
import squadBuster from '../../assets/images/supersell/squad-buster.jpg';
import moco from '../../assets/images/supersell/mo-co.webp';

interface Game {
  id: string;
  name: string;
  image: string;
}

const games: Game[] = [
  {
    id: 'brawl-stars',
    name: 'Brawl Stars',
    image: brawlStars
  },
  {
    id: 'clash-royale',
    name: 'Clash Royale',
    image: clashRoyale
  },
  {
    id: 'clash-of-clans',
    name: 'Clash of Clans',
    image: clashOfClans
  },
  {
    id: 'hay-day',
    name: 'Hay Day',
    image: hayDay
  },
  {
    id: 'boom-beach',
    name: 'Boom Beach',
    image: boomBeach
  },
  {
    id: 'squad-buster',
    name: 'Squad Buster',
    image: squadBuster,
  },
  {
    id: 'mo-co',
    name: 'MO.CO',
    image: moco
  },
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

  const handleGameClick = (id: string) => {
    navigate(`/game/${id}`);
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