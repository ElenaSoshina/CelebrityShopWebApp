import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import axios from 'axios';
import styles from './CartPage.module.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  // Calculate raw total
  const rawTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Apply discount if any
  const discountedTotal = Math.round(rawTotal * (1 - discountPercent / 100));

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      setChatId(tg.initDataUnsafe.user.id.toString());
      tg.ready?.();
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

  const handlePromoApply = () => {
    if (promoCode.trim().toLowerCase() === 'firstorder') {
      setDiscountPercent(3);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setDiscountPercent(0);
      setPromoApplied(false);
      setPromoError('Неверный промокод');
    }
  };

  const handleOrderSubmit = async (data: { name: string; phone: string; telegram: string }) => {
    if (!chatId) {
      console.error('Chat ID не доступен, нельзя отправить сообщение');
      return;
    }

    const adminChatId = '522814078';
    const totalToSend = discountedTotal;

    // 1) Сообщение администратору — полная информация
    const adminMessage =
      `🛒 Новый заказ!\n\n` +
      `👤 Имя: ${data.name}\n` +
      `📱 Телефон: ${data.phone}\n` +
      `📨 Telegram: ${data.telegram}\n\n` +
      `📝 Заказ:\n${formatCartItems(items)}\n` +
      (promoApplied ? `🎟 Промокод: ${promoCode} (скидка ${discountPercent}%)\n` : '') +
      `💵 Итого: ${totalToSend} ₽`;

    // 2) Сообщение пользователю — только корзина
    const userMessage =
      `Спасибо за заказ! Вот ваш заказ:\n\n` +
      `${formatCartItems(items)}\n` +
      (promoApplied ? `🎟 Промокод: ${promoCode} (скидка ${discountPercent}%)\n` : '') +
      `💵 Итого: ${totalToSend} ₽`;

    try {
      await axios.post(
          `https://celebrity-strike.duckdns.org/api/v1/chat/send-message/${adminChatId}`,
          { message: adminMessage }
      );

      await axios.post(
          `https://celebrity-strike.duckdns.org/api/v1/chat/send-message/${chatId}`,
          { message: userMessage }
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

            <div className={styles.promoSection}>
              <div className={styles.promoInputWrapper}>
                <input
                  type="text"
                  placeholder="Введите промокод"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className={styles.promoInput}
                />
                <button
                  className={styles.promoButton}
                  onClick={handlePromoApply}
                >
                  <ArrowForwardIosIcon />
                </button>
              </div>
              {promoApplied && (
                <div className={styles.promoInfo}>
                  Применена скидка {discountPercent}%
                </div>
              )}
              {promoError && (
                <div className={styles.promoError}>
                  {promoError}
                </div>
              )}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.totalRow}>
                <span>Итого{promoApplied ? ' (со скидкой)' : ''}:</span>
                <span className={styles.totalAmount}>{discountedTotal} ₽</span>
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