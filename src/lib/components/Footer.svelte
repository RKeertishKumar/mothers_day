<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-message">
        <h3>Happy Mother's Day, Ramya!</h3>
        <p>With love and gratitude for everything you do.</p>
      </div>
      
      <div class="footer-nav">
        <a href="#hero">Home</a>
        <a href="#author">Author</a>
        <a href="#gallery">Gallery</a>
        <a href="#appreciation">Appreciation</a>
        <a href="#cooking">Cooking</a>
        <a href="#quiz">Quiz</a>
      </div>
      
      <div class="footer-copyright">
        <p>&copy; {currentYear} | Created with ❤️ for Mother's Day</p>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--primary-dark);
    color: white;
    padding: var(--spacing-lg) 0;
    margin-top: var(--spacing-xl);
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
  }
  
  .footer-message {
    text-align: center;
    margin-bottom: var(--spacing-md);
  }
  
  .footer-message h3 {
    font-size: var(--font-size-large);
    margin-bottom: var(--spacing-xs);
    color: white;
  }
  
  .footer-message p {
    opacity: 0.8;
  }
  
  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .footer-nav a {
    color: white;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    text-decoration: none;
  }
  
  .footer-nav a:hover {
    opacity: 1;
    text-decoration: underline;
  }
  
  .footer-copyright {
    font-size: var(--font-size-small);
    opacity: 0.6;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .footer-nav {
      gap: var(--spacing-sm);
    }
    
    .footer-nav a {
      padding: var(--spacing-xs);
    }
  }
</style>
