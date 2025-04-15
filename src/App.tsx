// src/App.tsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import Hero from './components/Hero/Hero';
import { SuperSellGames } from './components/SuperSellGames/SuperSellGames';
import { GiftCards } from './components/GiftCards/GiftCards';
import { PCGames } from './components/PCGames/PCGames';
import { GameStore } from './components/GameStore/GameStore';
import { ShooterGames } from './components/ShooterGames/ShooterGames';
import { BloodStrike } from './pages/BloodStrike/BloodStrike';
import { Subscriptions } from './components/Subscriptions/Subscriptions';
import { FAQ } from './components/FAQ/FAQ';

function App() {
  return (
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
            <Route path="/game/blood-strike" element={<BloodStrike />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;