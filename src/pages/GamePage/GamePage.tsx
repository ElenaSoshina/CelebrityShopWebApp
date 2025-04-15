import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './GamePage.module.css';
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

// Моковые данные для тестирования
const mockGameInfo: GameInfo = {
  id: 1,
  title: "Brawl Stars",
  description: "Brawl Stars — это популярная игра в жанрах шутер и MOBA, соединившая в себе лучшие стороны хитов League of Legends и Overwatch.",
  instruction: "1) Выберите необходимое количество гемов или акцию для Brawl Stars\n2) Затем введите почту вашего аккаунта Supercell\n3) После этого проверяем все данные, чтобы нигде не было ошибок\n4) Оплачиваем товар\n5) После этого скидываете код от SuperCell\n6) Подождите 5-15 минут и получите свой донат в игру!",
  imageUrl: brawlStarsImage
};

const mockItems: GameItem[] = [
  {
    id: 1,
    name: "PRO PASS (Кубок Brawl)",
    type: "Brawl Pass",
    region: "Global",
    details: "Премиум боевой пропуск",
    price: 2499
  },
  {
    id: 2,
    name: "Brawl Pass +Plus",
    type: "Brawl Pass",
    region: "Global",
    details: "Расширенный боевой пропуск",
    price: 999
  },
  {
    id: 10,
    name: "950 гемов",
    type: "Гемы",
    region: "Global",
    details: "Огромный набор гемов",
    price: 4990
  },
  {
    id: 11,
    name: "2000 гемов",
    type: "Гемы",
    region: "Global",
    details: "Максимальный набор гемов",
    price: 9590
  }
];

export const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<GameItem[]>(mockItems);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(mockGameInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Закомментированный запрос к API
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, gameInfoResponse] = await Promise.all([
          axios.get<GameItem[]>(`https://api.celebritystrike.com/api/games/${gameId}/items`),
          axios.get<GameInfo>(`https://api.celebritystrike.com/api/games/${gameId}/info`)
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
    const selectedProducts = Object.entries(selectedItems).map(([type, id]) => 
      items.find(item => item.id === Number(id))
    ).filter(Boolean);

    console.log('Order submitted:', {
      ...data,
      products: selectedProducts,
      totalPrice: selectedProducts.reduce((sum, item) => sum + (item?.price || 0), 0)
    });
    setIsModalOpen(false);
  };

  // Группируем товары по типу
  const groupedItems = items.reduce<Record<string, GameItem[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  // Получаем выбранные товары и считаем общую сумму
  const selectedProducts = Object.entries(selectedItems).map(([type, id]) => 
    items.find(item => item.id === Number(id))
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
        <div className={styles.imageWrapper}>
          <img src={gameInfo.imageUrl} alt={gameInfo.title} className={styles.gameImage} />
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
                  value: String(item.id),
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