import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import styles from './QuestionForm.module.css';

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    question: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    telegram: '',
    question: ''
  });
  const [chatId, setChatId] = useState<string | null>(null);

  // массив ID администраторов - такой же как в CartPage
  const adminChatIds: string[] = ['522814078', '6684292595'];

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      setChatId(tg.initDataUnsafe.user.id.toString());
      tg.ready?.();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      telegram: '',
      question: ''
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
    
    if (!formData.question.trim()) {
      newErrors.question = 'Введите ваш вопрос';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendFormData();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          resetForm();
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      telegram: '',
      question: ''
    });
  };

  const sendFormData = async () => {
    if (!chatId) {
      console.error('Chat ID не доступен, нельзя отправить сообщение');
      return;
    }

    // 1) Сообщение администратору — полная информация
    const adminMessage =
      `🔔 Заявка на консультацию!\n\n` +
      `👤 Имя: ${formData.name}\n` +
      `📱 Телефон: ${formData.phone}\n` +
      `📨 Telegram: ${formData.telegram}\n\n` +
      `❓ Вопрос:\n${formData.question}`;

    // 2) Сообщение пользователю — подтверждение
    const userMessage =
      `Спасибо за вашу заявку!\n\n` +
      `Мы получили ваш вопрос и скоро свяжемся с вами.\n\n` +
      `📝 Ваш вопрос:\n${formData.question}`;

    try {
      // отправка сообщений администраторам
      await Promise.all(
        adminChatIds.map(id =>
          axios.post(
            `https://celebrity-strike.duckdns.org/api/v1/chat/send-message/${id}`,
            { message: adminMessage }
          )
        )
      );

      // отправка сообщения пользователю
      await axios.post(
        `https://celebrity-strike.duckdns.org/api/v1/chat/send-message/${chatId}`,
        { message: userMessage }
      );
    } catch (err) {
      console.error('Ошибка отправки сообщения:', err);
      throw err;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Задать вопрос</h2>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ваше имя"
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
              required
              placeholder="Номер телефона"
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
              required
              placeholder="@username"
            />
            {errors.telegram && <div className={styles.errorMessage}>{errors.telegram}</div>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="question">Ваш вопрос</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              placeholder="Ваш вопрос"
            />
            {errors.question && <div className={styles.errorMessage}>{errors.question}</div>}
          </div>
          <button type="submit" className={styles.submitButton}>
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