import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './GamePage.module.css';
import Select from '../../components/Select/Select';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import { Game } from '../../types/game';
import { useCart } from '../../context/CartContext';
import { Notification } from '../../components/Notification/Notification';

interface GameImage {
  id: number;
  imageUrl: string;
}

interface GameItem {
  id: number;
  name: string;
  type: string;
  region: string;
  details: string;
  price: number;
}

interface GameData {
  id: number;
  name: string;
  title: string;
  description: string;
  instruction: string;
  images: GameImage[];
  items: GameItem[];
}

interface ApiResponse {
  success: boolean;
  data: GameData;
  errorMessage?: string;
}

interface GameInfo {
  title: string;
  description: string;
  instruction: string;
  images: GameImage[];
  items: GameItem[];
}

interface LocationState {
  fromSection?: string;
}

export const GamePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    const fromSection = state?.fromSection;
    if (fromSection) {
      navigate('/', { state: { scrollTo: fromSection } });
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(`https://backend.celebrity-miniapp.duckdns.org/api/v1/games/${name}`, {
          headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
          }
        });
        if (response.data.success) {
          setGame(response.data.data);
        } else {
          setError(response.data.errorMessage || 'Ошибка при загрузке данных');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Ошибка ${err.response?.status}: ${err.response?.statusText}`);
          console.error('Error details:', err.response?.data);
        } else {
          setError('Ошибка при загрузке данных');
          console.error('Error fetching game:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [name]);

  const handleItemChange = (value: string, type: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const formatGameName = (urlName: string): string => {
    switch (urlName) {
      case 'brawl_stars':
        return 'Brawl Stars';
      // Добавьте другие игры по мере необходимости
      default:
        return urlName.replace(/_/g, ' ');
    }
  };

  const handleAddToCart = (products: GameItem[]) => {
    products.forEach(product => {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        game: formatGameName(name || ''),
        price: product.price
      });
    });
    setShowNotification(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (data: { name: string; phone: string; telegram: string }) => {
    const selectedProducts = Object.entries(selectedItems).map(([type, name]) => 
      game?.items.find(item => item.name === name)
    ).filter(Boolean);

    console.log('Order submitted:', {
      ...data,
      products: selectedProducts,
      totalPrice: selectedProducts.reduce((sum, item) => sum + (item?.price || 0), 0)
    });
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (!game) return;
    setCurrentImageIndex((prev) => (prev + 1) % game.images.length);
  };

  const prevImage = () => {
    if (!game) return;
    setCurrentImageIndex((prev) => (prev - 1 + game.images.length) % game.images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Группируем товары по типу
  const groupedItems = game?.items.reduce<Record<string, GameItem[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {}) || {};

  // Получаем выбранные товары и считаем общую сумму
  const selectedProducts = Object.entries(selectedItems).map(([type, name]) => 
    game?.items.find(item => item.name === name)
  ).filter(Boolean) as GameItem[];

  const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error || !game) {
    return <div className={styles.error}>{error || 'Игра не найдена'}</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        ← 
      </button>
      <div className={styles.content}>
      <h1 className={styles.title}>{game.title}</h1>
        <div className={styles.imageSection}>
          <div
            className={styles.imageWrapper}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className={styles.imageContainer}>
              <img
                src={`${process.env.PUBLIC_URL}${game.images[currentImageIndex].imageUrl}`}
                alt={game.title}
                className={styles.gameImage}
              />
            </div>
            {game.images.length > 1 && (
              <>
                <button className={styles.prevButton} onClick={prevImage}>❮</button>
                <button className={styles.nextButton} onClick={nextImage}>❯</button>
                <div className={styles.carouselIndicators}>
                  {game.images.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentImageIndex ? styles.indicatorActive : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.infoSection}>
          {/* <h1 className={styles.title}>{game.title}</h1> */}
          <p className={styles.description}>{game.description}</p>
          <div className={styles.items}>
            {Object.entries(groupedItems).map(([type, items]) => (
              <div key={type} className={styles.itemGroup}>
                <h3>{type}</h3>
                <Select
                  value={selectedItems[type] || ''}
                  onChange={(value) => handleItemChange(value, type)}
                  options={items.map(item => ({
                    value: item.name,
                    label: `${item.name} - ${item.price}₽`,
                    price: item.price
                  }))}
                  placeholder={`Выберите ${type}`}
                />
              </div>
            ))}
          </div>
          <div className={styles.instruction}>
            <h2>Инструкция</h2>
            <p className={styles.instructionText}>{game.instruction}</p>
          </div>
          
        </div>
        <div className={styles.buySection}>
          <div className={styles.totalPrice}>
            Итого: {totalPrice}₽
          </div>
          <button
            className={styles.buyButton}
            onClick={() => handleAddToCart(selectedProducts)}
            disabled={selectedProducts.length === 0}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleOrderSubmit}
      />
      <Notification
        message="Товар успешно добавлен в корзину"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}; 