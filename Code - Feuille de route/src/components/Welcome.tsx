import React from 'react';
import { Sparkles, Theater } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className="animate-fade-in">
        <Theater className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
        <h1 className="text-6xl font-bold mb-4 text-yellow-400">
          Mystère au théâtre
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Plongez dans une aventure mystérieuse au cœur d'un théâtre historique.
          Résolvez les énigmes et découvrez les secrets qui s'y cachent.
        </p>
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-700 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Je participe
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
        </button>
      </div>
    </div>
  );
}

export default Welcome;
