import React from 'react';
import Hero from '../../components/Hero/Hero';
import { GameStore } from '../../components/GameStore/GameStore';
import { SuperSellGames } from '../../components/SuperSellGames/SuperSellGames';
import { GiftCards } from '../../components/GiftCards/GiftCards';
import { PCGames } from '../../components/PCGames/PCGames';
import { ShooterGames } from '../../components/ShooterGames/ShooterGames';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <GameStore />
      <SuperSellGames />
      <GiftCards />
      <PCGames />
      <ShooterGames />
    </>
  );
};

export default Home; 