import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './GamePage.module.css';
import Select from '../../components/Select/Select';
import { OrderModal } from '../../components/OrderModal/OrderModal';

interface GameImage {
  imageUrl: string;
}

interface GameItem {
  name: string;
  type: string;
  region: string;
  details: string;
  price: number;
}

interface GameInfo {
  title: string;
  description: string;
  instruction: string;
  images: GameImage[];
  items: GameItem[];
}

// Моковые данные для тестирования
const mockGameInfo: GameInfo = {
  title: "Epic Adventure",
  description: "Embark on an epic adventure filled with quests and surprises.",
  instruction: "Follow the map and defeat the dragons to save the kingdom.",
  images: [
    {
      imageUrl: "/assets/images/pc-games/delta-force.jpg"
    },
    {
      imageUrl: "/assets/images/pc-games/valorant.jpg"
    }
  ],
  items: [
    {
      name: "Magic Sword",
      type: "Weapon",
      region: "Enchanted Forest",
      details: "A sword imbued with magical powers.",
      price: 250
    },
    {
      name: "Healing Potion",
      type: "Consumable",
      region: "Village Market",
      details: "Restores health and energy.",
      price: 50
    }
  ]
};

export const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(mockGameInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Закомментированный запрос к API
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<GameInfo>(`https://api.celebritystrike.com/api/games/${gameId}`);
        setGameInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]);*/

  const handleItemChange = (value: string, type: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleBuyClick = () => {
    if (Object.keys(selectedItems).length === 0) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (data: { name: string; phone: string; telegram: string }) => {
    const selectedProducts = Object.entries(selectedItems).map(([type, name]) => 
      gameInfo?.items.find(item => item.name === name)
    ).filter(Boolean);

    console.log('Order submitted:', {
      ...data,
      products: selectedProducts,
      totalPrice: selectedProducts.reduce((sum, item) => sum + (item?.price || 0), 0)
    });
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (gameInfo) {
      setSlideDirection('left');
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % gameInfo.images.length);
        setSlideDirection(null);
      }, 200);
    }
  };

  const prevImage = () => {
    if (gameInfo) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + gameInfo.images.length) % gameInfo.images.length);
        setSlideDirection(null);
      }, 200);
    }
  };

  // Группируем товары по типу
  const groupedItems = gameInfo?.items.reduce<Record<string, GameItem[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {}) || {};

  // Получаем выбранные товары и считаем общую сумму
  const selectedProducts = Object.entries(selectedItems).map(([type, name]) => 
    gameInfo?.items.find(item => item.name === name)
  ).filter(Boolean) as GameItem[];

  const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error || !gameInfo) {
    return <div className={styles.error}>{error || 'Ошибка загрузки данных'}</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        ←
      </button>
      <div className={styles.header}>
        <h1 className={styles.title}>{gameInfo.title}</h1>
        <div 
          className={styles.imageWrapper}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {gameInfo.images.length > 0 && (
            <>
              <div className={styles.imageContainer}>
                <img 
                  src={`${process.env.PUBLIC_URL}${gameInfo.images[currentImageIndex].imageUrl}`} 
                  alt={gameInfo.title} 
                  className={`${styles.gameImage} ${slideDirection ? styles[`slide${slideDirection === 'left' ? 'Out' : 'In'}`] : ''}`}
                />
              </div>
              {gameInfo.images.length > 1 && (
                <>
                  <button className={styles.prevButton} onClick={prevImage}>❮</button>
                  <button className={styles.nextButton} onClick={nextImage}>❯</button>
                  <div className={styles.carouselIndicators}>
                    {gameInfo.images.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${currentImageIndex === index ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <p className={styles.description}>{gameInfo.description}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.selects}>
          {Object.entries(groupedItems).map(([type, typeItems]) => (
            <div key={type} className={styles.selectGroup}>
              <h3 className={styles.selectTitle}>{type}</h3>
              <Select
                value={selectedItems[type] || ''}
                onChange={(value) => handleItemChange(value, type)}
                options={typeItems.map(item => ({
                  value: item.name,
                  label: `${item.name} - ${item.price}₽`
                }))}
                placeholder={`Выберите ${type.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
        <div className={styles.instruction}>
          <h3>Инструкция:</h3>
          <pre className={styles.instructionText}>{gameInfo.instruction}</pre>
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.buyButton}
            onClick={handleBuyClick}
            disabled={Object.keys(selectedItems).length === 0}
          >
            Купить {totalPrice > 0 ? `за ${totalPrice}₽` : ''}
          </button>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}; 