import React from 'react';
import { Play, Pause, RotateCcw, Heart } from 'lucide-react';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface GameControlsProps {
  isPlaying: boolean;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  livesEnabled: boolean;
  lives: number;
  colorTheme: keyof typeof colorThemes;
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  startGame,
  pauseGame,
  resetGame,
  livesEnabled,
  lives,
  colorTheme
}) => {
  const { t } = useLanguage();
  
  // Render lives as hearts
  const renderLives = () => {
    if (!livesEnabled) {
      return null; // Don't render anything if lives are disabled
    }
    
    return Array(3).fill(0).map((_, index) => (
      <Heart 
        key={index} 
        className={`w-6 h-6 ${index < lives ? `text-${colorThemes[colorTheme].primary}-500 fill-${colorThemes[colorTheme].primary}-500` : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="flex justify-center mb-4 gap-3 items-center">
      {!isPlaying ? (
        <button 
          onClick={startGame} 
          className={`game-button bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 text-white`}
        >
          <Play size={18} className="mr-2" /> {t('controls.start')}
        </button>
      ) : (
        <button 
          onClick={pauseGame} 
          className={`game-button bg-${colorThemes[colorTheme].primary}-500 hover:bg-${colorThemes[colorTheme].primary}-600 text-white`}
        >
          <Pause size={18} className="mr-2" /> {t('controls.pause')}
        </button>
      )}
      <button 
        onClick={resetGame} 
        className="game-button bg-gray-600 hover:bg-gray-700 text-white"
      >
        <RotateCcw size={18} className="mr-2" /> {t('controls.reset')}
      </button>
      
      {/* Lives display - only show if lives are enabled */}
      {livesEnabled && (
        <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2 border border-gray-700">
          <span className="text-gray-300 mr-1 font-medium">{t('controls.lives')}</span>
          {renderLives()}
        </div>
      )}
    </div>
  );
};

export default GameControls;