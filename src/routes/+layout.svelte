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
