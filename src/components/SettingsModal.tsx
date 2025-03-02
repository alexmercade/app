import React from 'react';
import { Palette, Info } from 'lucide-react';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsModalProps {
  colorTheme: keyof typeof colorThemes;
  setColorTheme: (theme: keyof typeof colorThemes) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  livesEnabled: boolean;
  setLivesEnabled: (enabled: boolean) => void;
  targetCount: number;
  setTargetCount: (count: number) => void;
  targetSizeMultiplier: number;
  setTargetSizeMultiplier: (multiplier: number) => void;
  gameTime: number;
  setGameTime: (time: number) => void;
  setShowSettings: (show: boolean) => void;
  applySettings: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  colorTheme,
  setColorTheme,
  difficulty,
  setDifficulty,
  livesEnabled,
  setLivesEnabled,
  targetCount,
  setTargetCount,
  targetSizeMultiplier,
  setTargetSizeMultiplier,
  gameTime,
  setGameTime,
  setShowSettings,
  applySettings
}) => {
  const { t } = useLanguage();
  
  // Get target size label
  const getTargetSizeLabel = () => {
    if (targetSizeMultiplier <= 0.5) return t('targetSize.verySmall');
    if (targetSizeMultiplier <= 0.75) return t('targetSize.small');
    if (targetSizeMultiplier <= 1.25) return t('targetSize.medium');
    if (targetSizeMultiplier <= 1.75) return t('targetSize.large');
    return t('targetSize.veryLarge');
  };

  // Reset to default settings
  const resetToDefaults = () => {
    setDifficulty('medium');
    setLivesEnabled(false);
    setTargetCount(5);
    setTargetSizeMultiplier(1);
    setGameTime(60);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-md w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold text-${colorThemes[colorTheme].primary}-500`}>{t('settings.title')}</h2>
          <button 
            onClick={resetToDefaults}
            className="text-sm text-gray-400 hover:text-white"
          >
            Reset to Defaults
          </button>
        </div>
        
        {/* Color Theme Selection */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium flex items-center">
            <Palette size={18} className="mr-2" /> {t('settings.theme')}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(colorThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setColorTheme(key as keyof typeof colorThemes)}
                className={`p-2 rounded-md transition-all flex flex-col items-center ${
                  colorTheme === key 
                    ? `bg-${theme.primary}-600 text-white ring-2 ring-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={theme.name}
              >
                <div className={`w-6 h-6 rounded-full bg-${theme.primary}-500 mb-1 border border-gray-600`}></div>
                <span className="text-xs">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-medium">{t('settings.difficulty')}</label>
          <div className="flex gap-2">
            {['easy', 'medium', 'hard'].map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 px-3 rounded-md capitalize transition-all ${
                  difficulty === level 
                    ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t(`difficulty.${level}`)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Lives Toggle */}
        <div className="mb-4">
          <label className="flex items-center justify-between text-gray-300 mb-2 font-medium">
            <span>{t('settings.lives')}</span>
            <button 
              onClick={() => setLivesEnabled(!livesEnabled)}
              className={`px-3 py-1 rounded-md text-sm ${
                livesEnabled 
                  ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {livesEnabled ? t('settings.enabled') : t('settings.disabled')}
            </button>
          </label>
          <p className="text-sm text-gray-400 mb-2">
            {livesEnabled 
              ? t('settings.livesEnabled')
              : t('settings.livesDisabled')}
          </p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-300 font-medium">
              {t('settings.targetCount')} <span className={`text-${colorThemes[colorTheme].primary}-500`}>{targetCount}</span>
            </label>
            <div className="tooltip">
              <Info size={16} className="text-gray-500" />
              <span className="tooltip-text">Number of targets visible at once</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={targetCount}
            onChange={(e) => setTargetCount(parseInt(e.target.value))}
            className={`w-full slider-${colorThemes[colorTheme].primary}`}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>15</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-300 font-medium">
              {t('settings.targetSize')} <span className={`text-${colorThemes[colorTheme].primary}-500`}>{getTargetSizeLabel()}</span>
            </label>
            <div className="tooltip">
              <Info size={16} className="text-gray-500" />
              <span className="tooltip-text">Adjust target size for different challenges</span>
            </div>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.25"
            value={targetSizeMultiplier}
            onChange={(e) => setTargetSizeMultiplier(parseFloat(e.target.value))}
            className={`w-full slider-${colorThemes[colorTheme].primary}`}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{t('settings.small')}</span>
            <span>{t('settings.large')}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">
            {t('settings.gameTime')} <span className={`text-${colorThemes[colorTheme].primary}-500`}>{gameTime} {t('settings.seconds')}</span>
          </label>
          <input
            type="range"
            min="10"
            max="120"
            step="10"
            value={gameTime}
            onChange={(e) => setGameTime(parseInt(e.target.value))}
            className={`w-full slider-${colorThemes[colorTheme].primary}`}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10s</span>
            <span>120s</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowSettings(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-all"
          >
            {t('settings.cancel')}
          </button>
          <button
            onClick={applySettings}
            className={`px-4 py-2 bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 rounded-md transition-all`}
          >
            {t('settings.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;