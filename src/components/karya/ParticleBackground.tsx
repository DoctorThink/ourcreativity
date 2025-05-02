
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This effect manages the canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    let mousePosition = { x: 0, y: 0 };
    let isMouseMoving = false;
    let mouseMovingTimeout: ReturnType<typeof setTimeout>;
    
    // Resize handler for responsive canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate particles when resized
      initParticles();
    };
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
      isMouseMoving = true;
      
      // Add a few particles at mouse position
      if (Math.random() > 0.92) {
        addParticlesAtPosition(mousePosition.x, mousePosition.y, 2);
      }
      
      // Reset timeout
      clearTimeout(mouseMovingTimeout);
      mouseMovingTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Color palette for particles
        const colors = [
          "rgba(155, 109, 255, ", // amethyst
          "rgba(64, 224, 208, ",  // turquoise 
          "rgba(255, 127, 80, ",  // coral
          "rgba(255, 191, 0, ",   // amber
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Fade out gradually
        if (this.size > 0.2) this.size -= 0.008;
        if (this.opacity > 0) this.opacity -= 0.002;
        
        // Interact with mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1500;
            this.speedX -= Math.cos(angle) * force;
            this.speedY -= Math.sin(angle) * force;
          }
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.1;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    
    // Add particles at a specific position (for mouse interaction)
    const addParticlesAtPosition = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(
          x + Math.random() * 20 - 10,
          y + Math.random() * 20 - 10
        ));
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove faded particles and add new ones to maintain count
        if (particles[i].opacity <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
          
          if (Math.random() > 0.3) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
          }
        }
      }
      
      // Draw connecting lines between nearby particles
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance/100)})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Set up
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-70 pointer-events-none"
    />
  );
};
