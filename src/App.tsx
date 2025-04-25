// src/App.tsx - Main application component
import React, {useEffect} from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import Hero from './components/Hero/Hero';
import { GameStore } from './components/GameStore/GameStore';
import { SuperSellGames } from './components/SuperSellGames/SuperSellGames';
import { GiftCards } from './components/GiftCards/GiftCards';
import { PCGames } from './components/PCGames/PCGames';
import { ShooterGames } from './components/ShooterGames/ShooterGames';
import { GamePage } from './pages/GamePage/GamePage';
import { Subscriptions } from './components/Subscriptions/Subscriptions';
import { FAQ } from './components/FAQ/FAQ';
import { CartPage } from './pages/CartPage/CartPage';
import { CartProvider } from './context/CartContext';

function App() {

  // const tg = (window as any).Telegram?.WebApp;
  // tg?.close();

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready?.();
      tg.setSettings?.({ allow_vertical_swipe: false });
      console.log('✅ allow_vertical_swipe set to false');
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <GameStore />
                  <SuperSellGames />
                  <GiftCards />
                  <PCGames />
                  <ShooterGames />
                  <Subscriptions />
                  <FAQ />
                </>
              } />
              <Route path="/game/:name" element={<GamePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;