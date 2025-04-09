import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import Select from '../Select/Select';
import { OrderModal } from '../OrderModal/OrderModal';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  discount?: number;
  platforms: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  discount,
  platforms
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedPlatforms = platforms.map(platform => ({
    value: platform,
    label: platform
  }));

  const discountedPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (data: { name: string; phone: string; telegram: string }) => {
    console.log('Order submitted:', {
      ...data,
      product: name,
      platform: selectedPlatform,
      price: discountedPrice
    });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
        {discount && <span className={styles.discountLabel}>-{discount}%</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <Select
          value={selectedPlatform}
          onChange={setSelectedPlatform}
          options={formattedPlatforms}
          placeholder="Выберите платформу"
        />
        <div className={styles.priceWrapper}>
          {discount && <span className={styles.oldPrice}>{price} ₽</span>}
          <span className={styles.price}>{discountedPrice} ₽</span>
        </div>
        <button 
          className={styles.buyButton}
          onClick={handleBuyClick}
          disabled={!selectedPlatform}
        >
          Купить
        </button>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}; 