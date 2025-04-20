import React, { useState, useRef } from 'react';
import styles from './Subscriptions.module.css';
import { GameCard } from '../GameCard/GameCard';

const subscriptions = [
  { id: 'telegram', name: 'Telegram', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/telegram.jpg` },
  { id: 'likee', name: 'LIKE', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/like.jpg` },
  { id: 'steam', name: 'Steam', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/steam.jpg` }
];

export const Subscriptions: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const dotIndex = Math.round((scrollPosition / maxScroll) * (subscriptions.length - 1));
      setActiveDot(dotIndex);
    }
  };

  const scrollToPosition = (dotIndex: number) => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const scrollPosition = (dotIndex / (subscriptions.length - 1)) * maxScroll;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="subscriptions" className={styles.subscriptions}>
      <h2 className={styles.title}>Подписки</h2>
      <p className={styles.subtitle}>Пополнение сервисов</p>
      <div className={styles.gamesWrapper}>
        <div className={styles.gamesCarousel} ref={carouselRef} onScroll={handleScroll}>
          {subscriptions.map(sub => (
            <GameCard
              key={sub.id}
              id={sub.id}
              name={sub.name}
              image={sub.image}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: subscriptions.length }, (_, i) => (
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