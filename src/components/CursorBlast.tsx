import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const CursorBlast = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const lastParticleTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Optimize canvas context
    ctx.imageSmoothingEnabled = false;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pastel holographic color palette
    const colors = [
      "hsl(280, 65%, 85%)", // soft lavender
      "hsl(320, 70%, 88%)", // light pink
      "hsl(180, 60%, 85%)", // mint cyan
      "hsl(220, 70%, 88%)", // soft blue
      "hsl(160, 55%, 82%)", // soft mint green
      "hsl(30, 75%, 85%)",  // peach
      "hsl(260, 60%, 88%)", // light purple
    ];

    // Create particles with increased count for more bubbles
    const createParticles = (x: number, y: number, count: number = 8) => {
      // Limit total particles for performance
      if (particlesRef.current.length > 150) return;
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
        const speed = 1.5 + Math.random() * 3;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10, // Add slight position variation
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 4,
        });
      }
    };

    // Throttled mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to allow more frequent particle creation
      if (now - lastParticleTime.current < 12) return;
      
      lastMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Calculate distance moved
      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Create more particles for better visual effect
      if (distance > 6) {
        createParticles(mouseRef.current.x, mouseRef.current.y, Math.min(Math.floor(distance / 8), 10));
        lastParticleTime.current = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop with optimizations
    let animationId: number;
    const animate = () => {
      // Clear canvas efficiently
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch particle operations
      ctx.save();
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.08; // reduced gravity
        particle.vx *= 0.98; // reduced friction
        particle.vy *= 0.98;
        particle.life -= 0.025;

        if (particle.life > 0) {
          ctx.globalAlpha = particle.life * 0.8;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};
