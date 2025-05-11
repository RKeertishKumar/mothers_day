<script lang="ts">
  // Props
  export let theme: 'nature' | 'love' | 'cultural' | 'family' = 'nature';
  export let title: string = '';
  export let content: string = '';
  export let position: number = 0; // Position for color variation (map coloring problem)
  
  // Number of color variations per theme
  const colorVariations = 4;
  
  // Computed properties based on theme and position
  $: colorVariation = position % colorVariations;
  $: colors = getThemeColors(theme, colorVariation);
  $: icon = getThemeIcon(theme);
  
  // Get theme colors with variations
  function getThemeColors(theme: 'nature' | 'love' | 'cultural' | 'family', variation: number) {
    // Base colors for each theme
    const themeColors = {
      nature: [
        {
          primary: '#4CAF50',
          secondary: '#81C784',
          accent: '#1B5E20',
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
        },
        {
          primary: '#009688',
          secondary: '#80CBC4',
          accent: '#004D40',
          background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)'
        },
        {
          primary: '#8BC34A',
          secondary: '#AED581',
          accent: '#33691E',
          background: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)'
        },
        {
          primary: '#3F51B5',
          secondary: '#7986CB',
          accent: '#1A237E',
          background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)'
        }
      ],
      love: [
        {
          primary: '#E91E63',
          secondary: '#F48FB1',
          accent: '#880E4F',
          background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)'
        },
        {
          primary: '#F44336',
          secondary: '#EF9A9A',
          accent: '#B71C1C',
          background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)'
        },
        {
          primary: '#FF4081',
          secondary: '#FF80AB',
          accent: '#C51162',
          background: 'linear-gradient(135deg, #F8BBD0 0%, #F48FB1 100%)'
        },
        {
          primary: '#9C27B0',
          secondary: '#CE93D8',
          accent: '#4A148C',
          background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
        }
      ],
      cultural: [
        {
          primary: '#FF9800',
          secondary: '#FFCC80',
          accent: '#E65100',
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)'
        },
        {
          primary: '#FF5722',
          secondary: '#FF8A65',
          accent: '#BF360C',
          background: 'linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%)'
        },
        {
          primary: '#FFC107',
          secondary: '#FFE082',
          accent: '#FF6F00',
          background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
        },
        {
          primary: '#795548',
          secondary: '#A1887F',
          accent: '#3E2723',
          background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)'
        }
      ],
      family: [
        {
          primary: '#9C27B0',
          secondary: '#CE93D8',
          accent: '#4A148C',
          background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
        },
        {
          primary: '#673AB7',
          secondary: '#9575CD',
          accent: '#311B92',
          background: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)'
        },
        {
          primary: '#7B1FA2',
          secondary: '#BA68C8',
          accent: '#4A148C',
          background: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%)'
        },
        {
          primary: '#6A1B9A',
          secondary: '#AB47BC',
          accent: '#4A148C',
          background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
        }
      ]
    };
    
    // Return the appropriate color variation
    return themeColors[theme][variation];
  }
  
  // Get theme icon
  function getThemeIcon(theme: string) {
    switch (theme) {
      case 'nature':
        return 'tree';
      case 'love':
        return 'heart';
      case 'cultural':
        return 'landmark';
      case 'family':
        return 'users';
      default:
        return 'book';
    }
  }
  
  // Extract first few words for display (more on mobile)
  $: displayText = content.split(' ').slice(0, 15).join(' ') + '...';
</script>

