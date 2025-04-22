import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import axios from 'axios';
import styles from './CartPage.module.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      setChatId(tg.initDataUnsafe.user.id);
    } else {
      console.warn('Telegram WebApp API или user.id недоступны');
    }
  }, []);

  const formatCartItems = (items: any[]) => {
    return items.map(item => 
      `🎮 ${item.game}\n` +
      `📦 ${item.name}\n` +
      `🔢 Количество: ${item.quantity}\n` +
      `💰 Цена: ${item.price} ₽\n`
    ).join('\n');
  };

  const handleOrderSubmit = async (data: { name: string; phone: string; telegram: string }) => {
    if (!chatId) {
      console.error('Chat ID не доступен, нельзя отправить сообщение');
      return;
    }

    const message =
        `🛒 Новый заказ!\n\n` +
        `👤 Имя: ${data.name}\n` +
        `📱 Телефон: ${data.phone}\n` +
        `📨 Telegram: ${data.telegram}\n\n` +
        `📝 Заказ:\n\n${formatCartItems(items)}\n` +
        `💵 Итого: ${items.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₽`;

    try {
      await axios.post(
          `https://celebrity-strike.duckdns.org/api/v1/chat/send-message/${chatId}`,
          { message }
      );
      setIsModalOpen(false);
      // закрываем WebApp
      const tg = (window as any).Telegram?.WebApp;
      tg?.close();
    } catch (err) {
      console.error('Ошибка отправки сообщения:', err);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>
        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <h2 className={styles.emptyCartTitle}>Корзина пуста</h2>
            <p className={styles.emptyCartText}>
              В вашей корзине пока нет товаров. Перейдите в каталог, чтобы добавить товары.
            </p>
            <button 
              className={styles.continueButton}
              onClick={() => navigate('/catalog')}
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {items.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.gameName}>{item.game}</h3>
                    <div className={styles.serviceInfo}>
                      <p className={styles.serviceName}>{item.name}</p>
                      <div className={styles.quantityControls}>
                        <button 
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className={styles.itemPrice}>{item.price} ₽</p>
                    </div>
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartSummary}>
              <div className={styles.totalRow}>
                <span>Итого:</span>
                <span className={styles.totalAmount}>{total} ₽</span>
              </div>
              <button 
                className={styles.checkoutButton}
                onClick={() => setIsModalOpen(true)}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}; 