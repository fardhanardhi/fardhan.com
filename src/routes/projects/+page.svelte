<script lang="ts">
  import ComingSoon from '../coming-soon.svelte';
  import * as config from '$lib/config';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Projects - {config.pageTitle}</title>
</svelte:head>

<ComingSoon />
