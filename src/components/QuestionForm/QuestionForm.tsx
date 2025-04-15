import React, { useState } from 'react';
import InputMask from 'react-input-mask';
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