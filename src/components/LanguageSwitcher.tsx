import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { colorThemes } from '../constants/themes';

interface LanguageSwitcherProps {
  colorTheme: keyof typeof colorThemes;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ colorTheme }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button 
        className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all flex items-center"
        title="Change Language"
      >
        <Globe size={18} className={`text-${colorThemes[colorTheme].primary}-500 mr-1`} />
        <span className="uppercase text-xs font-bold">{language}</span>
      </button>
      
      <div className="absolute right-0 mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 hidden group-hover:block z-10">
        <button 
          onClick={() => setLanguage('en')}
          className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${language === 'en' ? `text-${colorThemes[colorTheme].primary}-500` : 'text-gray-300'}`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('es')}
          className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${language === 'es' ? `text-${colorThemes[colorTheme].primary}-500` : 'text-gray-300'}`}
        >
          Español
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;