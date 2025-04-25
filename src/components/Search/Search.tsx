import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameItem {
  id: string;
  name: string;
  section: string;
  sectionId: string;
}

const allGames: GameItem[] = [
  // SuperSell games
  { id: 'brawl_stars', name: 'Brawl Stars', section: 'SuperSell', sectionId: 'supersell' },
  { id: 'clash_royale', name: 'Clash Royale', section: 'SuperSell', sectionId: 'supersell' },
  { id: 'clash_of_clans', name: 'Clash of Clans', section: 'SuperSell', sectionId: 'supersell' },
  { id: 'squad_buster', name: 'Squad Busters', section: 'SuperSell', sectionId: 'supersell' },
  { id: 'mo_co', name: 'Mo-Co', section: 'SuperSell', sectionId: 'supersell' },
  
  // PC games
  { id: 'marvel_rivals', name: 'Marvel Rivals', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'delta_force', name: 'Delta Force', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'arena_breakout', name: 'Arena Breakout: Infinite', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'pubg_battlegrounds', name: 'PUBG Battlegrounds', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'fortnite', name: 'Fortnite', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'valorant', name: 'Valorant', section: 'Компьютерные игры', sectionId: 'pcgames' },
  { id: 'roblox', name: 'Roblox', section: 'Компьютерные игры', sectionId: 'pcgames' },

  // Shooter games
  { id: 'blood_strike', name: 'Blood Strike', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'pubg_mobile', name: 'PUBG MOBILE', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'pubg_new_state', name: 'PUBG NEW STATE', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'free_fire', name: 'Free Fire', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'lost_light', name: 'Lost Light', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'arena_breakout_shooter', name: 'Arena Breakout', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'standoff2', name: 'Standoff 2', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 't3_arena', name: 'T3 Arena', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'mobile_legends', name: 'Mobile Legends RU', section: 'Шутеры, стратегии', sectionId: 'shooters' },
  { id: 'genshin_impact', name: 'Genshin Impact', section: 'Шутеры, стратегии', sectionId: 'shooters' },

  // Subscriptions
  { id: 'telegram', name: 'Telegram', section: 'Подписки', sectionId: 'subscriptions' },
  { id: 'likee', name: 'LIKE', section: 'Подписки', sectionId: 'subscriptions' },
  { id: 'steam', name: 'Steam', section: 'Подписки', sectionId: 'subscriptions' },

  // Gift Cards
  { id: 'apple_store', name: 'Apple Store/iTunes', section: 'Подарочные карты', sectionId: 'giftcards' }
];

export const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GameItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredGames = allGames.filter(game =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredGames);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGameClick = (game: GameItem) => {
    navigate(`/game/${game.id}`, { state: { fromSection: game.sectionId } });
    setSearchQuery('');
    onClose();
  };

  return (
    <div className={`${styles.searchContainer} ${isOpen ? styles.active : ''}`} ref={searchRef}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Поиск игр..."
        value={searchQuery}
        onChange={handleSearch}
        autoFocus={isOpen}
      />
      {searchQuery.trim() !== '' && (
        <div className={styles.searchResults}>
          {searchResults.length > 0 ? (
            searchResults.map((game, index) => (
              <div 
                key={index} 
                className={styles.searchItem}
                onClick={() => handleGameClick(game)}
              >
                <span className={styles.gameName}>{game.name}</span>
                <span className={styles.gameSection}>{game.section}</span>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <span>Ничего не найдено</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 