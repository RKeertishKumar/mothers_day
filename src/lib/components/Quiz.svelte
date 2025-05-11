<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { fadeSlideIn, bounce } from '$lib/animations';
  import { quizStore } from '$lib/stores/quizStore';
  
  let mounted = false;
  
  // Get the quiz state from the store
  $: quizState = $quizStore;
  $: currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  $: completed = quizState.completed;
  $: score = quizState.score;
  
  // Handle answer selection
  function selectAnswer(answer: string) {
    quizStore.answerQuestion(answer);
  }
  
  // Reset the quiz
  function resetQuiz() {
    quizStore.resetQuiz();
  }
  
  onMount(() => {
    mounted = true;
    
    // Add confetti when quiz is completed
    if (completed) {
      setTimeout(() => {
        createConfetti();
      }, 500);
    }
  });
  
  // Create confetti effect
  function createConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#1e88e5', '#6ab7ff', '#005cb2', '#ff6f00', '#ffffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * 2;
      
      // Apply styles
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${left}%`;
      confetti.style.animationDuration = `${animationDuration}s`;
      confetti.style.animationDelay = `${animationDelay}s`;
      
      container.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        if (container.contains(confetti)) {
          container.removeChild(confetti);
        }
      }, (animationDuration + animationDelay) * 1000);
    }
  }
</script>

<section class="quiz" id="quiz">
  <div class="container">
    <div class="section-header">
      <h2 in:fadeSlideIn={{ delay: 200 }}>The Creative Soul Explorer</h2>
      <p in:fadeSlideIn={{ delay: 300 }}>Discover your unique creative writing personality!</p>
    </div>
    
    <div class="quiz-container">
      {#if mounted}
        {#if !completed}
          <div class="question-card" in:fade={{ duration: 500 }}>
            <div class="question-number">
              Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
            </div>
            
            <h3>{currentQuestion.question}</h3>
            
            <div class="options">
              {#each currentQuestion.options as option}
                <button 
                  class="option-button"
                  on:click={() => selectAnswer(option)}
                  in:scale={{ duration: 300, delay: 200 }}
                >
                  {option}
                </button>
              {/each}
            </div>
          </div>
        {:else}
          <div class="result-card" in:scale={{ duration: 500 }}>
            <h3>Your Creative Soul Profile</h3>
            
            <div class="profile-icon" in:bounce={{ delay: 300 }}>
              <i class="fas fa-feather-alt"></i>
            </div>
            
            <h4 class="profile-title">The Thoughtful Storyteller</h4>
            
            <p class="result-message">
              Your creative spirit thrives on meaningful connections and authentic experiences. 
              You have a natural gift for weaving cultural elements into your narratives, creating 
              stories that resonate with depth and emotion. Nature serves as both your muse and 
              sanctuary, offering you the perfect setting to explore your rich inner world.
            </p>
            
            <p class="result-message">
              Your writing reflects a beautiful balance of reflection and observation, capturing 
              the subtle nuances of human experience with compassion and insight. Continue to 
              nurture your unique voice - the world needs your stories!
            </p>
            
            <div class="confetti-container" id="confetti-container"></div>
            
            <button class="reset-button" on:click={resetQuiz}>
              Explore Again
            </button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</section>

<style>
  .quiz {
    padding: var(--spacing-xl) 0;
    background-color: var(--background-color);
  }
  
  .quiz-container {
    max-width: 600px;
    margin: var(--spacing-xl) auto;
  }
  
  .question-card, .result-card {
    background-color: var(--card-background);
    border-radius: 8px;
    padding: var(--spacing-lg);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .question-number {
    font-size: var(--font-size-small);
    color: var(--text-color);
    opacity: 0.7;
    margin-bottom: var(--spacing-md);
  }
  
  .question-card h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--primary-dark);
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .option-button {
    padding: var(--spacing-md);
    background-color: white;
    border: 2px solid var(--primary-light);
    border-radius: 8px;
    font-size: var(--font-size-normal);
    transition: all 0.3s ease;
    cursor: pointer;
    color: black; /* Explicitly set text color to black for readability */
    font-weight: 500; /* Make text slightly bolder */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
  }
  
  .option-button:hover {
    background-color: var(--primary-light);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  }
  
  .result-card h3 {
    color: var(--primary-dark);
    margin-bottom: var(--spacing-lg);
  }
  
  .profile-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin: var(--spacing-md) 0;
    animation: float 3s ease-in-out infinite;
  }
  
  .profile-title {
    font-size: var(--font-size-large);
    color: var(--primary-dark);
    margin-bottom: var(--spacing-md);
    font-weight: 600;
  }
  
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: var(--primary-color);
    border-radius: 2px;
    animation: confetti-fall linear forwards;
    transform: rotate(45deg);
  }
  
  @keyframes confetti-fall {
    0% {
      transform: translateY(-100px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(500px) rotate(360deg);
      opacity: 0;
    }
  }
  
  .result-message {
    font-size: var(--font-size-medium);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
  }
  
  .reset-button {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: 30px;
    font-size: var(--font-size-normal);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .reset-button:hover {
    background-color: var(--primary-dark);
  }
  
  @media (max-width: 768px) {
    .quiz-container {
      width: 90%;
    }
  }
</style>
