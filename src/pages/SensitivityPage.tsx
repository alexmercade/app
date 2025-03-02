import React, { useState } from 'react';
import { MousePointer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { colorThemes, gameSensitivities } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface SensitivityPageProps {
  colorTheme: keyof typeof colorThemes;
}

const SensitivityPage: React.FC<SensitivityPageProps> = ({ colorTheme }) => {
  const { t } = useLanguage();
  const [sourceGame, setSourceGame] = useState(gameSensitivities.cs2);
  const [targetGame, setTargetGame] = useState(gameSensitivities.valorant);
  const [sensitivity, setSensitivity] = useState(1.0);
  const [sourceDPI, setSourceDPI] = useState(800);
  const [targetDPI, setTargetDPI] = useState(800);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Calculate converted sensitivity
  const calculateConvertedSensitivity = () => {
    // Basic conversion
    let converted = (sensitivity * sourceGame.multiplier / targetGame.multiplier);
    
    // Apply DPI adjustment if DPIs are different
    if (sourceDPI !== targetDPI && showAdvanced) {
      converted = converted * (sourceDPI / targetDPI);
    }
    
    return converted.toFixed(3);
  };

  // Calculate cm/360
  const calculateCM360 = (sens: number, dpi: number, gameMultiplier: number) => {
    // Formula: (360 / (sens * dpi * gameMultiplier)) * 2.54
    const cm360 = (360 / (sens * dpi * gameMultiplier)) * 2.54;
    return cm360.toFixed(2);
  };
  
  // Source game cm/360
  const sourceCM360 = calculateCM360(sensitivity, sourceDPI, sourceGame.multiplier);
  
  // Target game cm/360
  const targetCM360 = calculateCM360(parseFloat(calculateConvertedSensitivity()), targetDPI, targetGame.multiplier);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header 
        title="Sens Converter" 
        subtitle="Convert your sensitivity between FPS games"
        colorTheme={colorTheme}
        icon={<MousePointer className="text-white" size={24} />}
      />
      
      <div className="container mx-auto flex-1 flex flex-col p-4 items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-md w-full max-w-md border border-gray-700">
          <h2 className={`text-2xl font-bold mb-6 text-${colorThemes[colorTheme].primary}-500`}>{t('sensitivity.convert')}</h2>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">{t('sensitivity.sourceGame')}</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(gameSensitivities).map(([key, game]) => (
                <button
                  key={key}
                  onClick={() => setSourceGame(game)}
                  className={`py-2 px-3 rounded-md transition-all ${
                    sourceGame.name === game.name 
                      ? `bg-${colorThemes[colorTheme].primary}-600 text-white border border-${colorThemes[colorTheme].primary}-500` 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {game.name}
                </button>
              ))}
            </div>
            
            <label className="block text-gray-300 mb-2 font-medium">{t('sensitivity.targetGame')}</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(gameSensitivities).map(([key, game]) => (
                <button
                  key={key}
                  onClick={() => setTargetGame(game)}
                  className={`py-2 px-3 rounded-md transition-all ${
                    targetGame.name === game.name 
                      ? `bg-${colorThemes[ colorTheme].primary}-600 text-white border border-${colorThemes[colorTheme].primary}-500` 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {game.name}
                </button>
              ))}
            </div>
            
            <label className="block text-gray-300 mb-2 font-medium">
              {sourceGame.name} {t('sensitivity.sourceSens')}
            </label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value) || 0)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mb-4"
            />
            
            {/* Advanced settings toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-medium">{t('sensitivity.dpiSettings')}</span>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-3 py-1 rounded-md text-sm ${
                  showAdvanced 
                    ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {showAdvanced ? t('sensitivity.hide') : t('sensitivity.show')}
              </button>
            </div>
            
            {/* DPI settings */}
            {showAdvanced && (
              <div className="bg-gray-900 p-4 rounded-md mb-4 border border-gray-700">
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t('sensitivity.sourceDPI')}
                  </label>
                  <div className="flex gap-2">
                    {[400, 800, 1200, 1600, 3200].map(dpi => (
                      <button
                        key={dpi}
                        onClick={() => setSourceDPI(dpi)}
                        className={`py-1 px-2 text-xs rounded-md transition-all ${
                          sourceDPI === dpi 
                            ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {dpi}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={sourceDPI}
                    onChange={(e) => setSourceDPI(parseInt(e.target.value) || 800)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-2"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {t('sensitivity.targetDPI')}
                  </label>
                  <div className="flex gap-2">
                    {[400, 800, 1200, 1600, 3200].map(dpi => (
                      <button
                        key={dpi}
                        onClick={() => setTargetDPI(dpi)}
                        className={`py-1 px-2 text-xs rounded-md transition-all ${
                          targetDPI === dpi 
                            ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {dpi}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={targetDPI}
                    onChange={(e) => setTargetDPI(parseInt(e.target.value) || 800)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-2"
                  />
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('sensitivity.sourceCM')}</span>
                    <span className="text-white font-medium">{sourceCM360} cm</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">{t('sensitivity.targetCM')}</span>
                    <span className="text-white font-medium">{targetCM360} cm</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-950 p-4 rounded-md mb-6 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{t('sensitivity.converted')}</span>
                <span className={`text-xl font-bold text-${colorThemes[colorTheme].primary}-500`}>
                  {calculateConvertedSensitivity()}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className={`p-3 rounded-full bg-${colorThemes[colorTheme].primary}-600/20`}>
                  <MousePointer size={24} className={`text-${colorThemes[colorTheme].primary}-500`} />
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700 text-sm text-gray-400">
                <p>
                  {sourceGame.name} {sensitivity} = {targetGame.name} {calculateConvertedSensitivity()}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigator.clipboard.writeText(`${targetGame.name} Sensitivity: ${calculateConvertedSensitivity()}`)}
                className={`px-4 py-2 bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 rounded-md transition-all`}
              >
                {t('sensitivity.copyResult')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SensitivityPage;