import React, { createContext, useContext, ReactNode } from 'react';

// Define translations interface
export interface Translations {
  [key: string]: string;
}

// Language context interface
interface LanguageContextType {
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  t: () => '',
});

// Translations object
export const translations: Translations = {
  // Header
  'app.title': 'Aim Trainer',
  'app.subtitle': 'Train your aim for CS2, Valorant and Fortnite',
  'tutorials.title': 'Aim Tutorials',
  'tutorials.subtitle': 'Guides and exercises to improve your aim',
  'sensitivity.title': 'Sens Converter',
  'sensitivity.subtitle': 'Convert your sensitivity between FPS games',

  // Game controls
  'controls.start': 'Start',
  'controls.pause': 'Pause',
  'controls.reset': 'Reset',
  'controls.lives': 'Lives:',

  // Game stats
  'stats.score': 'Score',
  'stats.time': 'Time',
  'stats.accuracy': 'Accuracy',
  'stats.difficulty': 'Difficulty',

  // Difficulty levels
  'difficulty.easy': 'Easy',
  'difficulty.medium': 'Medium',
  'difficulty.hard': 'Hard',

  // Game over screen
  'gameover.title': 'Game Over!',
  'gameover.finalscore': 'Final Score:',
  'gameover.accuracy': 'Accuracy:',
  'gameover.nolives': 'You ran out of lives!',
  'gameover.timeout': "Time's up!",
  'gameover.playagain': 'Play Again',

  // Welcome screen
  'welcome.title': 'Improve Your Aim!',
  'welcome.description': 'Train your reflexes and precision to dominate in CS2, Valorant and other FPS games',
  'welcome.start': 'Start Training',
  'welcome.time': 's',
  'welcome.targets': 'targets',

  // Settings modal
  'settings.title': 'Game Settings',
  'settings.theme': 'Color Theme',
  'settings.difficulty': 'Difficulty',
  'settings.lives': 'Lives System',
  'settings.enabled': 'Enabled',
  'settings.disabled': 'Disabled',
  'settings.livesEnabled': 'You have 3 lives. Missing a target or letting one expire costs a life.',
  'settings.livesDisabled': 'Unlimited lives. Practice without pressure.',
  'settings.targetCount': 'Target Count:',
  'settings.targetSize': 'Target Size:',
  'settings.small': 'Small',
  'settings.large': 'Large',
  'settings.gameTime': 'Game Time:',
  'settings.seconds': 'seconds',
  'settings.cancel': 'Cancel',
  'settings.apply': 'Apply',

  // Target sizes
  'targetSize.verySmall': 'Very Small',
  'targetSize.small': 'Small',
  'targetSize.medium': 'Medium',
  'targetSize.large': 'Large',
  'targetSize.veryLarge': 'Very Large',

  // Game modes
  'modes.gridshot': 'GridShot',
  'modes.gridshot.description': 'Click targets as fast as possible',
  'modes.tracking': 'Tracking',
  'modes.tracking.description': 'Follow moving targets',
  'modes.precision': 'Precision',
  'modes.precision.description': 'Hit small targets with accuracy',

  // Sensitivity converter
  'sensitivity.convert': 'Convert Sensitivity',
  'sensitivity.sourceGame': 'Source Game',
  'sensitivity.targetGame': 'Target Game',
  'sensitivity.sourceSens': 'Sensitivity',
  'sensitivity.dpiSettings': 'DPI Settings',
  'sensitivity.show': 'Show',
  'sensitivity.hide': 'Hide',
  'sensitivity.sourceDPI': 'Source Mouse DPI',
  'sensitivity.targetDPI': 'Target Mouse DPI',
  'sensitivity.sourceCM': 'Source cm/360:',
  'sensitivity.targetCM': 'Target cm/360:',
  'sensitivity.converted': 'Converted Sensitivity:',
  'sensitivity.copyResult': 'Copy Result',

  // Tutorials page
  'tutorials.all': 'All',
  'tutorials.basics': 'Basics',
  'tutorials.advanced': 'Advanced',
  'tutorials.exercises': 'Exercises',
  'tutorials.resources': 'Additional Resources',

  // Footer
  'footer.description': 'AimTrainer - Improve your precision for FPS games like CS2, Valorant, and Fortnite',
  'footer.copyright': '© 2025 AimTrainer | Free Online Aim Training Tool',
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key];
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);