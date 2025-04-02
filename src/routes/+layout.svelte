<script lang="ts">
  import Footer from './footer.svelte';
  import Header from './header.svelte';
  import PageTransition from './transition.svelte';

  // import 'open-props/style';
  // import 'open-props/normalize';
  // import 'open-props/buttons';
  import '../app.css';

  let { children, data } = $props();
</script>

<div class="h-dvh overflow-auto">
  <div class="gridrows-1 mx-auto grid max-w-7xl">
    <Header />

    <main class="container-fluid">
      <PageTransition url={data.url}>
        {@render children?.()}
      </PageTransition>
    </main>

    <!-- <Footer /> -->
  </div>
</div>

<style lang="postcss">
  @reference "../app.css";

  /* This ensures the dark mode works with Tailwind */
  :global(html) {
    /* height: 100%; */
    @apply transition-colors duration-200;
    background-color: var(--color-base-200);
  }

  :global(body) {
    /* height: 100%; */
    margin: 0;
    font-family:
      Atkinson Hyperlegible,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  :global(code, pre, tt, kbd, samp) {
    font-family:
      JetBrains Mono,
      'Noto Sans Mono',
      monospace;
  }
</style>
