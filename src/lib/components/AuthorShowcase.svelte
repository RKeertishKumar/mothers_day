<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { fadeSlideIn } from '$lib/animations';
  import PostCounter from './shared/PostCounter.svelte';
  import CategoryBadge from './shared/CategoryBadge.svelte';
  
  const categories = [
    'Abstract', 'Action', 'Classics', 'Fantasy', 'Children', 'Inspirational'
  ];
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="author-showcase" id="author">
  <div class="container">
    <div class="section-header">
      <h2 in:fadeSlideIn={{ delay: 200 }}>Prolific Writer</h2>
    </div>
    
    <div class="stats-container">
      {#if mounted}
        <div class="stat-card" in:fly={{ y: 20, duration: 800, delay: 300 }}>
          <PostCounter count={4609} duration={3000} label="Posts" />
        </div>
        
        <div class="stat-card" in:fly={{ y: 20, duration: 800, delay: 500 }}>
          <PostCounter count={48} duration={2000} label="Followers" />
        </div>
      {/if}
    </div>
    
    <div class="categories-container">
      <h3 in:fadeSlideIn={{ delay: 700 }}>Writing Categories</h3>
      
      <div class="categories-grid">
        {#if mounted}
          {#each categories as category, i}
            <div in:fade={{ delay: 800 + (i * 100) }}>
              <CategoryBadge name={category} />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .author-showcase {
    padding: var(--spacing-xl) 0;
    background-color: var(--background-color);
  }
  
  .stats-container {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }
  
  .stat-card {
    background-color: var(--card-background);
    border-radius: 8px;
    padding: var(--spacing-md);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .categories-container {
    text-align: center;
    margin-top: var(--spacing-xl);
  }
  
  .categories-container h3 {
    margin-bottom: var(--spacing-md);
    color: var(--primary-dark);
  }
  
  .categories-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }
  
  @media (max-width: 768px) {
    .stats-container {
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    .stat-card {
      width: 80%;
      max-width: 300px;
    }
  }
  
  @media (max-width: 480px) {
    .stat-card {
      width: 90%;
    }
  }
</style>
