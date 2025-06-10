
import React, { useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.1, 
  className = '' 
}) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      // Efeito muito mais suave
      setOffsetY(scrolled * speed * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      className={`relative ${className}`}
      style={{
        transform: `translateY(${offsetY}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
