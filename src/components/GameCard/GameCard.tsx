import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameCard.module.css';

interface GameCardProps {
  id: string;
  name: string;
  image: string;
}

export const GameCard: React.FC<GameCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>
      <h3 className={styles.gameName}>{name}</h3>
    </div>
  );
}; 