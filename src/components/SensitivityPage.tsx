import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MousePointer, Copy, Check, Info } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [recentConversions, setRecentConversions] = useState<{from: string; to: string; value: string}[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Load recent conversions from localStorage
  useEffect(() => {
    const savedConversions = localStorage.getItem('recentConversions');
    if (savedConversions) {
      setRecentConversions(JSON.parse(savedConversions));
    }
  }, []);
  
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
  
  // Handle copy to clipboard
  const handleCopy = () => {
    const result = `${targetGame.name} Sensitivity: ${calculateConvertedSensitivity()}`;
    navigator.clipboard.writeText(result);
    setCopied(true);
    
    // Save this conversion to recent conversions
    const newConversion = {
      from: sourceGame.name,
      to: targetGame.name,
      value: calculateConvertedSensitivity()
    };
    
    const updatedConversions = [newConversion, ...recentConversions.slice(0, 4)];
    setRecentConversions(updatedConversions);
    localStorage.setItem('recentConversions', JSON.stringify(updatedConversions));
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Handle tooltip
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Helmet>
        <title>FPS Sensitivity Converter | Convert Gaming Mouse Settings | AimTrainer</title>
        <meta name="description" content="Free sensitivity converter for FPS games. Convert your mouse settings between CS2, Valorant, Apex Legends, Fortnite and more. Calculate cm/360 for consistent aim." />
        <meta name="keywords" content="sensitivity converter, mouse sensitivity, gaming sensitivity, fps sensitivity, cs2 sensitivity, valorant sensitivity, cm/360, edpi calculator, mouse settings" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://donkaim.com/sensitivity" />
        <meta property="og:title" content="FPS Sensitivity Converter | Convert Gaming Mouse Settings" />
        <meta property="og:description" content="Free sensitivity converter for FPS games. Convert your mouse settings between CS2, Valorant, Apex Legends, Fortnite and more." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://donkaim.com/sensitivity" />
        <meta property="twitter:title" content="FPS Sensitivity Converter | Convert Gaming Mouse Settings" />
        <meta property="twitter:description" content="Free sensitivity converter for FPS games. Convert your mouse settings between CS2, Valorant, Apex Legends, Fortnite and more." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://donkaim.com/sensitivity" />
      </Helmet>
      
      <Header 
        title="Sens Converter" 
        subtitle="Convert your sensitivity between FPS games"
        colorTheme={colorTheme}
        icon={<MousePointer className="text-white" size={24} />}
      />
      
      <main className="container mx-auto flex-1 flex flex-col p-4 items-center justify-center">
        <h1 className="sr-only">FPS Game Sensitivity Converter</h1>
        
        {/* Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" className="w-full max-w-md mb-4">
          <ol className="flex text-sm text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li aria-current="page" className="text-white">Sensitivity Converter</li>
          </ol>
        </nav>
        
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
                      ? `bg-${colorThemes[colorTheme].primary}-600 text-white border border-${colorThemes[colorTheme].primary}-500` 
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
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">{t('sensitivity.converted')}</span>
                  <div className="tooltip ml-1">
                    <Info size={14} className="text-gray-500 cursor-pointer" onClick={toggleTooltip} />
                    {showTooltip && (
                      <div className="tooltip-text bg-gray-800 p-2 text-xs">
                        This is the equivalent sensitivity that will give you the same 360° turn distance
                      </div>
                    )}
                  </div>
                </div>
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
                onClick={handleCopy}
                className={`px-4 py-2 bg-${colorThemes[colorTheme].primary}-600 hover:bg-${colorThemes[colorTheme].primary}-700 rounded-md transition-all flex items-center`}
              >
                {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
                {copied ? 'Copied!' : t('sensitivity.copyResult')}
              </button>
            </div>
          </div>
          
          {/* Recent conversions */}
          {recentConversions.length > 0 && (
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Conversions</h3>
              <div className="space-y-2">
                {recentConversions.map((conversion, index) => (
                  <div key={index} className="bg-gray-900 p-2 rounded-md text-sm flex justify-between">
                    <span>{conversion.from} → {conversion.to}</span>
                    <span className={`text-${colorThemes[colorTheme].primary}-500 font-medium`}>{conversion.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* FAQ Section for SEO */}
        <div className="w-full max-w-md mt-8 bg-gray-800 rounded-md border border-gray-700 p-4">
          <h2 className={`text-xl font-bold mb-4 text-${colorThemes[colorTheme].primary}-500`}>Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">What is sensitivity conversion?</h3>
              <p className="text-gray-300 text-sm mt-1">
                Sensitivity conversion allows you to maintain the same mouse feel across different games. 
                Each game uses different sensitivity scales, so a direct 1:1 copy would result in different movements.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">What is cm/360?</h3>
              <p className="text-gray-300 text-sm mt-1">
                cm/360 measures how many centimeters you need to move your mouse to complete a 360-degree turn in-game. 
                It's a universal measurement that works across all games, making it useful for sensitivity conversion.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">Why does my sensitivity feel different after conversion?</h3>
              <p className="text-gray-300 text-sm mt-1">
                Different games have different FOV (Field of View) settings, acceleration curves, and input processing. 
                While our converter provides mathematically equivalent sensitivities, these factors may cause slight differences in feel.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SensitivityPage;