import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsoleGames: React.FC = () => {
  const navigate = useNavigate();

  const handleGameClick = (id: string) => {
    navigate(`/game/${id}`, { state: { fromSection: 'consolegames' } });
  };

  return (
    <div>
      {/* Render your game components here */}
    </div>
  );
};

export default ConsoleGames; 