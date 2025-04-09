import { useEffect, useRef, useState } from 'react';
import styles from './GiftCards.module.css';
import apple from '../../assets/images/gift-cards/apple.jpg';
import roblox from '../../assets/images/gift-cards/roblox.jpg';
import valorant from '../../assets/images/gift-cards/valorant.jpg';
import fortnite from '../../assets/images/gift-cards/fortnite.jpg';

const cards = [
  {
    id: 1,
    name: 'Apple Store/iTunes',
    image: apple
  },
  {
    id: 2,
    name: 'ROBLOX',
    image: roblox
  },
  {
    id: 3,
    name: 'Valorant',
    image: valorant
  },
  {
    id: 4,
    name: 'Fortnite',
    image: fortnite
  }
];

export const GiftCards: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
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
    <section id="giftcards" className={styles.giftCards}>
      <h2 className={styles.title}>Подарочные карты</h2>
      <p className={styles.subtitle}>Коды моментально, пополнение сервисов</p>
      
      <div className={styles.cardsWrapper}>
        <div className={styles.cardsCarousel} ref={carouselRef}>
          {cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <div className={styles.imageWrapper}>
                <img src={card.image} alt={card.name} />
              </div>
              <h3 className={styles.cardName}>{card.name}</h3>
            </div>
          ))}
        </div>
        
        <div className={styles.pagination}>
          {cards.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeDot ? styles.active : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Scroll to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 