import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BrawlStars.module.css';
import Select from '../../components/Select/Select';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import brawlStarsImage from '../../assets/images/supersell/brawl-stars.jpg';

interface GameItem {
  id: number;
  name: string;
  type: string;
  region: string;
  details: string;
  price: number;
}

interface GameInfo {
  id: number;
  title: string;
  description: string;
  instruction: string;
  imageUrl: string;
}

export const BrawlStars: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<GameItem[]>([]);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, gameInfoResponse] = await Promise.all([
          axios.get<GameItem[]>('https://api.celebritystrike.com/api/games/brawl-stars/items'),
          axios.get<GameInfo>('https://api.celebritystrike.com/api/games/brawl-stars/info')
        ]);
        
        setItems(itemsResponse.data);
        setGameInfo(gameInfoResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemChange = (value: string) => {
    setSelectedItem(value);
  };

  const handleBuyClick = () => {
    if (!selectedItem) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (data: { name: string; phone: string; telegram: string }) => {
    const selectedProduct = items.find(item => item.id === Number(selectedItem));
    console.log('Order submitted:', {
      ...data,
      product: selectedProduct?.name,
      price: selectedProduct?.price
    });
    setIsModalOpen(false);
  };

  const selectedProduct = items.find(item => item.id === Number(selectedItem));

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error || !gameInfo) {
    return <div className={styles.error}>{error || 'Ошибка загрузки данных'}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{gameInfo.title}</h1>
        <div className={styles.imageWrapper}>
          <img src={gameInfo.imageUrl} alt={gameInfo.title} className={styles.gameImage} />
        </div>
        <p className={styles.description}>{gameInfo.description}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.selects}>
          <div className={styles.selectGroup}>
            <h3 className={styles.selectTitle}>Выберите товар</h3>
            <Select
              value={selectedItem}
              onChange={handleItemChange}
              options={items.map(item => ({
                value: String(item.id),
                label: `${item.name} - ${item.price}₽`
              }))}
              placeholder="Выберите товар"
            />
          </div>
        </div>
        <div className={styles.instruction}>
          <h3>Инструкция:</h3>
          <pre className={styles.instructionText}>{gameInfo.instruction}</pre>
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.buyButton}
            onClick={handleBuyClick}
            disabled={!selectedItem}
          >
            Купить {selectedProduct ? `за ${selectedProduct.price}₽` : ''}
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