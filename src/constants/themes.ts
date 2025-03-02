import { Settings, Play, Pause, RotateCcw, Target, Heart, Trophy, Clock, Crosshair, Zap, Palette, MousePointer, Repeat, Layers } from 'lucide-react';

// Define color themes
export const colorThemes = {
  gray: {
    primary: 'zinc',
    secondary: 'gray',
    accent: 'slate',
    name: 'Gray'
  },
  blue: {
    primary: 'blue',
    secondary: 'gray',
    accent: 'blue',
    name: 'Blue'
  },
  purple: {
    primary: 'purple',
    secondary: 'gray',
    accent: 'purple',
    name: 'Purple'
  },
  amber: {
    primary: 'amber',
    secondary: 'gray',
    accent: 'amber',
    name: 'Amber'
  },
  teal: {
    primary: 'teal',
    secondary: 'gray',
    accent: 'teal',
    name: 'Teal'
  }
};

// Game modes
export const gameModes = {
  gridshot: {
    name: 'GridShot',
    description: 'Click targets as fast as possible',
    icon: Target
  },
  tracking: {
    name: 'Tracking',
    description: 'Follow moving targets',
    icon: Repeat
  },
  precision: {
    name: 'Precision',
    description: 'Hit small targets with accuracy',
    icon: Crosshair
  }
};

// Game sensitivity conversion data
export const gameSensitivities = {
  cs2: {
    name: 'CS2',
    multiplier: 1.0
  },
  valorant: {
    name: 'Valorant',
    multiplier: 3.18
  },
  apex: {
    name: 'Apex',
    multiplier: 1.0
  },
  fortnite: {
    name: 'Fortnite',
    multiplier: 0.5
  },
  overwatch: {
    name: 'Overwatch',
    multiplier: 3.33
  },
  rainbow6: {
    name: 'Rainbow 6',
    multiplier: 3.83
  },
  battlefield: {
    name: 'Battlefield',
    multiplier: 1.2
  },
  cod: {
    name: 'Call of Duty',
    multiplier: 1.0
  }
};