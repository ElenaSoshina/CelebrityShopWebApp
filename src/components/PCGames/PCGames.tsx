import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PCGames.module.css';

const games = [
  {
    id: 'marvel-rivals',
    name: 'Marvel Rivals',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/marvel-rivals.jpg`
  },
  {
    id: 'delta-force',
    name: 'Delta Force',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/delta-force.jpg`
  },
  {
    id: 'arena-breakout',
    name: 'Arena Breakout: Infinite',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/arena.jpg`
  },
  {
    id: 'pubg-battlegrounds',
    name: 'PUBG Battlegrounds',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/battle.jpg`
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/fortnite.jpg`
  },
  {
    id: 'valorant',
    name: 'Valorant',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/valorant.jpg`
  },
  {
    id: 'roblox',
    name: 'Roblox',
    image: `${process.env.PUBLIC_URL}/assets/images/pc-games/roblox.jpg`
  }
];

export const PCGames: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToGame = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveDot(index);
    }
  };

  const handleGameClick = (id: string) => {
    navigate(`/game/${id}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const cardWidth = 280;
        const gap = 24;
        const newActiveDot = Math.round(scrollPosition / (cardWidth + gap));
        setActiveDot(newActiveDot);
      }
    };

    carouselRef.current?.addEventListener('scroll', handleScroll);
    return () => carouselRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="pcgames" className={styles.pcGames}>
      <h2 className={styles.title}>Компьютерные игры</h2>
      <p className={styles.subtitle}>Популярные игры для PC</p>
      
      <div className={styles.gamesWrapper}>
        <div className={styles.gamesCarousel} ref={carouselRef}>
          {games.map((game) => (
            <div 
              key={game.id} 
              className={styles.gameItem}
              onClick={() => handleGameClick(game.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.imageWrapper}>
                <img src={game.image} alt={game.name} />
              </div>
              <h3 className={styles.gameName}>{game.name}</h3>
            </div>
          ))}
        </div>
        
        <div className={styles.pagination}>
          {games.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeDot ? styles.active : ''}`}
              onClick={() => scrollToGame(index)}
              aria-label={`Scroll to game ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 