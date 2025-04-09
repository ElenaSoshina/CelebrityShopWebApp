import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const allGames = [
  // SuperSell games
  { name: 'Brawl Stars', section: 'SuperSell' },
  { name: 'Clash Royale', section: 'SuperSell' },
  { name: 'Clash of Clans', section: 'SuperSell' },
  { name: 'Hay Day', section: 'SuperSell' },
  { name: 'Boom Beach', section: 'SuperSell' },
  
  // PC games
  { name: 'Marvel Rivals', section: 'PC' },
  { name: 'Delta Force', section: 'PC' },
  { name: 'Arena Breakout: Infinite', section: 'PC' },
  { name: 'PUBG Battleground', section: 'PC' },

  // Game Shop
  { name: 'Roblox', section: 'Game Shop' },
  { name: 'Minecraft', section: 'Game Shop' },
  { name: 'GTA V', section: 'Game Shop' },
  { name: 'CS GO', section: 'Game Shop' }
];

export const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allGames>([]);
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

  return (
    <div className={`${styles.searchContainer} ${isOpen ? styles.active : ''}`} ref={searchRef}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Поиск игр..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          {searchResults.map((game, index) => (
            <div key={index} className={styles.searchItem}>
              <span className={styles.gameName}>{game.name}</span>
              <span className={styles.gameSection}>{game.section}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 