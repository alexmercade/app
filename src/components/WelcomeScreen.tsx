import React from 'react';
import { Target, Clock, Zap, Play, Award, ChevronRight } from 'lucide-react';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface WelcomeScreenProps {
  startGame: () => void;
  colorTheme: keyof typeof colorThemes;
  gameTime: number;
  targetCount: number;
  difficulty: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  startGame,
  colorTheme,
  gameTime,
  targetCount,
  difficulty
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-5 rounded-md border border-gray-700 max-w-sm text-center shadow-lg w-full mx-4">
        <div className={`bg-${colorThemes[colorTheme].primary}-600 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center`}>
          <Target className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold mb-2">{t('welcome.title')}</h2>
        <p className="text-gray-300 text-sm mb-4">{t('welcome.description')}</p>
        <button 
          onClick={startGame} 
          className={`game-button bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 text-white text-lg font-bold px-6 py-3 mx-auto w-full`}
        >
          <Play size={18} className="mr-2" /> {t('welcome.start')}
        </button>
        <div className="mt-3 flex justify-center gap-4 text-xs text-gray-400">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" /> {gameTime}{t('welcome.time')}
          </div>
          <div className="flex items-center">
            <Target size={14} className="mr-1" /> {targetCount} {t('welcome.targets')}
          </div>
          <div className="flex items-center">
            <Zap size={14} className="mr-1" /> {t(`difficulty.${difficulty}`)}
          </div>
        </div>
        
        {/* Pro tips section */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <h3 className={`text-${colorThemes[colorTheme].primary}-500 font-medium flex items-center justify-center mb-2 text-sm`}>
            <Award size={14} className="mr-1" /> Pro Tips
          </h3>
          <ul className="text-xs text-gray-300 text-left space-y-1.5">
            <li className="flex items-start">
              <ChevronRight size={12} className={`text-${colorThemes[colorTheme].primary}-500 mt-0.5 mr-1 flex-shrink-0`} />
              <span>Focus on accuracy first, then speed. Consistent precision is key.</span>
            </li>
            <li className="flex items-start">
              <ChevronRight size={12} className={`text-${colorThemes[colorTheme].primary}-500 mt-0.5 mr-1 flex-shrink-0`} />
              <span>Train daily for 15-30 minutes for best results.</span>
            </li>
            <li className="flex items-start">
              <ChevronRight size={12} className={`text-${colorThemes[colorTheme].primary}-500 mt-0.5 mr-1 flex-shrink-0`} />
              <span>Check out our <a href="/tutorials" className={`text-${colorThemes[colorTheme].primary}-400 hover:underline`}>tutorials</a> for more advanced techniques.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;