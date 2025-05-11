import { cubicInOut, cubicOut, elasticOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

// Typewriter effect for text
export function typewriter(node: Element, { speed = 1, delay = 0 }: { speed?: number, delay?: number } = {}): TransitionConfig {
  const valid = (
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE
  );

  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child`);
  }

  const text = node.textContent || '';
  const duration = text.length / (speed * 0.01);

  return {
    delay,
    duration,
    tick: (t: number) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}

// Fade and slide in from bottom
export function fadeSlideIn(node: Element, { delay = 0, duration = 400, y = 20 }: { delay?: number, duration?: number, y?: number } = {}): TransitionConfig {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased * opacity};
        transform: ${transform} translate3d(0, ${(1 - eased) * y}px, 0);
      `;
    }
  };
}

// Stagger children animations
export function stagger(node: Element, { delay = 0, staggerDelay = 100 }: { delay?: number, staggerDelay?: number } = {}): void {
  const children = Array.from(node.children);
  
  children.forEach((child, index) => {
    const childDelay = delay + (index * staggerDelay);
    
    // Add a data attribute for the delay that can be used in CSS
    child.setAttribute('data-stagger-delay', childDelay.toString());
    
    // Add a class to trigger animations in CSS
    setTimeout(() => {
      child.classList.add('stagger-visible');
    }, childDelay);
  });
}

// Bounce animation
export function bounce(node: Element, { delay = 0, duration = 800 }: { delay?: number, duration?: number } = {}): TransitionConfig {
  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = elasticOut(t);
      return `transform: scale(${eased})`;
    }
  };
}

// Particles animation
export function createParticles(canvas: HTMLCanvasElement, { color = '#1e88e5', count = 50, speed = 1 }: { color?: string, count?: number, speed?: number } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Set canvas size to match parent
  const resizeCanvas = () => {
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create particles
  const particles: {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }[] = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
  
  // Animation loop
  function animate() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
}
