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

    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "hsl(280, 65%, 85%)",
      "hsl(320, 70%, 88%)",
      "hsl(180, 60%, 85%)",
      "hsl(220, 70%, 88%)",
      "hsl(160, 55%, 82%)",
      "hsl(30, 75%, 85%)",
      "hsl(260, 60%, 88%)",
    ];

    const createParticles = (x: number, y: number, count: number = 8) => {
      if (particlesRef.current.length > 200) return;
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
        const speed = 1.5 + Math.random() * 3;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.8 + Math.random() * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 4,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastParticleTime.current < 8) return;
      
      lastMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 2) {
        const particleCount = Math.max(3, Math.min(Math.floor(distance / 6), 12));
        createParticles(mouseRef.current.x, mouseRef.current.y, particleCount);
        lastParticleTime.current = now;
      } else if (distance > 0) {
        createParticles(mouseRef.current.x, mouseRef.current.y, 2);
        lastParticleTime.current = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05;
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        particle.life -= 0.015;

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
