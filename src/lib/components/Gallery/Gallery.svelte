<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { fadeSlideIn } from '$lib/animations';
  import { galleryStore, type GalleryItem } from '$lib/stores/galleryStore';
  import GalleryTabs from './GalleryTabs.svelte';
  import Card from '../shared/Card.svelte';
  
  // Get the active tab and items from the store
  $: activeTab = $galleryStore.activeTab;
  $: items = $galleryStore.items[activeTab];
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="gallery" id="gallery">
  <div class="container">
    <div class="section-header">
      <h2 in:fadeSlideIn={{ delay: 200 }}>Poetry & Stories</h2>
      <p in:fadeSlideIn={{ delay: 300 }}>Explore Ramya's creative writing across different themes and genres.</p>
    </div>
    
    <GalleryTabs />
    
    <div class="gallery-content">
      {#if mounted}
        {#key activeTab}
          <div class="cards-grid" in:fade={{ duration: 300 }}>
            {#each items as item, i}
              <div in:fadeSlideIn={{ delay: 200 + (i * 100), y: 30 }}>
                <Card 
                  image={item.image} 
                  title={item.title} 
                  content={item.content} 
                  date={item.date}
                  categories={item.categories}
                  position={i}
                />
              </div>
            {/each}
          </div>
        {/key}
      {/if}
    </div>
  </div>
</section>

<style>
  .gallery {
    padding: var(--spacing-xl) 0;
    background-color: white;
  }
  
  .section-header p {
    max-width: 600px;
    margin: 0 auto var(--spacing-lg);
    color: var(--text-color);
    opacity: 0.8;
  }
  
  .gallery-content {
    margin-top: var(--spacing-lg);
  }
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }
  
  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--spacing-md);
    }
  }
  
  @media (max-width: 480px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
