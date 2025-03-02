import React, { useState, useEffect, useRef } from 'react';
import { Target } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameModeMenu from '../components/GameModeMenu';
import GameControls from '../components/GameControls';
import GameStats from '../components/GameStats';
import GameOverScreen from '../components/GameOverScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import SettingsModal from '../components/SettingsModal';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface GamePageProps {
  colorTheme: keyof typeof colorThemes;
  setColorTheme: (theme: keyof typeof colorThemes) => void;
}

const GamePage: React.FC<GamePageProps> = ({ colorTheme, setColorTheme }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Default to 60 seconds
  const [targets, setTargets] = useState<{ id: string; x: number; y: number; size: number; status: 'appearing' | 'active' | 'disappearing'; lifetime?: number }[]>([]);
  const [missedClicks, setMissedClicks] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [targetCount, setTargetCount] = useState(5);
  const [gameTime, setGameTime] = useState(60); // Default to 60 seconds
  const [lives, setLives] = useState(Infinity); // Default to infinite lives
  const [livesEnabled, setLivesEnabled] = useState(false); // Default to disabled
  const [targetSizeMultiplier, setTargetSizeMultiplier] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showTutorialTip, setShowTutorialTip] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Track if game has been started at least once
  const [previousMode, setPreviousMode] = useState(''); // Track previous game mode
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const totalClicks = useRef(0);
  const timerRef = useRef<number | null>(null);
  const targetSpawnRef = useRef<number | null>(null);
  const targetLifetimeRef = useRef<number | null>(null);
  const idCounterRef = useRef(0);
  const location = useLocation();

  // Determine current game mode from URL
  const getCurrentGameMode = () => {
    const path = location.pathname;
    if (path.includes('tracking')) return 'tracking';
    if (path.includes('precision')) return 'precision';
    return 'gridshot'; // default
  };

  const currentMode = getCurrentGameMode();

  // Check if game mode has changed
  useEffect(() => {
    const newMode = getCurrentGameMode();
    if (previousMode && previousMode !== newMode) {
      // Mode has changed, reset the game
      resetGame();
    }
    setPreviousMode(newMode);
  }, [location.pathname]);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem(`highScore_${currentMode}_${difficulty}`);
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    } else {
      setHighScore(0);
    }
    
    const savedBestStreak = localStorage.getItem(`bestStreak_${currentMode}_${difficulty}`);
    if (savedBestStreak) {
      setBestStreak(parseInt(savedBestStreak));
    } else {
      setBestStreak(0);
    }
    
    // Show tutorial tip for new users
    const tutorialSeen = localStorage.getItem('tutorialSeen');
    if (!tutorialSeen) {
      setShowTutorialTip(true);
      localStorage.setItem('tutorialSeen', 'true');
    }
  }, [currentMode, difficulty]);

  // Generate a unique ID
  const generateUniqueId = () => {
    idCounterRef.current += 1;
    return `target-${Date.now()}-${idCounterRef.current}`;
  };

  // Reset game state
  const resetGame = () => {
    setScore(0);
    setTimeLeft(gameTime);
    setTargets([]);
    setMissedClicks(0);
    setAccuracy(100);
    setLives(livesEnabled ? 3 : Infinity);
    setIsGameOver(false);
    setStreakCount(0);
    setGameStarted(false);
    totalClicks.current = 0;
    
    // Clear all intervals
    clearAllIntervals();
  };

  // Clear all game intervals
  const clearAllIntervals = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (targetSpawnRef.current) {
      clearInterval(targetSpawnRef.current);
      targetSpawnRef.current = null;
    }
    
    if (targetLifetimeRef.current) {
      clearInterval(targetLifetimeRef.current);
      targetLifetimeRef.current = null;
    }
  };

  // Start the game
  const startGame = () => {
    resetGame();
    setIsPlaying(true);
    setGameStarted(true);
    setShowTutorialTip(false);
    
    // Start the timer
    startTimer();
    
    // Start spawning targets
    spawnInitialTargets();
  };

  // Start the game timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          gameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Spawn initial targets
  const spawnInitialTargets = () => {
    let count = 0;
    const initialSpawn = setInterval(() => {
      if (count < targetCount && isPlaying) {
        generateTarget();
        count++;
      } else {
        clearInterval(initialSpawn);
      }
    }, 800); // Spawn a new target every 800ms to give time for animations
    
    // Store reference to clear on cleanup
    targetSpawnRef.current = initialSpawn;
  };

  // Pause the game
  const pauseGame = () => {
    setIsPlaying(false);
    
    // Clear all intervals to stop game logic
    clearAllIntervals();
  };

  // Game over
  const gameOver = () => {
    pauseGame();
    setTimeLeft(0);
    setIsGameOver(true);
    
    // Update high score if current score is higher
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`highScore_${currentMode}_${difficulty}`, score.toString());
    }
    
    // Update best streak if current streak is higher
    if (streakCount > bestStreak) {
      setBestStreak(streakCount);
      localStorage.setItem(`bestStreak_${currentMode}_${difficulty}`, streakCount.toString());
    }
  };

  // Apply settings
  const applySettings = () => {
    resetGame();
    setShowSettings(false);
    setTimeLeft(gameTime);
  };

  // Get target size based on difficulty and game mode
  const getTargetSize = () => {
    let baseSize;
    
    // Adjust base size based on game mode
    if (currentMode === 'precision') {
      // Smaller targets for precision mode
      switch (difficulty) {
        case 'easy': 
          baseSize = Math.floor(Math.random() * 15) + 30; // 30-45px
          break;
        case 'medium': 
          baseSize = Math.floor(Math.random() * 10) + 20; // 20-30px
          break;
        case 'hard': 
          baseSize = Math.floor(Math.random() * 8) + 12; // 12-20px
          break;
        default: 
          baseSize = 25;
      }
    } else {
      // Regular sizes for other modes
      switch (difficulty) {
        case 'easy': 
          baseSize = Math.floor(Math.random() * 20) + 40; // 40-60px
          break;
        case 'medium': 
          baseSize = Math.floor(Math.random() * 15) + 30; // 30-45px
          break;
        case 'hard': 
          baseSize = Math.floor(Math.random() * 10) + 20; // 20-30px
          break;
        default: 
          baseSize = 40;
      }
    }
    
    // Apply the size multiplier
    return Math.round(baseSize * targetSizeMultiplier);
  };

  // Get target lifetime based on difficulty
  const getTargetLifetime = () => {
    switch (difficulty) {
      case 'easy': return 5000; // 5 seconds
      case 'medium': return 4000; // 4 seconds
      case 'hard': return 3000; // 3 seconds
      default: return 4000;
    }
  };

  // Generate a new target
  const generateTarget = () => {
    // Don't generate targets if the game is not playing or is over
    if (!isPlaying || isGameOver || !gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current;
    const size = getTargetSize();
    // Reserve space for the stats panel at the top (80px)
    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size - 80;
    
    const newTarget = {
      id: generateUniqueId(),
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY) + 80, // Add offset for stats panel
      size,
      status: 'appearing' as const,
      lifetime: getTargetLifetime()
    };
    
    setTargets(prev => [...prev, newTarget]);
    
    // Change status to active after animation completes
    setTimeout(() => {
      // Only update if the game is still playing
      if (isPlaying) {
        setTargets(prev => 
          prev.map(target => 
            target.id === newTarget.id 
              ? { ...target, status: 'active' as const } 
              : target
          )
        );
      }
    }, 300); // Match the animation duration in CSS
  };

  // Handle target click
  const handleTargetClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Don't process clicks if game is over or not playing
    if (isGameOver || !isPlaying) return;
    
    // Start disappearing animation
    setTargets(prev => 
      prev.map(target => 
        target.id === id 
          ? { ...target, status: 'disappearing' as const } 
          : target
      )
    );
    
    // Remove target after animation completes and update score
    setTimeout(() => {
      // Only update if the game is still playing
      if (isPlaying) {
        setTargets(prev => prev.filter(target => target.id !== id));
        setScore(prev => prev + 1);
        setStreakCount(prev => prev + 1);
        totalClicks.current += 1;
        updateAccuracy();
        
        // Generate a new target
        setTimeout(() => {
          if (isPlaying) {
            generateTarget();
          }
        }, 200);
      }
    }, 300); // Match the animation duration in CSS
  };

  // Handle missed click
  const handleMissedClick = () => {
    if (!isPlaying || isGameOver) return;
    
    setMissedClicks(prev => prev + 1);
    totalClicks.current += 1;
    updateAccuracy();
    setStreakCount(0); // Reset streak on miss
    
    // Lose a life when missing a click (only if lives are enabled)
    if (livesEnabled) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          gameOver();
        }
        return newLives;
      });
    }
  };

  // Update accuracy
  const updateAccuracy = () => {
    if (totalClicks.current === 0) return;
    const newAccuracy = Math.round((score / totalClicks.current) * 100);
    setAccuracy(newAccuracy);
  };

  // Target lifetime effect - remove targets that have been on screen too long
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      // Clear any existing interval
      if (targetLifetimeRef.current) {
        clearInterval(targetLifetimeRef.current);
      }
      
      targetLifetimeRef.current = window.setInterval(() => {
        // Only process if the game is still playing
        if (!isPlaying) return;
        
        setTargets(prev => {
          const expiredTargets = prev.filter(target => 
            target.status === 'active' && 
            target.lifetime && 
            Date.now() - parseInt(target.id.split('-')[1]) > target.lifetime
          );
          
          if (expiredTargets.length > 0 && livesEnabled) {
            // Lose a life for each expired target (only if lives are enabled)
            setLives(lives => {
              const newLives = lives - expiredTargets.length;
              if (newLives <= 0) {
                gameOver();
                return 0;
              }
              return newLives;
            });
            
            // Reset streak when target expires
            setStreakCount(0);
            
            // Remove expired targets
            return prev.filter(target => 
              !(target.status === 'active' && 
                target.lifetime && 
                Date.now() - parseInt(target.id.split('-')[1]) > target.lifetime)
            );
          } else if (expiredTargets.length > 0) {
            // Just remove expired targets if lives are disabled
            return prev.filter(target => 
              !(target.status === 'active' && 
                target.lifetime && 
                Date.now() - parseInt(target.id.split('-')[1]) > target.lifetime)
            );
          }
          
          return prev;
        });
      }, 100);
    } else if (!isPlaying && targetLifetimeRef.current) {
      // Clear interval when not playing
      clearInterval(targetLifetimeRef.current);
      targetLifetimeRef.current = null;
    }
    
    return () => {
      if (targetLifetimeRef.current) {
        clearInterval(targetLifetimeRef.current);
        targetLifetimeRef.current = null;
      }
    };
  }, [isPlaying, isGameOver, livesEnabled]);

  // Effect to pause game when showing mode menu
  useEffect(() => {
    if (showModeMenu && isPlaying) {
      pauseGame();
    }
  }, [showModeMenu]);

  // Effect to pause game when showing settings
  useEffect(() => {
    if (showSettings && isPlaying) {
      pauseGame();
    }
  }, [showSettings]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, []);

  // Get CSS class for target based on status
  const getTargetClass = (status: 'appearing' | 'active' | 'disappearing') => {
    switch (status) {
      case 'appearing': return 'target-appear';
      case 'active': return 'target-pulse';
      case 'disappearing': return 'target-disappear';
      default: return '';
    }
  };

  // Get page title based on current mode
  const getPageTitle = () => {
    switch (currentMode) {
      case 'tracking': return 'Tracking Aim Trainer | Follow Moving Targets';
      case 'precision': return 'Precision Aim Trainer | Improve Accuracy';
      default: return 'GridShot Aim Trainer | Improve Your FPS Skills';
    }
  };

  // Get page description based on current mode
  const getPageDescription = () => {
    switch (currentMode) {
      case 'tracking': 
        return 'Improve your tracking aim for FPS games like Apex Legends and Overwatch. Practice following moving targets with our free online aim trainer.';
      case 'precision': 
        return 'Enhance your precision and accuracy for headshots in games like CS2 and Valorant. Train with our free online precision aim trainer.';
      default: 
        return 'Free online aim trainer to improve your reflexes and accuracy for FPS games like CS2, Valorant, and Fortnite. Practice with customizable targets.';
    }
  };

  // Determine if we should show the welcome screen
  const shouldShowWelcomeScreen = () => {
    return !isPlaying && timeLeft > 0 && !gameStarted && targets.length === 0;
  };

  // Determine if we should show the pause overlay
  const shouldShowPauseOverlay = () => {
    return !isPlaying && timeLeft > 0 && gameStarted && !isGameOver;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={`aim trainer, ${currentMode} aim, fps training, mouse accuracy, aim practice, cs2, valorant, fortnite, fps games, free aim trainer`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://donkaim.com/${currentMode === 'gridshot' ? '' : currentMode}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://donkaim.com/${currentMode === 'gridshot' ? '' : currentMode}`} />
        <meta property="twitter:title" content={getPageTitle()} />
        <meta property="twitter:description" content={getPageDescription()} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://donkaim.com/${currentMode === 'gridshot' ? '' : currentMode}`} />
      </Helmet>
      
      <Header 
        title="Aim Trainer" 
        subtitle="Train your aim for CS2, Valorant and Fortnite"
        colorTheme={colorTheme}
        icon={<Target className="text-white" size={24} />}
        showModeMenu={showModeMenu}
        setShowModeMenu={setShowModeMenu}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      
      {/* Game modes menu */}
      {showModeMenu && (
        <GameModeMenu 
          currentMode={currentMode} 
          colorTheme={colorTheme} 
          setShowModeMenu={setShowModeMenu}
          pauseGame={pauseGame}
          isPlaying={isPlaying}
        />
      )}
      
      <div className="container mx-auto flex-1 flex flex-col p-4">
        {/* Game controls with lives */}
        <GameControls 
          isPlaying={isPlaying}
          startGame={startGame}
          pauseGame={pauseGame}
          resetGame={resetGame}
          livesEnabled={livesEnabled}
          lives={lives}
          colorTheme={colorTheme}
        />
        
        {/* High score display */}
        <div className="flex justify-between mb-2">
          <div className="text-sm text-gray-400">
            High Score: <span className={`text-${colorThemes[colorTheme].primary}-500 font-bold`}>{highScore}</span>
          </div>
          <div className="text-sm text-gray-400">
            Best Streak: <span className={`text-${colorThemes[colorTheme].primary}-500 font-bold`}>{bestStreak}</span>
          </div>
        </div>
        
        {/* Game area */}
        <div 
          ref={gameAreaRef}
          onClick={handleMissedClick}
          className={`flex-1 bg-gray-800 rounded-md relative overflow-hidden ${isGameOver ? 'cursor-default' : 'cursor-crosshair'} border border-gray-700`}
        >
          {/* Stats panel inside game area */}
          <GameStats 
            score={score}
            timeLeft={timeLeft}
            accuracy={accuracy}
            difficulty={difficulty}
            colorTheme={colorTheme}
          />
          
          {isGameOver && (
            <GameOverScreen 
              score={score}
              accuracy={accuracy}
              lives={lives}
              livesEnabled={livesEnabled}
              colorTheme={colorTheme}
              startGame={startGame}
            />
          )}
          
          {/* Current streak indicator */}
          {isPlaying && streakCount > 2 && (
            <div className={`absolute top-[90px] right-4 bg-${colorThemes[colorTheme].primary}-600 px-3 py-1 rounded-md text-white font-bold z-10 animate-pulse`}>
              Streak: {streakCount}
            </div>
          )}
          
          {targets.map(target => (
            <div
              key={target.id}
              onClick={(e) => handleTargetClick(target.id, e)}
              className={`absolute rounded-full bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 transition-colors ${getTargetClass(target.status)}`}
              style={{
                left: `${target.x}px`,
                top: `${target.y}px`,
                width: `${target.size}px`,
                height: `${target.size}px`,
              }}
            />
          ))}
          
          {/* Welcome screen - only show if game has never been started */}
          {shouldShowWelcomeScreen() && (
            <WelcomeScreen 
              startGame={startGame}
              colorTheme={colorTheme}
              gameTime={gameTime}
              targetCount={targetCount}
              difficulty={difficulty}
            />
          )}
          
          {/* Tutorial tip */}
          {showTutorialTip && !isPlaying && !showSettings && (
            <div className="absolute bottom-4 right-4 bg-gray-800 p-4 rounded-md border border-gray-700 max-w-xs shadow-lg z-20">
              <h3 className={`text-${colorThemes[colorTheme].primary}-500 font-bold mb-2`}>Pro Tip</h3>
              <p className="text-gray-300 text-sm mb-2">Check out our tutorials section to learn advanced aiming techniques and training routines!</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => window.location.href = '/tutorials'}
                  className={`px-3 py-1 bg-${colorThemes[colorTheme].primary}-600 rounded-md text-sm`}
                >
                  View Tutorials
                </button>
                <button 
                  onClick={() => setShowTutorialTip(false)}
                  className="px-3 py-1 bg-gray-700 rounded-md text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
          
          {/* Pause overlay - only show if game has been started and is now paused */}
          {shouldShowPauseOverlay() && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-gray-800 p-4 rounded-md border border-gray-700 text-center">
                <h3 className="text-xl font-bold mb-2">Game Paused</h3>
                <p className="text-gray-300 mb-3">Click Resume to continue playing</p>
                <button 
                  onClick={startGame} 
                  className={`px-4 py-2 bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 rounded-md transition-all`}
                >
                  Resume Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Settings modal */}
      {showSettings && (
        <SettingsModal 
          colorTheme={colorTheme}
          setColorTheme={setColorTheme}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          livesEnabled={livesEnabled}
          setLivesEnabled={setLivesEnabled}
          targetCount={targetCount}
          setTargetCount={setTargetCount}
          targetSizeMultiplier={targetSizeMultiplier}
          setTargetSizeMultiplier={setTargetSizeMultiplier}
          gameTime={gameTime}
          setGameTime={setGameTime}
          setShowSettings={setShowSettings}
          applySettings={applySettings}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default GamePage;