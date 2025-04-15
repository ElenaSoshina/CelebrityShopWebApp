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

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
    closeMenu();
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
    closeMenu();
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
            onClick={handleHomeClick}
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
            onClick={handleFAQClick}
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