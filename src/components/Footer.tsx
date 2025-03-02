import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-800 p-3 text-center text-gray-400 text-sm border-t border-gray-700">
      <div className="container mx-auto">
        <p className="mb-1">{t('footer.description')}</p>
        <p className="text-xs">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;