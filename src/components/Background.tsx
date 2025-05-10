import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = [];
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 0.05,
        vy: Math.random() * 0.05
      });
    }

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#0f172a');

    const drawStars = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // If star leaves canvas, reset position
        if (star.x < 0 || star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y < 0 || star.y > canvas.height) star.y = Math.random() * canvas.height;
      });

      // Draw cosmic clouds
      const drawCloud = (x: number, y: number, radius: number, color: string) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      };

      // Draw a few cosmic clouds
      drawCloud(canvas.width * 0.2, canvas.height * 0.3, 150, 'rgba(147, 51, 234, 0.15)');
      drawCloud(canvas.width * 0.8, canvas.height * 0.5, 200, 'rgba(59, 130, 246, 0.1)');
      drawCloud(canvas.width * 0.5, canvas.height * 0.7, 180, 'rgba(236, 72, 153, 0.1)');

      requestAnimationFrame(drawStars);
    };

    drawStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full bg-slate-900"
    />
  );
};

export default Background;