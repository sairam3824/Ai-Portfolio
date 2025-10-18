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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    // Create particles
    const createParticles = (x: number, y: number, count: number = 8) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const speed = 2 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 4,
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Calculate distance moved
      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Create particles based on movement speed
      if (distance > 5) {
        createParticles(mouseRef.current.x, mouseRef.current.y, Math.min(Math.floor(distance / 5), 12));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.vx *= 0.99; // friction
        particle.vy *= 0.99;
        particle.life -= 0.02;

        if (particle.life > 0) {
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fill();

          // Add soft glow effect
          ctx.shadowBlur = 30;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          return true;
        }
        return false;
      });

      ctx.globalAlpha = 1;
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
