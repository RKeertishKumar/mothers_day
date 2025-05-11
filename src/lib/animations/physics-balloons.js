/**
 * Physics-based balloon animation using Matter.js
 */

// We'll use a simple physics implementation without external dependencies
export function createPhysicsBalloons(container) {
  if (!container) return { cleanup: () => {} };
  
  // Balloon configuration
  const config = {
    balloonCount: 15,
    colors: ['#1e88e5', '#6ab7ff', '#005cb2', '#ff6f00', '#f06292', '#7e57c2', '#26a69a'],
    minSize: 40,
    maxSize: 80,
    gravity: -0.05,
    bounce: 0.7,
    friction: 0.99,
    windStrength: 0.02
  };
  
  // Store balloons
  const balloons = [];
  
  // Container dimensions
  let width = container.clientWidth;
  let height = container.clientHeight;
  
  // Handle window resize
  const handleResize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
  };
  
  window.addEventListener('resize', handleResize);
  
  // Create balloon elements
  for (let i = 0; i < config.balloonCount; i++) {
    createBalloon();
  }
  
  // Animation variables
  let animationId;
  let lastTime = 0;
  let windDirection = Math.random() * 0.1 - 0.05;
  let windChangeTimer = 0;
  
  // Start animation loop
  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Change wind direction occasionally
    windChangeTimer += deltaTime;
    if (windChangeTimer > 2000) {
      windDirection = Math.random() * 0.1 - 0.05;
      windChangeTimer = 0;
    }
    
    // Update each balloon
    balloons.forEach(balloon => {
      updateBalloon(balloon, deltaTime, windDirection);
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Start animation
  animationId = requestAnimationFrame(animate);
  
  // Create a single balloon
  function createBalloon() {
    // Create balloon element
    const balloonEl = document.createElement('div');
    balloonEl.className = 'physics-balloon';
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    
    // Apply styles
    balloonEl.style.width = `${size}px`;
    balloonEl.style.height = `${size * 1.2}px`;
    balloonEl.style.backgroundColor = color;
    
    // Create balloon string
    const stringEl = document.createElement('div');
    stringEl.className = 'physics-balloon-string';
    balloonEl.appendChild(stringEl);
    
    // Add to container
    container.appendChild(balloonEl);
    
    // Physics properties
    const balloon = {
      element: balloonEl,
      x: Math.random() * width,
      y: height + Math.random() * 200, // Start below the screen
      vx: Math.random() * 2 - 1,
      vy: Math.random() * -2 - 1,
      size: size,
      rotation: Math.random() * 30 - 15,
      rotationSpeed: Math.random() * 0.2 - 0.1
    };
    
    balloons.push(balloon);
    return balloon;
  }
  
  // Update balloon position
  function updateBalloon(balloon, deltaTime, windDirection) {
    // Apply forces
    balloon.vy += config.gravity; // Gravity (negative for upward force)
    balloon.vx += windDirection * config.windStrength; // Wind
    
    // Apply friction
    balloon.vx *= config.friction;
    balloon.vy *= config.friction;
    
    // Update position
    balloon.x += balloon.vx * deltaTime * 0.1;
    balloon.y += balloon.vy * deltaTime * 0.1;
    balloon.rotation += balloon.rotationSpeed * deltaTime * 0.1;
    
    // Bounce off walls
    if (balloon.x < -balloon.size) {
      balloon.x = width + balloon.size;
    } else if (balloon.x > width + balloon.size) {
      balloon.x = -balloon.size;
    }
    
    // If balloon goes off top, reset from bottom
    if (balloon.y < -balloon.size * 2) {
      balloon.y = height + balloon.size;
      balloon.x = Math.random() * width;
      balloon.vy = Math.random() * -2 - 1;
    }
    
    // If balloon goes off bottom, give upward velocity
    if (balloon.y > height + balloon.size * 2) {
      balloon.vy = Math.random() * -2 - 2;
    }
    
    // Update element
    balloon.element.style.transform = `translate(${balloon.x}px, ${balloon.y}px) rotate(${balloon.rotation}deg)`;
  }
  
  // Cleanup function
  function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    
    // Remove all balloons
    balloons.forEach(balloon => {
      if (balloon.element.parentNode) {
        balloon.element.parentNode.removeChild(balloon.element);
      }
    });
  }
  
  return { cleanup };
}
