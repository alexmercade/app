import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Youtube, Target, MousePointer, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { colorThemes } from '../constants/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface TutorialsPageProps {
  colorTheme: keyof typeof colorThemes;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  category: 'basics' | 'advanced' | 'exercises';
  expanded?: boolean;
  slug?: string;
  keywords?: string[];
}

const TutorialsPage: React.FC<TutorialsPageProps> = ({ colorTheme }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'basics' | 'advanced' | 'exercises'>('all');
  
  // English tutorials with enhanced SEO properties
  const [tutorials, setTutorials] = useState<Tutorial[]>([
    {
      id: 'basics-1',
      title: 'Aim Fundamentals: Master the Basics of FPS Aiming',
      description: 'Learn the essential concepts and techniques to improve your aim in FPS games like CS2, Valorant, and Fortnite',
      category: 'basics',
      icon: <Target size={20} />,
      slug: 'aim-fundamentals',
      keywords: ['aim fundamentals', 'mouse grip', 'palm grip', 'claw grip', 'fingertip grip', 'mouse sensitivity', 'gaming posture', 'aim training basics', 'fps aiming'],
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Aim Fundamentals for FPS Games</h2>
          <p>Aiming is one of the most important skills in FPS games. Here are the fundamentals you should know:</p>
          
          <h3 className="font-bold text-xl mt-4">1. Hand Position and Mouse Grip</h3>
          <p>The way you hold your mouse significantly affects your accuracy:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Palm grip:</span> The mouse rests completely under your palm. Offers stability but less precision for small movements.</li>
            <li><span className="font-medium">Claw grip:</span> Fingers are arched and only the back of the palm touches the mouse. Balance between precision and control.</li>
            <li><span className="font-medium">Fingertip grip:</span> Only the fingers touch the mouse. Greater precision for small movements but may be less stable.</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-300 text-sm italic">Tip: Experiment with different grips to find the one that best suits your playing style and hand anatomy.</p>
          </div>
          
          <h3 className="font-bold text-xl mt-4">2. Mouse Sensitivity Settings</h3>
          <p>Finding the right sensitivity is crucial for consistent aim:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>A sensitivity that's too high can make precise movements difficult</li>
            <li>A sensitivity that's too low can make quick turns difficult</li>
            <li>Most professional players use between 30-50cm for a 360° turn</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">3. Posture and Ergonomics</h3>
          <p>Proper posture improves your performance and prevents injuries:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keep your forearms supported and parallel to the floor</li>
            <li>Sit with your back straight and shoulders relaxed</li>
            <li>Position the monitor at eye level and at a comfortable distance</li>
            <li>Make sure you have enough space to move the mouse</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-300 text-sm italic">Remember: Consistency is key. Maintain the same setup, posture, and technique to develop muscle memory.</p>
          </div>
        </div>
      )
    },
    {
      id: 'basics-2',
      title: 'Optimal Gaming Setup for FPS Performance',
      description: 'Configure your hardware and game settings to maximize your aiming performance in competitive shooters',
      category: 'basics',
      icon: <MousePointer size={20} />,
      slug: 'optimal-gaming-setup',
      keywords: ['gaming setup', 'fps hardware', 'gaming mouse', 'gaming monitor', 'dpi settings', 'edpi', 'mouse acceleration', 'fps optimization', 'gaming peripherals'],
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Optimal Gaming Setup for FPS Performance</h2>
          <p>The proper setup of your equipment can make a big difference in your performance:</p>
          
          <h3 className="font-bold text-xl mt-4">1. Hardware Optimization</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Mouse:</span> Look for a mouse with a precise sensor and a weight that feels comfortable. The shape should fit your grip type.</li>
            <li><span className="font-medium">Mousepad:</span> A large mousepad allows you to make wide movements without lifting the mouse.</li>
            <li><span className="font-medium">Monitor:</span> A high refresh rate (144Hz or more) significantly reduces visual delay.</li>
            <li><span className="font-medium">Keyboard:</span> Look for one with a low response time and comfortable keys.</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">2. Game Settings Configuration</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Stable FPS:</span> Prioritize FPS over graphical quality. Configure settings to maintain a stable frame rate.</li>
            <li><span className="font-medium">Mouse acceleration:</span> Turn it off to develop consistent muscle memory.</li>
            <li><span className="font-medium">Field of view (FOV):</span> A wider FOV lets you see more, but can make targets appear smaller.</li>
            <li><span className="font-medium">Crosshair:</span> Choose a simple, high-contrast crosshair that doesn't obstruct your vision.</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-300 text-sm italic">Tip: Many professional players use low graphical quality settings to maximize performance and reduce visual distractions.</p>
          </div>
          
          <h3 className="font-bold text-xl mt-4">3. DPI and eDPI Configuration</h3>
          <p>Understanding the relationship between DPI and in-game sensitivity:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">DPI (Dots Per Inch):</span> Your mouse's hardware sensitivity.</li>
            <li><span className="font-medium">In-game sensitivity:</span> The multiplier that the game applies to your DPI.</li>
            <li><span className="font-medium">eDPI:</span> DPI × In-game sensitivity = Effective sensitivity.</li>
          </ul>
          
          <p className="mt-2">Common eDPI ranges for different games:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>CS2: 600-1200 eDPI</li>
            <li>Valorant: 200-400 eDPI</li>
            <li>Apex Legends: 800-1600 eDPI</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md mt-4">
            <p className="text-gray-300 text-sm italic">Remember: The most important thing is to find a setup that feels comfortable to you and keep it consistent to develop muscle memory.</p>
          </div>
        </div>
      )
    },
    {
      id: 'advanced-1',
      title: 'Advanced Aiming Techniques for Competitive FPS',
      description: 'Master professional-level techniques to dramatically improve your precision, flicking, tracking, and recoil control',
      category: 'advanced',
      icon: <Zap size={20} />,
      slug: 'advanced-aiming-techniques',
      keywords: ['advanced aim', 'micro-adjustments', 'flick shots', 'tracking aim', 'pre-aiming', 'recoil control', 'pro aim techniques', 'aim training advanced', 'fps aim mastery'],
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Advanced Aiming Techniques for Competitive FPS</h2>
          <p>Once you've mastered the fundamentals, you can move on to more sophisticated techniques:</p>
          
          <h3 className="font-bold text-xl mt-4">1. Micro-adjustments for Precision</h3>
          <p>The ability to make small, precise adjustments is crucial for headshots:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Practice moving your crosshair in small increments</li>
            <li>Train your ability to make micro-corrections after a wide movement</li>
            <li>Use "dot tracking" exercises where you follow a small moving point</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">2. Flick Shot Mastery</h3>
          <p>Quick and precise shots are essential in intense combat situations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Train your ability to quickly move the crosshair from one target to another</li>
            <li>Practice quick shots at targets that appear suddenly</li>
            <li>Develop muscle memory for specific distances</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-300 text-sm italic">Technique: Start with slow, precise flicks, gradually increasing speed while maintaining accuracy.</p>
          </div>
          
          <h3 className="font-bold text-xl mt-4">3. Advanced Tracking</h3>
          <p>Keeping the crosshair on a moving target:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Practice following targets that move in predictable patterns</li>
            <li>Progress to more complex and unpredictable movement patterns</li>
            <li>Train different tracking speeds</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">4. Strategic Pre-aiming</h3>
          <p>Anticipating the position of enemies before they appear:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Learn common positions where players tend to be</li>
            <li>Keep your crosshair at head height as you move</li>
            <li>Practice moving around the map while keeping your crosshair at strategic positions</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">5. Recoil Control Mastery</h3>
          <p>Mastering the recoil pattern of weapons:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Learn the specific recoil patterns of each weapon</li>
            <li>Practice compensating for recoil by moving the mouse in the opposite direction</li>
            <li>Train controlled bursts to maintain accuracy</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md mt-4">
            <p className="text-gray-300 text-sm italic">Advanced tip: Combine these techniques in your training sessions. For example, practice flicks followed by tracking, or pre-aim followed by recoil control.</p>
          </div>
        </div>
      )
    },
    {
      id: 'exercises-1',
      title: 'Daily Aim Training Routines for FPS Improvement',
      description: 'Structured practice routines to consistently improve your aim, reflexes, and precision in competitive shooters',
      category: 'exercises',
      icon: <Target size={20} />,
      slug: 'daily-aim-training-routines',
      keywords: ['aim training routine', 'daily aim practice', 'aim warmup', 'aim drills', 'aim exercises', 'tracking practice', 'flick practice', 'aim improvement', 'fps training'],
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Daily Aim Training Routines for FPS Improvement</h2>
          <p>A structured training routine is key to consistently improving:</p>
          
          <h3 className="font-bold text-xl mt-4">Warm-up Routine (5-10 minutes)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Smooth tracking:</span> Follow large targets that move slowly to warm up your muscles.</li>
            <li><span className="font-medium">Slow flicks:</span> Practice precise movements between static targets without worrying about speed.</li>
            <li><span className="font-medium">Hand stretches:</span> Perform gentle finger and wrist stretches between exercises.</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">Main Routine (15-20 minutes)</h3>
          <p className="font-medium">Day 1: Focus on precision</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>5 minutes: Small static targets (Precision mode)</li>
            <li>5 minutes: Micro-adjustments on close targets</li>
            <li>5 minutes: Headshots on static targets</li>
          </ul>
          
          <p className="font-medium mt-3">Day 2: Focus on speed</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>5 minutes: Gridshot with large targets</li>
            <li>5 minutes: Quick flicks between targets</li>
            <li>5 minutes: Reaction to targets that appear suddenly</li>
          </ul>
          
          <p className="font-medium mt-3">Day 3: Focus on tracking</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>5 minutes: Tracking targets with linear movement</li>
            <li>5 minutes: Tracking targets with direction changes</li>
            <li>5 minutes: Tracking targets with variable speed</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">Game-specific Exercises</h3>
          <p className="font-medium">For CS2 and Valorant:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Practice headshots with pistols</li>
            <li>Train spray control with rifles</li>
            <li>Practice pre-aim at common positions</li>
          </ul>
          
          <p className="font-medium mt-3">For Apex Legends and Fortnite:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tracking targets moving in all directions</li>
            <li>Practice shooting while moving</li>
            <li>Train quick weapon switches</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md mt-4">
            <p className="text-gray-300 text-sm italic">Tip: Consistency is more important than duration. It's better to train for 15 minutes every day than 2 hours once a week.</p>
          </div>
          
          <h3 className="font-bold text-xl mt-4">Progress Tracking</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Record your scores in each exercise</li>
            <li>Set small, achievable goals</li>
            <li>Review your progress weekly and adjust your routine as needed</li>
          </ul>
        </div>
      )
    },
    {
      id: 'exercises-2',
      title: 'Game-specific Aim Training for CS2, Valorant, Apex & Fortnite',
      description: 'Specialized training techniques tailored for different FPS games to improve your performance in your favorite shooter',
      category: 'exercises',
      icon: <Target size={20} />,
      slug: 'game-specific-aim-training',
      keywords: ['CS2 aim training', 'Valorant aim training', 'Apex Legends aim', 'Fortnite aim', 'game-specific training', 'spray control', 'counter-strafing', 'tracking aim', 'building aim'],
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Game-specific Aim Training for Popular FPS Games</h2>
          <p>Each FPS game has unique mechanics that require specific approaches:</p>
          
          <h3 className="font-bold text-xl mt-4">Counter-Strike 2 (CS2) Training</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Spray control:</span> Learn the specific recoil patterns of each weapon (AK-47, M4A4, etc.).</li>
            <li><span className="font-medium">Counter-strafing:</span> Practice stopping completely before shooting for maximum accuracy.</li>
            <li><span className="font-medium">Pre-aiming:</span> Keep your crosshair at head height and pre-aim common positions.</li>
            <li><span className="font-medium">Recommended exercise:</span> Practice on maps like aim_botz or in deathmatch servers.</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">Valorant Training Techniques</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">First bullet accuracy:</span> Focus on first shot accuracy, crucial in Valorant.</li>
            <li><span className="font-medium">Abilities + aim:</span> Practice combining ability usage with precise shots.</li>
            <li><span className="font-medium">Crosshair placement:</span> Similar to CS2, keep your crosshair at head level.</li>
            <li><span className="font-medium">Recommended exercise:</span> Use Valorant's practice mode and Deathmatch for training.</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">Apex Legends Aim Improvement</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Tracking:</span> Prioritize tracking targets that move quickly in all directions.</li>
            <li><span className="font-medium">Recoil smoothing:</span> Practice recoil control while moving.</li>
            <li><span className="font-medium">Movement + aim:</span> Train your aim while performing advanced movements (sliding, wall jumping).</li>
            <li><span className="font-medium">Recommended exercise:</span> Use the firing range and practice 1v1 in arenas.</li>
          </ul>
          
          <h3 className="font-bold text-xl mt-4">Fortnite Aim and Building</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Building + aim:</span> Practice quickly alternating between building and shooting.</li>
            <li><span className="font-medium">Editing + shots:</span> Train editing structures and shooting immediately.</li>
            <li><span className="font-medium">3D tracking:</span> Develop the ability to track targets moving vertically and horizontally.</li>
            <li><span className="font-medium">Recommended exercise:</span> Use creative aim training maps specifically for aim.</li>
          </ul>
          
          <div className="bg-gray-700 p-3 rounded-md mt-4">
            <p className="text-gray-300 text-sm italic">Tip: Dedicate at least 50% of your training time to exercises specific to your main game.</p>
          </div>
        </div>
      )
    }
  ]);

  // Toggle tutorial expansion
  const toggleTutorial = (id: string) => {
    setTutorials(tutorials.map(tutorial => 
      tutorial.id === id ? { ...tutorial, expanded: !tutorial.expanded } : tutorial
    ));
  };

  // Filter tutorials by category
  const filteredTutorials = activeCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === activeCategory);

  // Generate structured data for the page
  const generateStructuredData = () => {
    const articleListItems = tutorials.map(tutorial => ({
      "@type": "Article",
      "headline": tutorial.title,
      "description": tutorial.description,
      "author": {
        "@type": "Organization",
        "name": "AimTrainer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AimTrainer",
        "logo": {
          "@type": "ImageObject",
          "url": "https://donkaim.com/logo.png"
        }
      },
      "url": `https://donkaim.com/tutorials#${tutorial.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://donkaim.com/tutorials#${tutorial.slug}`
      },
      "datePublished": "2025-01-01T08:00:00+08:00",
      "dateModified": "2025-06-28T09:00:00+08:00"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": tutorials.map((tutorial, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "url": `https://donkaim.com/tutorials#${tutorial.slug}`,
          "name": tutorial.title,
          "description": tutorial.description
        }
      }))
    };
  };

  // Update document title when component mounts
  useEffect(() => {
    document.title = "Aim Training Tutorials & Guides | Improve FPS Skills | AimTrainer";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Helmet>
        <title>Aim Training Tutorials & Guides | Improve FPS Skills | AimTrainer</title>
        <meta name="description" content="Free aim training tutorials, guides and exercises to improve your precision in FPS games like CS2, Valorant, Apex Legends and Fortnite. Learn pro techniques." />
        <meta name="keywords" content="aim training, aim tutorials, fps aim guide, cs2 aim training, valorant aim guide, fortnite aim, apex legends aim, mouse accuracy, aim improvement, aim exercises, aim drills" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://donkaim.com/tutorials" />
        <meta property="og:title" content="Aim Training Tutorials & Guides | Improve FPS Skills" />
        <meta property="og:description" content="Free aim training tutorials, guides and exercises to improve your precision in FPS games like CS2, Valorant, Apex Legends and Fortnite." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://donkaim.com/tutorials" />
        <meta property="twitter:title" content="Aim Training Tutorials & Guides | Improve FPS Skills" />
        <meta property="twitter:description" content="Free aim training tutorials, guides and exercises to improve your precision in FPS games like CS2, Valorant, Apex Legends and Fortnite." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://donkaim.com/tutorials" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>
      
      <Header 
        title="Aim Tutorials" 
        subtitle="Guides and exercises to improve your aim"
        colorTheme={colorTheme}
        icon={<BookOpen className="text-white" size={24} />}
      />
      
      <main className="container mx-auto flex-1 flex flex-col p-4">
        <h1 className="sr-only">Aim Training Tutorials and Guides for FPS Games</h1>
        
        {/* Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex text-sm text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li aria-current="page" className="text-white">Tutorials</li>
          </ol>
        </nav>
        
        {/* Introduction paragraph for SEO */}
        <section className="mb-6">
          <p className="text-gray-300">
            Welcome to our comprehensive aim training tutorials. Whether you're a beginner looking to improve your fundamentals or an advanced player aiming to refine specific skills, 
            our guides cover everything you need to enhance your performance in games like CS2, Valorant, Apex Legends, and Fortnite. 
            Select a category below to start improving your aim today.
          </p>
        </section>
        
        {/* Category filters */}
        <section className="mb-6" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Tutorial Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === 'all' 
                  ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={activeCategory === 'all'}
            >
              {t('tutorials.all')}
            </button>
            <button
              onClick={() => setActiveCategory('basics')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === 'basics' 
                  ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={activeCategory === 'basics'}
            >
              {t('tutorials.basics')}
            </button>
            <button
              onClick={() => setActiveCategory('advanced')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === 'advanced' 
                  ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={activeCategory === 'advanced'}
            >
              {t('tutorials.advanced')}
            </button>
            <button
              onClick={() => setActiveCategory('exercises')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === 'exercises' 
                  ? `bg-${colorThemes[colorTheme].primary}-600 text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={activeCategory === 'exercises'}
            >
              {t('tutorials.exercises')}
            </button>
          </div>
        </section>
        
        {/* Tutorials list */}
        <section className="space-y-4" aria-label="Tutorials">
          {filteredTutorials.map(tutorial => (
            <article 
              key={tutorial.id} 
              id={tutorial.slug}
              className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
            >
              <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-750"
                onClick={() => toggleTutorial(tutorial.id)}
                aria-expanded={tutorial.expanded}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-md bg-${colorThemes[colorTheme].primary}-600 mr-3`} aria-hidden="true">
                    {tutorial.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{tutorial.title}</h2>
                    <p className="text-gray-400 text-sm">{tutorial.description}</p>
                  </div>
                </div>
                {tutorial.expanded ? 
                  <ChevronUp className="text-gray-400" aria-hidden="true" /> : 
                  <ChevronDown className="text-gray-400" aria-hidden="true" />
                }
              </div>
              
              {tutorial.expanded && (
                <div className="p-4 border-t border-gray-700 bg-gray-850">
                  {tutorial.content}
                </div>
              )}
            </article>
          ))}
        </section>
        
        {/* External resources */}
        <section className="mt-8 bg-gray-800 rounded-lg border border-gray-700 p-4" aria-labelledby="resources-heading">
          <h2 id="resources-heading" className={`text-xl font-bold mb-4 text-${colorThemes[colorTheme].primary}-500`}>{t('tutorials.resources')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://www.youtube.com/watch?v=uxBuiD11WDM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-gray-650 transition-colors"
              aria-label="Watch Complete Aim Training Guide by ProGuides on YouTube"
            >
              <Youtube size={20} className="mr-3 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-medium">Complete Aim Training Guide</p>
                <p className="text-sm text-gray-400">By ProGuides</p>
              </div>
              <ExternalLink size={16} className="ml-auto text-gray-400" aria-hidden="true" />
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=cux5avNBZO4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-gray-650 transition-colors"
              aria-label="Watch 15-Minute Daily Routine by Aimer7 on YouTube"
            >
              <Youtube size={20} className="mr-3 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-medium">15-Minute Daily Routine</p>
                <p className="text-sm text-gray-400">By Aimer7</p>
              </div>
              <ExternalLink size={16} className="ml-auto text-gray-400" aria-hidden="true" />
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=owJ-GmQdRSw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-gray-650 transition-colors"
              aria-label="Watch How to Train Like a Pro by TenZ on YouTube"
            >
              <Youtube size={20} className="mr-3 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-medium">How to Train Like a Pro</p>
                <p className="text-sm text-gray-400">By TenZ</p>
              </div>
              <ExternalLink size={16} className="ml-auto text-gray-400" aria-hidden="true" />
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=XruZdI3e3mE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-gray-650 transition-colors"
              aria-label="Watch Common Aim Training Mistakes by Valorant Guides on YouTube"
            >
              <Youtube size={20} className="mr-3 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-medium">Common Aim Training Mistakes</p>
                <p className="text-sm text-gray-400">By Valorant Guides</p>
              </div>
              <ExternalLink size={16} className="ml-auto text-gray-400" aria-hidden="true" />
            </a>
          </div>
        </section>
        
        {/* FAQ Section for SEO */}
        <section className="mt-8 bg-gray-800 rounded-lg border border-gray-700 p-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={`text-xl font-bold mb-4 text-${colorThemes[colorTheme].primary}-500`}>Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg">How long should I practice aim training each day?</h3>
              <p className="text-gray-300 mt-1">
                Consistency is more important than duration. 15-30 minutes of focused practice daily is more effective than several hours once a week. 
                Start with shorter sessions and gradually increase as you build the habit.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg">What's the best mouse sensitivity for FPS games?</h3>
              <p className="text-gray-300 mt-1">
                There's no universal "best" sensitivity. Most professional players use a sensitivity that allows them to do a 180° turn in one comfortable swipe, 
                typically resulting in 30-50cm of mousepad distance for a 360° turn. Experiment to find what works for you.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg">How can I improve my flick shots?</h3>
              <p className="text-gray-300 mt-1">
                Start by practicing slow, deliberate flicks to build muscle memory. Focus on accuracy first, then gradually increase speed. 
                Use training modes that require you to flick between targets of varying distances and sizes.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg">Should I use the same sensitivity across all FPS games?</h3>
              <p className="text-gray-300 mt-1">
                Ideally, yes. Using the same effective sensitivity (accounting for different sensitivity scales between games) helps build consistent muscle memory. 
                Use our sensitivity converter to match your settings across different games.
              </p>
            </div>
          </div>
        </section>
        
        {/* Related content section for SEO */}
        <section className="mt-8 mb-6">
          <h2 className={`text-xl font-bold mb-4 text-${colorThemes[colorTheme].primary}-500`}>Related Resources</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <a href="/" className="text-blue-400 hover:underline">Try our interactive aim trainer</a> to put these tutorials into practice
            </li>
            <li>
              <a href="/sensitivity" className="text-blue-400 hover:underline">Use our sensitivity converter</a> to match your settings across different games
            </li>
            <li>
              Check out our <a href="/" className="text-blue-400 hover:underline">precision mode</a> to practice the techniques described in these tutorials
            </li>
            <li>
              Practice <a href="/" className="text-blue-400 hover:underline">tracking aim</a> with our specialized tracking exercises
            </li>
          </ul>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorialsPage;