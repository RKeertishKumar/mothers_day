<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import AuthorShowcase from '$lib/components/AuthorShowcase.svelte';
  import Gallery from '$lib/components/Gallery/Gallery.svelte';
  import Appreciation from '$lib/components/Appreciation.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<main>
  <Hero />
  <AuthorShowcase />
  <Gallery />
  <Appreciation />
  <Quiz />
  <Footer />
</main>

<style>
  main {
    width: 100%;
    overflow-x: hidden;
  }
</style>
