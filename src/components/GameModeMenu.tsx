import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gameModes, colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface GameModeMenuProps {
  currentMode: string;
  colorTheme: keyof typeof colorThemes;
  setShowModeMenu: (show: boolean) => void;
  pauseGame?: () => void;
  isPlaying?: boolean;
}

const GameModeMenu: React.FC<GameModeMenuProps> = ({ 
  currentMode, 
  colorTheme, 
  setShowModeMenu,
  pauseGame,
  isPlaying
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleModeChange = (key: string) => {
    // If game is currently playing, pause it before navigation
    if (isPlaying && pauseGame) {
      pauseGame();
    }
    
    // Navigate to the selected mode
    navigate(`/${key === 'gridshot' ? '' : key}`);
    setShowModeMenu(false);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 animate-slide-in-left">
      <div className="container mx-auto py-3 px-4">
        <div className="flex flex-wrap gap-3">
          {Object.entries(gameModes).map(([key, mode]) => {
            const Icon = mode.icon;
            return (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  currentMode === key 
                    ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon size={18} />
                <div className="text-left">
                  <div className="font-medium">{t(`modes.${key}`)}</div>
                  <div className="text-xs opacity-80">{t(`modes.${key}.description`)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameModeMenu;