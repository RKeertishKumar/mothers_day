<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  export let count: number = 0;
  export let duration: number = 2000;
  export let label: string = 'Posts';
  
  const displayCount = tweened(0, {
    duration,
    easing: cubicOut
  });
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    // Start the animation after a short delay
    setTimeout(() => {
      displayCount.set(count);
    }, 500);
  });
</script>

<div class="counter-container">
  <div class="counter-value">
    {#if mounted}
      {Math.round($displayCount)}
    {:else}
      0
    {/if}
  </div>
  <div class="counter-label">{label}</div>
</div>

<style>
  .counter-container {
    text-align: center;
    padding: var(--spacing-md);
  }
  
  .counter-value {
    font-size: var(--font-size-xxl);
    font-weight: bold;
    color: var(--primary-color);
    line-height: 1;
    margin-bottom: var(--spacing-xs);
  }
  
  .counter-label {
    font-size: var(--font-size-medium);
    color: var(--text-color);
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .counter-value {
      font-size: calc(var(--font-size-xxl) * 0.8);
    }
    
    .counter-label {
      font-size: var(--font-size-normal);
    }
  }
</style>
