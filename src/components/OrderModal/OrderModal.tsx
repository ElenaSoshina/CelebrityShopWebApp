import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './OrderModal.module.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; telegram: string }) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    telegram: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      telegram: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    const phoneNumber = formData.phone.replace(/\D/g, '');
    if (!phoneNumber) {
      newErrors.phone = 'Введите номер телефона';
    } else if (phoneNumber.length !== 11) {
      newErrors.phone = 'Номер телефона должен содержать 11 цифр';
    }
    
    if (!formData.telegram.trim()) {
      newErrors.telegram = 'Заполните username';
    } else if (!formData.telegram.startsWith('@')) {
      newErrors.telegram = 'Username должен начинаться с @';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Отправка формы:', formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Оформление заказа</h2>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              required
            />
            {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Телефон</label>
            <InputMask
              mask="+7 (999) 999-99-99"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Введите ваш телефон"
              required
            />
            {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="telegram">Telegram</label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="Введите ваш Telegram"
              required
            />
            {errors.telegram && <div className={styles.errorMessage}>{errors.telegram}</div>}
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
          >
            Отправить
          </button>
        </form>
        {showSuccess && (
          <div className={styles.successPopup}>
            Ваша заявка успешно отправлена
          </div>
        )}
      </div>
    </div>
  );
}; 