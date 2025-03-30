<script>
  import { page } from '$app/state';
</script>

<div class="error">
  <h1>{page.status}: {page.error?.message} 😭</h1>
</div>

<style lang="postcss">
  @reference "../app.css";

  .error {
    @apply h-full py-20;
    @apply grid;
    @apply place-content-center;
  }
</style>
