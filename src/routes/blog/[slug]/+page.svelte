<script lang="ts">
  import { formatDate } from '$lib/utils';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {formatDate(data.meta.date)}</p>
  </hgroup>

  <div class="tags">
    {#each data.meta.categories as category}
      <span class="surface-4">&num;{category}</span>
    {/each}
  </div>

  <div class="prose">
    <data.content />
  </div>
</article>

<!-- <style>
  article {
    max-inline-size: var(--size-content-3);
    margin-inline: auto;

    h1 {
      text-transform: capitalize;
    }

    h1 + p {
      margin-top: var(--size-2);
      color: var(--text-2);
    }

    .tags {
      display: flex;
      gap: var(--size-3);
      margin-top: var(--size-7);

      > * {
        padding: var(--size-2) var(--size-3);
        border-radius: var(--radius-round);
      }
    }
  }
</style> -->

<style lang="postcss">
  @reference "../../../app.css";

  article {
    @apply mx-auto max-w-3xl;
  }

  article h1 {
    @apply capitalize;
  }

  article h1 + p {
    @apply mt-2 text-gray-500;
  }

  article .tags {
    @apply mt-7 flex gap-3;
  }

  article .tags > * {
    @apply rounded-full px-3 py-2;
  }
</style>
