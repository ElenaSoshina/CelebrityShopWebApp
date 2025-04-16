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
      // Если не на главной, переходим на главную и передаём id секции "game-store"
      navigate('/', { state: { scrollTo: 'game-store' } });
    } else {
      // Если уже на главной, выполняем скролл сразу
      const gameStoreSection = document.getElementById('game-store');
      if (gameStoreSection) {
        const headerOffset = 80;
        const elementPosition = gameStoreSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== '/') {
      // Если не на главной, переходим на главную и передаём id секции "faq"
      navigate('/', { state: { scrollTo: 'faq' } });
    } else {
      // Если уже на главной, выполняем скролл сразу
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        const headerOffset = 80;
        const elementPosition = faqSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== '/') {
      navigate('/');
    } else {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const headerOffset = 80;
        const elementPosition = heroSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
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
          {/* Все ссылки ведут на '/' и используют onClick для управления скроллом */}
          <Link to="/" onClick={handleHomeClick}>Главная</Link>
          <Link to="/" onClick={handleCatalogClick}>Каталог</Link>
          <Link to="/" onClick={handleFaqClick}>FAQ</Link>
        </nav>
      </div>
      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </header>
  );
};

export default Header;
