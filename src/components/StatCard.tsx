import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { colorThemes } from '../constants/themes';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  colorTheme: keyof typeof colorThemes;
  className?: string;
  size?: 'small' | 'normal';
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  colorTheme, 
  className = '',
  size = 'normal'
}) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`stat-card bg-gray-800 border border-gray-700 ${isSmall ? 'stat-card-small' : ''} ${className}`}>
      <div className={`stat-icon bg-${colorThemes[colorTheme].primary}-600 ${isSmall ? 'stat-icon-small' : ''}`}>
        <Icon size={isSmall ? 16 : 20} />
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;