<script lang="ts">
  export let name: string;
  export let active: boolean = false;
  export let onClick: (() => void) | null = null;
  
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

<button 
  class="category-badge" 
  class:active
  on:click={handleClick}
  type={onClick ? "button" : "submit"}
  disabled={!onClick}
>
  {name}
</button>

<style>
  .category-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    background-color: var(--primary-light);
    color: white;
    font-size: var(--font-size-small);
    margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
  }
  
  .category-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .category-badge.active {
    background-color: var(--primary-dark);
    border-color: var(--primary-color);
  }
  
  .category-badge[disabled] {
    cursor: default;
    opacity: 0.8;
  }
  
  .category-badge[disabled]:hover {
    transform: none;
    box-shadow: none;
  }
</style>
