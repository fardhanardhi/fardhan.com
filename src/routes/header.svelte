<script lang="ts">
  import { onMount } from 'svelte';
  import * as config from '$lib/config';

  let darkMode: boolean | null = $state(null);

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
      document.documentElement.setAttribute('data-theme', 'sunset');
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

<div class="navbar text-base-content fixed top-0 z-50 mx-auto w-full max-w-7xl bg-transparent">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
        <li><a href="/">RSS</a></li>
        <li class="hidden">
          <a>Parent</a>
          <ul class="p-2">
            <li><a href="javascript:void(0);">Submenu 1</a></li>
            <li><a href="javascript:void(0);">Submenu 2</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost hidden text-xl md:flex">{config.title}</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/">About</a></li>
      <li><a href="/">Contact</a></li>
      <li><a href="/">RSS</a></li>
      <li class="hidden">
        <details>
          <summary>Parent</summary>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <div class="flex-1 text-end">
      <label class="swap swap-rotate duration-75 {darkMode === null && 'hidden'}">
        <input hidden type="checkbox" onclick={toggleDarkMode} bind:checked={darkMode} />

        <svg
          class="swap-on text-warning h-8 w-8 fill-current delay-75 duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>

        <svg
          class="swap-off text-warning-content h-8 w-8 fill-current delay-75 duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../app.css";

  .header {
    @apply text-base-content;
    @apply fixed top-0 z-50 mx-auto w-full max-w-7xl;
    @apply justify-between;
    @apply transition-colors;
    @apply duration-200;
    @apply px-4 py-4 md:flex md:px-8 md:py-8;
  }
</style>
