<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';
  import * as config from '$lib/config';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Blog - {config.pageTitle}</title>
</svelte:head>

<section>
  <ul class="posts">
    {#each data.posts as post}
      <li class="post">
        <a href="/blog/{post.slug}" class="title">{post.title}</a>
        <p class="date">{formatDate(post.date)}</p>
        <p class="description">{post.description}</p>
      </li>
    {/each}
  </ul>
</section>

<style lang="postcss">
  @reference "../../app.css";

  .posts {
    @apply grid gap-7;

    .post {
      &:not(:last-child) {
        @apply border-base-content/30 border-b pb-7;
      }

      .title {
        @apply text-primary text-5xl capitalize;
      }

      .date {
        @apply text-secondary;
      }

      .description {
        @apply mt-3;
      }
    }
  }
</style>
