<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ThemedCardContent from './ThemedCardContent.svelte';
  
  // Props
  export let image = '';
  export let title = '';
  export let content = '';
  export let date = '';
  export let categories: string[] = [];
  export let flippable = true;
  export let position = 0; // Position for color variation
  
  // State
  let isFlipped = false;
  let mounted = false;
  
  // Determine theme based on categories
  $: theme = determineTheme(categories);
  
  // Determine theme from categories
  function determineTheme(categories: string[]): 'nature' | 'love' | 'cultural' | 'family' {
    // Convert categories to lowercase for case-insensitive comparison
    const lowerCategories = categories.map(cat => cat.toLowerCase());
    const lowerTitle = title.toLowerCase();
    
    if (lowerCategories.includes('nature') || lowerCategories.includes('abstract')) {
      return 'nature';
    } else if (lowerCategories.includes('love') || lowerTitle.includes('love')) {
      return 'love';
    } else if (lowerCategories.includes('cultural') || lowerCategories.includes('historical')) {
      return 'cultural';
    } else if (lowerCategories.includes('family') || lowerCategories.includes('children')) {
      return 'family';
    }
    
    // Default based on image path
    if (image.includes('nature')) {
      return 'nature';
    } else if (image.includes('love')) {
      return 'love';
    } else if (image.includes('cultural')) {
      return 'cultural';
    } else if (image.includes('family')) {
      return 'family';
    }
    
    // Check title for keywords
    if (lowerTitle.includes('nature') || lowerTitle.includes('beauty') || lowerTitle.includes('peaceful')) {
      return 'nature';
    } else if (lowerTitle.includes('love') || lowerTitle.includes('shades') || lowerTitle.includes('digital')) {
      return 'love';
    } else if (lowerTitle.includes('cultural') || lowerTitle.includes('india') || lowerTitle.includes('year') || lowerTitle.includes('jhansi')) {
      return 'cultural';
    } else if (lowerTitle.includes('family') || lowerTitle.includes('child') || lowerTitle.includes('marriage') || lowerTitle.includes('parents')) {
      return 'family';
    }
    
    return 'nature'; // Default
  }
  
  // Toggle card flip
  function toggleFlip() {
    if (flippable) {
      isFlipped = !isFlipped;
    }
  }
  
  onMount(() => {
    mounted = true;
  });
</script>

<div 
  class="card-container" 
  class:flippable
  on:click={toggleFlip}
  on:keydown={(e) => e.key === 'Enter' && toggleFlip()}
  tabindex="0"
  role={flippable ? "button" : "article"}
  aria-label={flippable ? `Card: ${title}, click to flip` : title}
>
  {#if mounted}
    <div class="card-inner" class:is-flipped={isFlipped}>
      <div class="card-front" in:fade={{ duration: 300, delay: 300 }}>
        <div class="card-image">
          <ThemedCardContent {theme} {title} {content} {position} />
        </div>
        <div class="card-title">
          <h3>{title}</h3>
        </div>
        {#if categories.length > 0}
          <div class="card-categories">
            {#each categories as category}
              <span class="category">{category}</span>
            {/each}
          </div>
        {/if}
        {#if flippable}
          <div class="flip-hint">
            <i class="fas fa-sync-alt"></i>
          </div>
        {/if}
      </div>
      
      {#if flippable}
        <div class="card-back" in:fade={{ duration: 300, delay: 300 }}>
          <div class="card-content">
            <p>{content}</p>
          </div>
          {#if date}
            <div class="card-date">
              <small>{date}</small>
            </div>
          {/if}
          <div class="flip-hint">
            <i class="fas fa-sync-alt"></i>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .card-container {
    perspective: 1000px;
    width: 100%;
    height: 100%;
    min-height: 300px;
    margin-bottom: var(--spacing-lg);
  }
  
  .flippable {
    cursor: pointer;
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .is-flipped {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--card-background);
    display: flex;
    flex-direction: column;
  }
  
  .card-back {
    transform: rotateY(180deg);
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .card-container:hover .card-image img {
    transform: scale(1.05);
  }
  
  .card-title {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .card-title h3 {
    margin: 0;
    font-size: var(--font-size-medium);
  }
  
  .card-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
  }
  
  .card-date {
    color: var(--text-color);
    opacity: 0.7;
    margin-top: var(--spacing-md);
  }
  
  .card-categories {
    padding: 0 var(--spacing-md) var(--spacing-md);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  
  .category {
    background-color: var(--primary-light);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: var(--font-size-small);
  }
  
  .flip-hint {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    color: var(--primary-color);
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .card-container:hover .flip-hint {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .card-image {
      height: 180px;
    }
    
    .card-title {
      padding: var(--spacing-xs) var(--spacing-md);
    }
    
    .card-categories {
      padding: 0 var(--spacing-md) var(--spacing-xs);
    }
  }
  
  @media (max-width: 480px) {
    .card-container {
      min-height: 280px; /* Slightly shorter on mobile */
    }
    
    .card-image {
      height: 160px; /* Slightly taller to show more content */
    }
    
    .card-title {
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
      margin-top: -5px; /* Reduced overlap with the image */
      position: relative;
      z-index: 3; /* Above the image */
      border-radius: 8px 8px 0 0;
    }
    
    .card-title h3 {
      font-size: var(--font-size-normal);
    }
    
    .card-categories {
      padding: 0 var(--spacing-md) var(--spacing-xs);
      background-color: var(--card-background);
    }
    
    .category {
      font-size: calc(var(--font-size-small) - 1px);
      padding: 1px 6px;
    }
  }
</style>
