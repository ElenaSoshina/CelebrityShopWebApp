import React, { useState, useRef, useEffect } from 'react';
import styles from './GameStore.module.css';

export const GameStore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDot, setActiveDot] = useState(0);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'Все', section: 'hero' },
    { id: 'supercell', name: 'SuperSell игры', section: 'supersell' },
    { id: 'giftcards', name: 'Подарочные карты', section: 'giftcards' },
    { id: 'pc', name: 'Компьютерные игры', section: 'pcgames' },
    { id: 'shooters', name: 'Шутеры и стратегии', section: 'shooters' },
    { id: 'subscriptions', name: 'Подписки', section: 'subscriptions' }
  ];

  const handleScroll = () => {
    if (categoriesRef.current) {
      const scrollPosition = categoriesRef.current.scrollLeft;
      const maxScroll = categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth;
      const dotIndex = Math.round((scrollPosition / maxScroll) * (categories.length - 1));
      setActiveDot(dotIndex);
    }
  };

  useEffect(() => {
    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      categoriesElement.addEventListener('scroll', handleScroll);
      return () => categoriesElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToPosition = (dotIndex: number) => {
    if (categoriesRef.current) {
      const maxScroll = categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth;
      const scrollPosition = (dotIndex / (categories.length - 1)) * maxScroll;
      categoriesRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (categoryId: string, section: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="game-store" className={styles.gameStore}>
      <div className={styles.container}>
        <div className={styles.content}>
          <nav className={styles.gameNav}>
            <div className={styles.topNav}>
              <div className={styles.logo}>GameStore</div>
            </div>
            <div className={styles.categoriesWrapper}>
              <div className={styles.categories} ref={categoriesRef}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(cat.id, cat.section)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className={styles.pagination}>
                {Array.from({ length: categories.length }, (_, i) => (
                  <div
                    key={i}
                    className={`${styles.dot} ${activeDot === i ? styles.active : ''}`}
                    onClick={() => scrollToPosition(i)}
                  />
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}; 