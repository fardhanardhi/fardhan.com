<script lang="ts">
  import Footer from './footer.svelte';
  import Header from './header.svelte';

  // import 'open-props/style';
  // import 'open-props/normalize';
  // import 'open-props/buttons';
  import '../app.css';

  let { children, data } = $props();
</script>

<div class="gridrows-1 mx-auto grid h-full max-w-7xl">
  <Header />

  <main class="container-fluid">
    {@render children?.()}
  </main>

  <!-- <Footer /> -->
</div>

<style lang="postcss">
  /* This ensures the dark mode works with Tailwind */
  :global(html) {
    height: 100%;
    @apply transition-colors duration-200;
    background-color: var(--color-base-200);
  }

  :global(body) {
    height: 100%;
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
</style>
