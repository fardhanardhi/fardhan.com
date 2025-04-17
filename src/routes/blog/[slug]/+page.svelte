<script lang="ts">
  import { page } from '$app/state';
  import * as config from '$lib/config';
  import Doodle from '$lib/posts/doodle.svelte';
  import { formatDate } from '$lib/utils';

  let { data } = $props();

  const images = import.meta.glob<Record<string, string>>('/src/lib/assets/blog/*.{jpg,png,webp}', {
    eager: true
  });
  const filename = `${page.params.slug}.jpg`;
  // Adjust path as needed to match the filenames
  const match = Object.entries(images).find(([path]) => path.endsWith(filename));
  const doodle = match ? match[1].default : null;
</script>

<svelte:head>
  <title>{data.meta.title} - {config.pageTitle}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  {#if doodle}
    <Doodle className="mb-14" src={doodle} />
  {/if}

  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {formatDate(data.meta.date)}</p>
  </hgroup>

  <div class="tags">
    {#each data.meta.categories as category}
      <span class="bg-primary/10">&num;{category}</span>
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
    h1 {
      @apply text-5xl capitalize;
    }

    h1 + p {
      @apply text-secondary mt-2;
    }

    .tags {
      @apply mt-4 flex gap-4;
    }

    .tags > * {
      @apply rounded-full px-4 py-2;
    }
  }
</style>
