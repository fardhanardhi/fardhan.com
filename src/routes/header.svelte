<script lang="ts">
  import { onMount } from 'svelte';
  import * as config from '$lib/config';

  let darkMode = $state(false);

  onMount(() => {
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode !== null) {
      darkMode = savedDarkMode === 'true';
    } else {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  $effect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'halloween');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });

  function toggleDarkMode() {
    darkMode = !darkMode;

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    }
  }
</script>

<svelte:head>
  <!-- Add this script to make Tailwind dark mode work -->
  <script>
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</svelte:head>

<nav
  class="base-300 fixed top-0 z-50 mx-auto w-full max-w-7xl justify-between px-4 py-4 transition-colors duration-200 md:flex md:px-8 md:py-8"
>
  <a href="/" class="title flex-1">
    <b>{config.title}</b>
  </a>

  <ul class="my-4 flex-3 justify-center md:my-0 md:flex md:gap-8">
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a href="/contact">Contact</a>
    </li>
    <li>
      <a href="/rss.xml" target="_blank">RSS</a>
    </li>
  </ul>

  <!-- Dark Mode Toggle -->
  <div class="flex-1 md:text-end">
    <button
      class="rounded-full bg-gray-200 p-2 text-gray-800 transition-colors duration-100 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      onclick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {#if darkMode}
        <!-- Sun icon for light mode -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-sun"
          ><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"
          ></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"
          ></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"
          ></path><path d="m19.07 4.93-1.41 1.41"></path></svg
        >
      {:else}
        <!-- Moon icon for dark mode -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg
        >
      {/if}
    </button>
  </div>
</nav>
