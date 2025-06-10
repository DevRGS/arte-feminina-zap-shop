
import React, { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  baseSpeed: number; // velocidade base da estrela
}

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    // Gerar estrelas iniciais
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        const baseSpeed = Math.random() * 2 + 1;
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * -500,
          size: Math.random() * 3 + 1,
          speed: baseSpeed,
          baseSpeed: baseSpeed,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setStars(newStars);
    };

    generateStars();

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const currentTime = Date.now();
      
      // Calcular velocidade do scroll
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;
      const velocity = Math.abs(deltaY) / Math.max(deltaTime, 1) * 100; // normalizar velocidade
      
      setScrollY(currentScrollY);
      setScrollVelocity(Math.min(velocity, 20)); // limitar velocidade máxima
      
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
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
      setStars(prevStars => {
        // Fator de velocidade baseado no scroll
        const velocityMultiplier = 1 + (scrollVelocity * 0.5);
        
        return prevStars.map(star => ({
          ...star,
          y: star.y + (star.baseSpeed * velocityMultiplier) + scrollY * 0.1,
          x: star.x + Math.sin(star.y * 0.01) * 0.5,
          speed: star.baseSpeed * velocityMultiplier
        })).filter(star => star.y < window.innerHeight + 100);
      });

      // Adicionar novas estrelas conforme o scroll
      if (scrollY > 0) {
        setStars(prevStars => {
          const newStars = [...prevStars];
          if (Math.random() < 0.3 && newStars.length < 100) {
            const baseSpeed = Math.random() * 3 + 2;
            newStars.push({
              id: Date.now() + Math.random(),
              x: Math.random() * window.innerWidth,
              y: -20,
              size: Math.random() * 3 + 1,
              speed: baseSpeed,
              baseSpeed: baseSpeed,
              opacity: Math.random() * 0.8 + 0.2
            });
          }
          return newStars;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [scrollY, scrollVelocity]);

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
            transform: `rotate(${star.y * 0.5}deg)`,
            transition: 'transform 0.1s ease-out'
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