<div class="themed-card-content" style="--primary: {colors.primary}; --secondary: {colors.secondary}; --accent: {colors.accent}; --background: {colors.background};">
  <div class="card-background"></div>
  
  <div class="icon-container">
    <i class="fas fa-{icon}"></i>
  </div>
  
  <div class="content-container">
    <h3>{title}</h3>
    <p>{displayText}</p>
  </div>
  
  <!-- Theme-specific decorative elements -->
  {#if theme === 'nature'}
    <div class="nature-elements">
      <div class="leaf leaf-1"></div>
      <div class="leaf leaf-2"></div>
      <div class="leaf leaf-3"></div>
    </div>
  {:else if theme === 'love'}
    <div class="love-elements">
      <div class="heart heart-1"></div>
      <div class="heart heart-2"></div>
    </div>
  {:else if theme === 'cultural'}
    <div class="cultural-elements">
      <div class="pattern pattern-1"></div>
      <div class="pattern pattern-2"></div>
    </div>
  {:else if theme === 'family'}
    <div class="family-elements">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  {/if}
</div>

<style>
  .themed-card-content {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    color: var(--accent);
  }
  
  .card-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background);
    z-index: 1;
    transition: transform 0.3s ease;
  }
  
  .themed-card-content:hover .card-background {
    transform: scale(1.05);
  }
  
  .icon-container {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    background-color: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 3;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .content-container {
    position: relative;
    z-index: 2;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* Add stronger gradient overlay to ensure text is readable */
    background: linear-gradient(to bottom, 
                 rgba(255, 255, 255, 0) 0%, 
                 rgba(0, 0, 0, 0.4) 70%);
  }
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    color: var(--accent);
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    font-weight: 600; /* Make title bolder for better readability */
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: white; /* Changed to white for better contrast */
    opacity: 1; /* Full opacity */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8); /* Stronger text shadow for better contrast */
    font-weight: 500; /* Slightly bolder */
  }
  
  /* Adjust for mobile */
  @media (max-width: 480px) {
    .content-container {
      padding: 15px; /* Smaller padding on mobile */
      padding-bottom: 30px; /* Extra padding at bottom to prevent overlap */
    }
    
    h3 {
      font-size: 1.1rem; /* Slightly smaller title on mobile */
    }
    
    p {
      font-size: 0.85rem; /* Slightly smaller text on mobile */
      line-height: 1.3; /* Tighter line height to fit more text */
    }
  }
  
  /* Nature theme elements */
  .nature-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .leaf {
    position: absolute;
    background-color: var(--primary);
    opacity: 0.2;
    border-radius: 50% 0;
    transform: rotate(45deg);
  }
  
  .leaf-1 {
    width: 40px;
    height: 40px;
    top: 20px;
    left: 20px;
    animation: float 8s ease-in-out infinite;
  }
  
  .leaf-2 {
    width: 25px;
    height: 25px;
    top: 60px;
    left: 50px;
    animation: float 6s ease-in-out infinite 1s;
  }
  
  .leaf-3 {
    width: 35px;
    height: 35px;
    top: 30px;
    left: 80px;
    animation: float 7s ease-in-out infinite 0.5s;
  }
  
  /* Love theme elements */
  .love-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .heart {
    position: absolute;
    background-color: var(--primary);
    opacity: 0.2;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
  }
  
  .heart::before,
  .heart::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: var(--primary);
    border-radius: 50%;
  }
  
  .heart::before {
    top: -15px;
    left: 0;
  }
  
  .heart::after {
    top: 0;
    left: -15px;
  }
  
  .heart-1 {
    top: 30px;
    left: 30px;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .heart-2 {
    top: 60px;
    left: 80px;
    width: 20px;
    height: 20px;
    animation: pulse 2s ease-in-out infinite 0.5s;
  }
  
  .heart-2::before,
  .heart-2::after {
    width: 20px;
    height: 20px;
  }
  
  .heart-2::before {
    top: -10px;
  }
  
  .heart-2::after {
    left: -10px;
  }
  
  /* Cultural theme elements */
  .cultural-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .pattern {
    position: absolute;
    opacity: 0.15;
  }
  
  .pattern-1 {
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    background: 
      linear-gradient(45deg, var(--primary) 25%, transparent 25%),
      linear-gradient(-45deg, var(--primary) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--primary) 75%),
      linear-gradient(-45deg, transparent 75%, var(--primary) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }
  
  .pattern-2 {
    top: 50px;
    left: 100px;
    width: 40px;
    height: 40px;
    background: 
      radial-gradient(circle, var(--primary) 20%, transparent 20%),
      radial-gradient(circle, var(--primary) 20%, transparent 20%);
    background-size: 15px 15px;
    background-position: 0 0, 7.5px 7.5px;
  }
  
  /* Family theme elements */
  .family-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .circle {
    position: absolute;
    border-radius: 50%;
    background-color: var(--primary);
    opacity: 0.2;
  }
  
  .circle-1 {
    width: 40px;
    height: 40px;
    top: 20px;
    left: 20px;
  }
  
  .circle-2 {
    width: 30px;
    height: 30px;
    top: 40px;
    left: 50px;
  }
  
  .circle-3 {
    width: 25px;
    height: 25px;
    top: 30px;
    left: 80px;
  }
  
  /* Animations */
  @keyframes float {
    0%, 100% {
      transform: rotate(45deg) translate(0, 0);
    }
    50% {
      transform: rotate(45deg) translate(5px, -5px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: rotate(45deg) scale(1);
    }
    50% {
      transform: rotate(45deg) scale(1.1);
    }
  }
</style>
