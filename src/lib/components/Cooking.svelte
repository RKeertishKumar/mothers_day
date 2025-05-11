<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { fadeSlideIn } from '$lib/animations';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="cooking" id="cooking">
  <div class="container">
    <div class="section-header">
      <h2 in:fadeSlideIn={{ delay: 200 }}>Culinary Delights</h2>
      <p in:fadeSlideIn={{ delay: 300 }}>Celebrating mom's delicious cooking that brings joy to our family.</p>
    </div>
    
    <div class="cooking-showcase">
      {#if mounted}
        <div class="dish-image" in:fade={{ duration: 800, delay: 400 }}>
          <img src="/images/cooking/chicken-curry.jpg" alt="Chicken Curry" />
          <div class="image-caption">Today's Special: Chicken Curry</div>
        </div>
        
        <div class="dish-details" in:fly={{ x: 30, duration: 800, delay: 600 }}>
          <h3>Chicken Curry</h3>
          <div class="dish-description">
            <p>
              Mom's chicken curry is a family favorite, prepared with love and care. 
              The perfect blend of spices creates a rich, aromatic dish that brings 
              everyone to the table with anticipation.
            </p>
            
            <div class="cooking-notes">
              <h4>What Makes It Special</h4>
              <ul>
                <li>Perfect balance of spices</li>
                <li>Tender chicken pieces</li>
                <li>Rich, flavorful gravy</li>
                <li>Made with love and attention to detail</li>
              </ul>
            </div>
            
            <div class="cooking-quote">
              <i class="fas fa-quote-left"></i>
              <p>
                "Cooking is like love. It should be entered into with abandon or not at all."
              </p>
              <i class="fas fa-quote-right"></i>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .cooking {
    padding: var(--spacing-xl) 0;
    background-color: white;
  }
  
  .cooking-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    align-items: center;
  }
  
  .dish-image {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .dish-image img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }
  
  .dish-image:hover img {
    transform: scale(1.05);
  }
  
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-small);
    text-align: center;
  }
  
  .dish-details h3 {
    font-size: var(--font-size-xl);
    color: var(--primary-dark);
    margin-bottom: var(--spacing-md);
  }
  
  .dish-description p {
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
  }
  
  .cooking-notes {
    background-color: var(--background-color);
    padding: var(--spacing-md);
    border-radius: 8px;
    margin-bottom: var(--spacing-md);
  }
  
  .cooking-notes h4 {
    margin-bottom: var(--spacing-sm);
    color: var(--primary-dark);
  }
  
  .cooking-notes ul {
    padding-left: var(--spacing-lg);
  }
  
  .cooking-notes li {
    margin-bottom: var(--spacing-xs);
  }
  
  .cooking-quote {
    position: relative;
    padding: var(--spacing-md) var(--spacing-lg);
    font-style: italic;
    color: var(--primary-dark);
    text-align: center;
  }
  
  .cooking-quote i {
    color: var(--primary-light);
    font-size: var(--font-size-large);
    opacity: 0.5;
  }
  
  .cooking-quote i.fa-quote-left {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .cooking-quote i.fa-quote-right {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  
  @media (max-width: 768px) {
    .cooking-showcase {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
    
    .dish-image {
      margin-bottom: var(--spacing-md);
    }
  }
</style>
