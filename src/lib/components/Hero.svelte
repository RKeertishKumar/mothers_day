<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { createParticles, typewriter } from '$lib/animations';
  import { createPhysicsBalloons } from '$lib/animations/physics-balloons';
  
  let canvas: HTMLCanvasElement;
  let heroContainer: HTMLElement;
  let mounted = false;
  
  onMount(() => {
    // Initialize particles
    const particlesCleanup = createParticles(canvas, {
      color: '#1e88e5',
      count: 70,
      speed: 0.5
    });
    
    // Initialize physics-based balloons
    const balloonsCleanup = createPhysicsBalloons(heroContainer);
    
    mounted = true;
    
    return () => {
      if (particlesCleanup) particlesCleanup();
      if (balloonsCleanup) balloonsCleanup.cleanup();
    };
  });
</script>

<section class="hero" bind:this={heroContainer}>
  <canvas bind:this={canvas} class="particles-canvas"></canvas>
  
  <div class="hero-content">
    {#if mounted}
      <h1 in:typewriter={{ speed: 2, delay: 300 }}>Happy Mother's Day</h1>
      <h2 in:fly={{ y: 20, duration: 800, delay: 1000 }}>Ramya R</h2>
      
      <div class="title-badge" in:fade={{ duration: 1000, delay: 1800 }}>
        <span class="title">Literary Captain</span>
      </div>
    {/if}
  </div>
  
  <div class="scroll-indicator" in:fade={{ duration: 1000, delay: 2500 }}>
    <span>Scroll Down</span>
    <i class="fas fa-chevron-down"></i>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 100vh;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
    color: white;
  }
  
  .particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: var(--spacing-lg);
  }
  
  h1 {
    font-size: calc(var(--font-size-xxl) * 1.5);
    margin-bottom: var(--spacing-md);
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-lg);
    color: white;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .title-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }
  
  .title {
    font-size: var(--font-size-medium);
    font-weight: 500;
  }
  
  .badge {
    background-color: var(--accent-color);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: 20px;
    font-size: var(--font-size-small);
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 40px; /* Higher from bottom to avoid balloons */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    opacity: 1; /* Full opacity */
    animation: bounce 2s infinite;
    z-index: 20; /* Even higher z-index to ensure it's above all elements */
    background-color: rgba(0, 0, 0, 0.8); /* More opaque background */
    padding: 12px 24px;
    border-radius: 30px;
    backdrop-filter: blur(8px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(0, 0, 0, 0.3); /* Enhanced glow effect */
    border: 2px solid rgba(255, 255, 255, 0.3); /* More visible border */
    cursor: pointer; /* Show pointer cursor on hover */
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .scroll-indicator:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 35px rgba(0, 0, 0, 0.4);
  }
  
  .scroll-indicator span {
    font-size: var(--font-size-small);
    margin-bottom: var(--spacing-xs);
  }
  
  .scroll-indicator i {
    font-size: var(--font-size-medium);
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: var(--font-size-xxl);
    }
    
    h2 {
      font-size: var(--font-size-xl);
    }
  }
  
  /* Physics-based balloon styles */
  :global(.physics-balloon) {
    position: absolute;
    width: 40px;
    height: 50px;
    background-color: var(--primary-color);
    border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
    z-index: 1;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    will-change: transform;
  }
  
  :global(.physics-balloon-string) {
    position: absolute;
    width: 1px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.7);
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  @media (max-width: 480px) {
    .hero {
      min-height: 400px;
    }
    
    h1 {
      font-size: calc(var(--font-size-xl) * 1.2);
    }
    
    h2 {
      font-size: var(--font-size-large);
    }
  }
</style>
