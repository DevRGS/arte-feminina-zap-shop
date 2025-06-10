
import React from 'react';
import ParallaxSection from './ParallaxSection';

interface ParallaxDividerProps {
  pattern?: 'waves' | 'geometric' | 'dots';
}

const ParallaxDivider: React.FC<ParallaxDividerProps> = ({ pattern = 'waves' }) => {
  const getPattern = () => {
    switch (pattern) {
      case 'waves':
        return (
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className="fill-gradient-to-r from-pink-200 to-purple-200"
            />
          </svg>
        );
      case 'geometric':
        return (
          <div className="w-full h-full bg-gradient-to-r from-pink-100 to-purple-100 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform skew-y-1"></div>
          </div>
        );
      case 'dots':
        return (
          <div className="w-full h-full bg-gradient-to-r from-pink-50 to-purple-50 opacity-50">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(236,72,153,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ParallaxSection speed={0.3} className="h-24 overflow-hidden relative">
      {getPattern()}
    </ParallaxSection>
  );
};

export default ParallaxDivider;
