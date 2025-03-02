import React, { useState, useEffect } from 'react';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Share2, RotateCcw, ArrowUpRight } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  accuracy: number;
  lives: number;
  livesEnabled: boolean;
  colorTheme: keyof typeof colorThemes;
  startGame: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  accuracy,
  lives,
  livesEnabled,
  colorTheme,
  startGame
}) => {
  const { t } = useLanguage();
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Check if this is a new high score
  useEffect(() => {
    const currentMode = window.location.pathname.includes('tracking') 
      ? 'tracking' 
      : window.location.pathname.includes('precision') 
        ? 'precision' 
        : 'gridshot';
        
    const difficulty = localStorage.getItem('difficulty') || 'medium';
    const highScore = localStorage.getItem(`highScore_${currentMode}_${difficulty}`);
    
    if (!highScore || parseInt(highScore) < score) {
      setIsNewHighScore(true);
      // Save new high score
      localStorage.setItem(`highScore_${currentMode}_${difficulty}`, score.toString());
    }
  }, [score]);
  
  // Share score to social media
  const shareScore = (platform: 'twitter' | 'facebook' | 'copy') => {
    const shareText = `I scored ${score} points with ${accuracy}% accuracy in AimTrainer! Try to beat my score at https://donkaim.com`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://donkaim.com')}&quote=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareText);
      // Show copied notification
      const copyButton = document.getElementById('copy-button');
      if (copyButton) {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          if (copyButton) copyButton.textContent = 'Copy';
        }, 2000);
      }
    }
    
    setShowShareOptions(false);
  };
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
      {isNewHighScore && (
        <div className={`text-${colorThemes[colorTheme].primary}-500 text-xl font-bold mb-2 flex items-center animate-pulse`}>
          <Trophy size={24} className="mr-2" /> New High Score!
        </div>
      )}
      
      <h2 className={`text-3xl font-bold mb-4 text-center text-${colorThemes[colorTheme].primary}-500`}>{t('gameover.title')}</h2>
      <div className="text-xl mb-6 bg-gray-900 bg-opacity-70 p-6 rounded-md border border-gray-700">
        <p>{t('gameover.finalscore')} <span className={`font-bold text-${colorThemes[colorTheme].primary}-500`}>{score}</span></p>
        <p>{t('gameover.accuracy')} <span className={`font-bold text-${colorThemes[colorTheme].primary}-300`}>{accuracy}%</span></p>
        <p className="mt-2">
          {livesEnabled && lives <= 0 
            ? t('gameover.nolives')
            : t('gameover.timeout')}
        </p>
      </div>
      
      <div className="flex gap-3 mb-4">
        <button 
          onClick={startGame} 
          className={`game-button bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 text-white text-lg px-8 py-4`}
        >
          <RotateCcw size={20} className="mr-2" /> {t('gameover.playagain')}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="game-button bg-gray-700 hover:bg-gray-600 text-white text-lg px-6 py-4"
          >
            <Share2 size={20} className="mr-2" /> Share
          </button>
          
          {showShareOptions && (
            <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-2 z-20">
              <button 
                onClick={() => shareScore('twitter')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
              >
                Twitter <ArrowUpRight size={14} className="ml-2" />
              </button>
              <button 
                onClick={() => shareScore('facebook')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
              >
                Facebook <ArrowUpRight size={14} className="ml-2" />
              </button>
              <button 
                id="copy-button"
                onClick={() => shareScore('copy')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Performance insights */}
      <div className="bg-gray-800 p-4 rounded-md border border-gray-700 max-w-md">
        <h3 className="font-bold mb-2">Performance Insights</h3>
        <div className="space-y-2 text-sm">
          {accuracy >= 90 ? (
            <p className="text-green-400">Great accuracy! Your precision is excellent.</p>
          ) : accuracy >= 70 ? (
            <p className="text-yellow-400">Good accuracy. Focus on maintaining precision while increasing speed.</p>
          ) : (
            <p className="text-red-400">Try slowing down to improve accuracy. Precision before speed!</p>
          )}
          
          {score > 100 ? (
            <p className="text-green-400">Impressive score! Your speed is excellent.</p>
          ) : score > 50 ? (
            <p className="text-yellow-400">Good score. Keep practicing to improve your reaction time.</p>
          ) : (
            <p className="text-blue-400">Focus on building consistency with daily practice.</p>
          )}
          
          <p className="text-gray-300 mt-2">
            Check out our <a href="/tutorials" className={`text-${colorThemes[colorTheme].primary}-400 hover:underline`}>tutorials</a> for tips on improving your aim!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;