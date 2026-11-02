"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  hue: number;
}

export default function MagicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 2.5 + 0.5,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.001 + 0.0005,
      hue: [20, 30, 35, 45][Math.floor(Math.random() * 4)],
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 40 && Math.random() > 0.96) {
        particles.push(spawn());
      }

      particles = particles.filter((p) => p.opacity > 0 && p.y > -10);

      for (const p of particles) {
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
        p.y += p.speedY;
        p.opacity -= p.fadeSpeed;

        const grad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3,
        );
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.opacity})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity: 0.5 }}
    />
  );
}
