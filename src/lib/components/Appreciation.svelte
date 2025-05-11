<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { fadeSlideIn, typewriter } from '$lib/animations';
  
  let mounted = false;
  
  // Appreciation messages
  const appreciationPoints = [
    {
      icon: 'fa-heart',
      title: 'Unconditional Support',
      content: 'Thank you for always standing up for my decisions against dad and family. Your support means everything to me.'
    },
    {
      icon: 'fa-comments',
      title: 'Better Communication',
      content: 'I appreciate how you\'ve improved in communicating with me. Our conversations are more meaningful now.'
    },
    {
      icon: 'fa-language',
      title: 'Persistent Learning',
      content: 'Your dedication to learning Kannada despite challenges inspires me. Your persistence is admirable.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'My Protector',
      content: 'You\'ve always been my shield, protecting me and standing up for what\'s right. Thank you for being my advocate.'
    }
  ];
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="appreciation" id="appreciation">
  <div class="container">
    <div class="section-header">
      <h2 in:fadeSlideIn={{ delay: 200 }}>Gratitude & Appreciation</h2>
      <p in:fadeSlideIn={{ delay: 300 }}>The countless ways you've supported and loved me through the years.</p>
    </div>
    
    <div class="appreciation-grid">
      {#if mounted}
        {#each appreciationPoints as point, i}
          <div 
            class="appreciation-card"
            in:fly={{ y: 30, duration: 800, delay: 400 + (i * 200) }}
          >
            <div class="icon">
              <i class={`fas ${point.icon}`}></i>
            </div>
            <h3>{point.title}</h3>
            <p>{point.content}</p>
          </div>
        {/each}
      {/if}
    </div>
    
    <div class="special-message">
      {#if mounted}
        <div class="message-container" in:fade={{ duration: 1000, delay: 1200 }}>
          <h3 in:typewriter={{ speed: 3, delay: 1500 }}>Thank You For Everything, Mom</h3>
          <p in:fadeSlideIn={{ delay: 2500 }}>
            Your kindness, your weird habits (that sometimes annoy me), your OCD, your cooking, 
            your writing, and everything that makes you uniquely you - I cherish it all. 
            Please continue to communicate and share your thoughts with me.
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .appreciation {
    padding: var(--spacing-xl) 0;
    background-color: var(--background-color);
    position: relative;
  }
  
  .appreciation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin: var(--spacing-xl) 0;
  }
  
  .appreciation-card {
    background-color: var(--card-background);
    border-radius: 8px;
    padding: var(--spacing-lg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .appreciation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }
  
  .appreciation-card h3 {
    margin-bottom: var(--spacing-sm);
    color: var(--primary-dark);
  }
  
  .appreciation-card p {
    color: var(--text-color);
    line-height: 1.6;
  }
  
  .special-message {
    margin-top: var(--spacing-xl);
    text-align: center;
  }
  
  .message-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-lg);
    background-color: var(--primary-light);
    color: white;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .message-container h3 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-md);
    color: white;
  }
  
  .message-container p {
    font-size: var(--font-size-medium);
    line-height: 1.8;
  }
  
  @media (max-width: 768px) {
    .appreciation-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-md);
    }
    
    .message-container {
      padding: var(--spacing-md);
    }
    
    .message-container h3 {
      font-size: var(--font-size-large);
    }
    
    .message-container p {
      font-size: var(--font-size-normal);
    }
  }
  
  @media (max-width: 480px) {
    .appreciation-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
