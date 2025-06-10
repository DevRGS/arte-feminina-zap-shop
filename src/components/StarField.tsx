
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Gerar estrelas iniciais
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * -500,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setStars(newStars);
    };

    generateStars();

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          y: star.y + star.speed + scrollY * 0.1,
          x: star.x + Math.sin(star.y * 0.01) * 0.5
        })).filter(star => star.y < window.innerHeight + 100)
      );

      // Adicionar novas estrelas conforme o scroll
      if (scrollY > 0) {
        setStars(prevStars => {
          const newStars = [...prevStars];
          if (Math.random() < 0.3 && newStars.length < 100) {
            newStars.push({
              id: Date.now() + Math.random(),
              x: Math.random() * window.innerWidth,
              y: -20,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 3 + 2,
              opacity: Math.random() * 0.8 + 0.2
            });
          }
          return newStars;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 animate-pulse"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 0, 0.5)`,
            transform: `rotate(${star.y * 0.5}deg)`
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full"
            style={{
              width: `${star.size * 0.6}px`,
              height: `${star.size * 0.6}px`,
              margin: 'auto'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StarField;
