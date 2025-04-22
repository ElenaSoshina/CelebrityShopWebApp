import React, { useEffect } from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        {message}
      </div>
    </div>
  );
}; 