import { useEffect, useRef, useState } from 'react';
import styles from './PCGames.module.css';
import marvel from '../../assets/images/pc-games/marvel-rivals.jpg';
import delta from '../../assets/images/pc-games/delta-force.jpg';
import arena from '../../assets/images/pc-games/arena.jpg';
import pubg from '../../assets/images/pc-games/battle.jpg';

const games = [
  {
    id: 1,
    name: 'Marvel Rivals',
    image: marvel
  },
  {
    id: 2,
    name: 'Delta Force',
    image: delta
  },
  {
    id: 3,
    name: 'Arena Brekout: Infinitr',
    image: arena
  },
  {
    id: 4,
    name: 'PUBG Battleground',
    image: pubg
  }
];

export const PCGames: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
            <div key={game.id} className={styles.gameItem}>
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