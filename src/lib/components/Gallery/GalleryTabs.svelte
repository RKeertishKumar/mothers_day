<script lang="ts">
  import { fade } from 'svelte/transition';
  import { galleryStore, type GalleryTab } from '$lib/stores/galleryStore';
  
  const tabs: { id: GalleryTab; label: string; icon: string; color: string }[] = [
    { id: 'nature', label: 'Nature', icon: 'leaf', color: '#4CAF50' },
    { id: 'love', label: 'Love & Relationships', icon: 'heart', color: '#E91E63' },
    { id: 'cultural', label: 'Cultural Stories', icon: 'landmark', color: '#FF9800' },
    { id: 'family', label: 'Family Stories', icon: 'users', color: '#9C27B0' }
  ];
  
  // Get the active tab from the store
  $: activeTab = $galleryStore.activeTab;
  
  // Set the active tab in the store
  function setActiveTab(tab: GalleryTab) {
    galleryStore.setActiveTab(tab);
  }
</script>

<div class="tabs-container">
  <div class="tabs">
    {#each tabs as tab}
      <button 
        class="tab" 
        class:active={activeTab === tab.id}
        on:click={() => setActiveTab(tab.id)}
        aria-selected={activeTab === tab.id}
        role="tab"
        style="--tab-color: {tab.color};"
      >
        <i class="fas fa-{tab.icon}"></i>
        <span>{tab.label}</span>
        {#if activeTab !== tab.id}
          <div class="click-hint">Click</div>
        {/if}
      </button>
    {/each}
  </div>
  
  <div class="tab-indicator-container">
    <div 
      class="tab-indicator" 
      style="--tab-index: {tabs.findIndex(t => t.id === activeTab)}; --tab-count: {tabs.length}; background-color: {tabs.find(t => t.id === activeTab)?.color || 'var(--primary-color)'};"
    ></div>
  </div>
</div>

<style>
  .tabs-container {
    position: relative;
    margin-bottom: var(--spacing-lg);
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
  }
  
  .tab {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: var(--text-color);
    font-size: var(--font-size-normal);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    opacity: 0.85;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .tab i {
    color: var(--tab-color);
    font-size: 0.9em;
    transition: transform 0.3s ease;
  }
  
  .tab:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: var(--tab-color);
  }
  
  .tab:hover i {
    transform: scale(1.2);
  }
  
  .tab.active {
    color: var(--tab-color);
    font-weight: 600;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.03);
    border-color: var(--tab-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .click-hint {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--tab-color);
    color: white;
    font-size: 0.6rem;
    padding: 2px 5px;
    border-radius: 10px;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    font-weight: bold;
  }
  
  .tab:hover .click-hint {
    opacity: 1;
    transform: scale(1);
  }
  
  .tab-indicator-container {
    position: relative;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .tab-indicator {
    position: absolute;
    height: 100%;
    width: calc(100% / var(--tab-count));
    background-color: var(--primary-color);
    border-radius: 3px;
    transition: transform 0.3s ease;
    transform: translateX(calc(var(--tab-index) * 100%));
  }
  
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: var(--spacing-xs);
      justify-content: flex-start;
    }
    
    .tab {
      white-space: nowrap;
      padding: var(--spacing-xs) var(--spacing-sm);
    }
  }
</style>
