import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Search } from '../Search/Search';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const gameStoreSection = document.getElementById('game-store');
        if (gameStoreSection) {
          gameStoreSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const gameStoreSection = document.getElementById('game-store');
      if (gameStoreSection) {
        gameStoreSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button 
          className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button 
          className={styles.searchBtn}
          onClick={toggleSearch}
          aria-label="Поиск"
        >
          <div className={styles.searchIcon} />
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            onClick={closeMenu}
          >
            Главная
          </Link>
          <a 
            href="#game-store"
            className={styles.navLink}
            onClick={handleCatalogClick}
          >
            Каталог
          </a>
          <Link 
            to="/faq" 
            className={`${styles.navLink} ${location.pathname === '/faq' ? styles.active : ''}`}
            onClick={closeMenu}
          >
            FAQ
          </Link>
        </nav>
      </div>
      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </header>
  );
};

export default Header;