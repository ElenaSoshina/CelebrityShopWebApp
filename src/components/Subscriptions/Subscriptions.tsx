import React, { useState, useRef } from 'react';
import styles from './Subscriptions.module.css';
import { GameCard } from '../GameCard/GameCard';
import { useNavigate } from 'react-router-dom';

const subscriptions = [
  { id: 'telegram', name: 'Telegram', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/telegram.jpg` },
  { id: 'likee', name: 'LIKE', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/like.jpg` },
  { id: 'steam', name: 'Steam', image: `${process.env.PUBLIC_URL}/assets/images/subscriptions/steam.jpg` }
];

export const Subscriptions: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const dotIndex = Math.round((scrollLeft / maxScroll) * (subscriptions.length - 1));
      setActiveDot(dotIndex);
    }
  };

  const scrollToPosition = (dotIndex: number) => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPosition = (dotIndex / (subscriptions.length - 1)) * maxScroll;
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const handleCardClick = (slug: string) => {
    navigate(`/game/${slug}`, { state: { fromSection: 'subscriptions' } });
  };

  return (
    <section id="subscriptions" className={styles.subscriptions}>
      <h2 className={styles.title}>Подписки</h2>
      <p className={styles.subtitle}>Пополнение сервисов</p>

      <div className={styles.gamesWrapper}>
        <div
          className={styles.gamesCarousel}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {subscriptions.map(sub => (
            <div
              key={sub.id}
              onClick={() => handleCardClick(sub.id)}
              style={{ cursor: 'pointer' }}
            >
              <GameCard
                id={sub.id}
                name={sub.name}
                image={sub.image}
              />
            </div>
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