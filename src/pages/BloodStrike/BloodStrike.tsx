import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BloodStrike.module.css';
import Select from '../../components/Select/Select';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import bloodStrikeImage from '../../assets/images/shooters/bloodstrike.jpg';

const globalItems = [
  { value: 'global-1', label: 'Global Pass 1', price: 100 },
  { value: 'global-2', label: 'Global Pass 2', price: 200 },
  { value: 'global-3', label: 'Global Pass 3', price: 300 },
];

const goldItems = [
  { value: 'gold-1', label: '1000 Gold', price: 50 },
  { value: 'gold-2', label: '2000 Gold', price: 100 },
  { value: 'gold-3', label: '3000 Gold', price: 150 },
];

export const BloodStrike: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGlobal, setSelectedGlobal] = useState('');
  const [selectedGold, setSelectedGold] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = useMemo(() => {
    const globalPrice = globalItems.find(item => item.value === selectedGlobal)?.price || 0;
    const goldPrice = goldItems.find(item => item.value === selectedGold)?.price || 0;
    return globalPrice + goldPrice;
  }, [selectedGlobal, selectedGold]);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (data: { name: string; phone: string; telegram: string }) => {
    console.log('Order submitted:', {
      ...data,
      global: selectedGlobal,
      gold: selectedGold,
      totalPrice
    });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blood Strike</h1>
        <p className={styles.subtitle}>Пополнение игр</p>
        <div className={styles.imageWrapper}>
          <img src={bloodStrikeImage} alt="Blood Strike" className={styles.gameImage} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.selects}>
          <div className={styles.selectGroup}>
            <h3 className={styles.selectTitle}>Глобальные предметы</h3>
            <Select
              value={selectedGlobal}
              onChange={setSelectedGlobal}
              options={globalItems}
              placeholder="Выберите глобальный предмет"
            />
          </div>
          <div className={styles.selectGroup}>
            <h3 className={styles.selectTitle}>Золото</h3>
            <Select
              value={selectedGold}
              onChange={setSelectedGold}
              options={goldItems}
              placeholder="Выберите количество золота"
            />
          </div>
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.buyButton}
            onClick={handleBuyClick}
            disabled={!selectedGlobal || !selectedGold}
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