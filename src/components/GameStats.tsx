import React from 'react';
import { Trophy, Clock, Crosshair, Zap } from 'lucide-react';
import StatCard from './StatCard';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface GameStatsProps {
  score: number;
  timeLeft: number;
  accuracy: number;
  difficulty: string;
  colorTheme: keyof typeof colorThemes;
}

const GameStats: React.FC<GameStatsProps> = ({
  score,
  timeLeft,
  accuracy,
  difficulty,
  colorTheme
}) => {
  const { t } = useLanguage();
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return `text-${colorThemes[colorTheme].primary}-300`;
      case 'medium': return `text-${colorThemes[colorTheme].primary}-500`;
      case 'hard': return `text-${colorThemes[colorTheme].primary}-600`;
      default: return `text-${colorThemes[colorTheme].primary}-500`;
    }
  };

  // Translate difficulty
  const getTranslatedDifficulty = () => {
    return t(`difficulty.${difficulty}`);
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-[80px] bg-gray-900/80 backdrop-blur-sm z-[5] flex items-center justify-center px-4 border-b border-gray-700">
      <div className="flex flex-wrap justify-between w-full gap-2">
        <StatCard 
          icon={Trophy} 
          label={t('stats.score')} 
          value={score} 
          colorTheme={colorTheme} 
          size="small"
        />
        
        <StatCard 
          icon={Clock} 
          label={t('stats.time')} 
          value={`${timeLeft}s`} 
          colorTheme={colorTheme} 
          size="small"
        />
        
        <StatCard 
          icon={Crosshair} 
          label={t('stats.accuracy')} 
          value={`${accuracy}%`} 
          colorTheme={colorTheme} 
          size="small"
        />
        
        <div className="stat-card bg-gray-800 border border-gray-700 stat-card-small">
          <div className={`stat-icon bg-${colorThemes[colorTheme].primary}-600 stat-icon-small`}>
            <Zap size={16} />
          </div>
          <div className="stat-content">
            <p className="stat-label">{t('stats.difficulty')}</p>
            <p className={`stat-value capitalize ${getDifficultyColor()}`}>{getTranslatedDifficulty()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;