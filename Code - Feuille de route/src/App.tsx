import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Game from './components/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black text-white">
      {!gameStarted ? (
        <Welcome onStart={() => setGameStarted(true)} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;