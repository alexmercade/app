import React from 'react';
import { Settings, Layers, MousePointer, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  colorTheme: keyof typeof colorThemes;
  icon: React.ReactNode;
  showModeMenu?: boolean;
  setShowModeMenu?: (show: boolean) => void;
  showSettings?: boolean;
  setShowSettings?: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  colorTheme,
  icon,
  showModeMenu,
  setShowModeMenu,
  showSettings,
  setShowSettings
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Get translated title parts
  const getTitleParts = () => {
    if (title.includes('Aim')) {
      return t('app.title').split(' ');
    } else if (title.includes('Sens')) {
      return t('sensitivity.title').split(' ');
    } else if (title.includes('Tutorials')) {
      return t('tutorials.title').split(' ');
    }
    return title.split(' ');
  };

  // Get translated subtitle
  const getSubtitle = () => {
    if (subtitle?.includes('Train your aim')) {
      return t('app.subtitle');
    } else if (subtitle?.includes('Convert your sensitivity')) {
      return t('sensitivity.subtitle');
    } else if (subtitle?.includes('Guides and exercises')) {
      return t('tutorials.subtitle');
    }
    return subtitle;
  };

  // Handle navigation to ensure we don't leave a game running
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const titleParts = getTitleParts();
  const translatedSubtitle = getSubtitle();

  return (
    <header className="bg-gray-800 p-4 shadow-md border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className={`bg-${colorThemes[colorTheme].primary}-600 p-2 rounded-md mr-3`}>
            {icon}
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white whitespace-nowrap">
              {titleParts[0]}<span className={`text-${colorThemes[colorTheme].primary}-500`}>{titleParts.length > 1 ? titleParts[1] : ''}</span>
            </h1>
            {translatedSubtitle && (
              <>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-sm text-gray-300">{translatedSubtitle}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {setShowModeMenu && (
            <button 
              onClick={() => setShowModeMenu(!showModeMenu)}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
              title="Game Modes"
            >
              <Layers size={18} className={`text-${colorThemes[colorTheme].primary}-500`} />
            </button>
          )}
          
          <button 
            onClick={() => handleNavigation('/tutorials')}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
            title="Tutorials"
          >
            <BookOpen size={18} className={`text-${colorThemes[colorTheme].primary}-500`} />
          </button>
          
          {title.includes('Aim') && (
            <button 
              onClick={() => handleNavigation('/sensitivity')}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
              title="Sensitivity Converter"
            >
              <MousePointer size={18} className={`text-${colorThemes[colorTheme].primary}-500`} />
            </button>
          )}
          
          {(title.includes('Sens') || title.includes('Tutorials')) && (
            <button 
              onClick={() => handleNavigation('/')}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
              title="Aim Trainer"
            >
              <Target size={18} className={`text-${colorThemes[colorTheme].primary}-500`} />
            </button>
          )}
          
          {setShowSettings && (
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
              title="Settings"
            >
              <Settings size={18} className={`text-${colorThemes[colorTheme].primary}-500`} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;