<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import * as config from '$lib/config';
  import { darkMode } from '$lib/stores';
  import { Menu } from 'lucide-svelte';
  import clsx from 'clsx';
  import { ChevronLeft } from 'lucide-svelte';

  let drawer = $state(false);

  function toggleDarkMode() {
    $darkMode = !$darkMode;
  }

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ];
  const more = [
    { name: 'Projects', url: '/projects' },
    { name: 'Shorts', url: '/shorts' },
    { name: 'About', url: '/about' },
    { name: 'Statistics', url: '/statistics' },
    { name: 'RSS', url: '/rss.xml' }
  ];
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

<!-- Tablet Navbar -->
<!-- Docked, Collapsed, Dropdown -->
<!-- & -->
<!-- Desktop Navbar -->
<!-- Docked, Floating, Expanded, Center -->
<div class="{page.url.pathname === '/' ? 'header-home' : 'header'} anim">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost hidden sm:max-lg:flex">
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
      <ul class="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {#each pages as link}
          <li><a href={link.url}>{link.name}</a></li>
        {/each}
        <li>
          <a
            href="/"
            onclick={(e) => {
              e.preventDefault();
              console.log(0);
            }}>More</a
          >
          <ul class="p-2">
            {#each more as link}
              <li>
                <a href={link.url}>{link.name}</a>
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </div>
    {#if page.url.pathname === '/'}
      <a href="/" class="btn btn-ghost hidden text-xl lg:flex">{config.title}</a>
    {:else}
      <button class="btn btn-ghost btn-circle btn-lg mx-0.5" onclick={() => window.history.back()}>
        <ChevronLeft />
      </button>
    {/if}
  </div>
  <div class="navbar-center">
    <a
      href="/"
      class="btn btn-ghost {page.url.pathname === '/' && 'hidden'} text-xl {page.url.pathname !==
        '/' && 'sm:hidden'}">{config.title.split(' ')[0]}</a
    >
    <a
      href="/"
      class="btn btn-ghost {page.url.pathname === '/' && 'hidden'} text-xl {page.url.pathname !==
        '/' && 'hidden sm:max-xl:flex lg:hidden'}">{config.title}</a
    >

    <ul class="menu menu-md menu-horizontal hidden px-1 lg:flex">
      {#each pages as link}
        <li><a href={link.url}>{link.name}</a></li>
      {/each}
      <li>
        <details>
          <summary>More</summary>
          <ul class="p-2">
            {#each more as link}
              <li>
                <a href={link.url}>{link.name}</a>
              </li>
            {/each}
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <div class="hidden flex-1 pr-2 text-end sm:inline xl:pr-4">
      <label class="swap swap-rotate duration-75 {$darkMode === null && 'hidden'}">
        <input hidden type="checkbox" onclick={toggleDarkMode} bind:checked={$darkMode} />

        <svg
          class="swap-on text-warning h-6 w-6 fill-current delay-75 duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>

        <svg
          class="swap-off text-warning-content h-6 w-6 fill-current delay-75 duration-300"
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

<!-- Mobile Navbar -->
<!-- FAB, Collapsed, Drawer -->
<div>
  <button
    class={clsx(
      'btn btn-xl bg-base-100 btn-circle',
      'border-0 shadow-lg',
      'fixed bottom-6 left-6',
      'sm:hidden',
      { hidden: page.url.pathname === '/' }
    )}
    onclick={() => {
      window.history.back();
    }}><ChevronLeft /></button
  >
  <div class="drawer drawer-end sm:hidden">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" bind:checked={drawer} />
    <div class="drawer-content">
      <!-- Page content here -->
      <label
        for="my-drawer-4"
        class={clsx(
          'drawer-button',
          'btn btn-xl btn-accent btn-circle',
          'fixed right-6 bottom-6',
          'shadow-xl'
        )}><Menu /></label
      >
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-200 text-base-content flex min-h-full w-80 items-end p-4">
        <ul class="menu menu-xl flex w-full">
          <!-- Sidebar content here -->
          <div class=" mx-4 my-4 flex-1 pr-2">
            <label class="swap swap-rotate duration-75 {$darkMode === null && 'hidden'}">
              <input hidden type="checkbox" onclick={toggleDarkMode} bind:checked={$darkMode} />

              <svg
                class="swap-on text-warning h-10 w-10 fill-current delay-75 duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>

              <svg
                class="swap-off text-warning-content h-10 w-10 fill-current delay-75 duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
            </label>
          </div>
          <li>
            <details>
              <summary class="py-4">More</summary>
              <ul class="p-2">
                {#each more as link}
                  <li>
                    <a class="py-4" href={link.url} onclick={() => (drawer = false)}>{link.name}</a>
                  </li>
                {/each}
              </ul>
            </details>
          </li>
          {#each pages.reverse() as link}
            <li>
              <a class="py-4" href={link.url} onclick={() => (drawer = false)}>{link.name}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../app.css";

  .anim {
    @apply delay-12 duration-200;
    transition-property:
      top color,
      background-color,
      border-color,
      text-decoration-color,
      fill,
      display,
      position,
      border-radius,
      stroke;
  }

  .header {
    @apply navbar min-h-4;
    @apply hidden sm:flex;
    @apply text-base-content xl:text-base-content;
    @apply sticky top-0 xl:top-2;
    @apply bg-base-100/75 xl:bg-base-300/75 dark:bg-neutral/75;
    @apply shadow-lg xl:shadow-xl dark:shadow-2xl;
    @apply shadow-neutral/5 xl:shadow-neutral/5 dark:shadow-base-300;
    @apply rounded-none xl:rounded-4xl;
    @apply backdrop-blur-lg;
  }

  .header-home {
    @apply navbar;
    @apply text-base-content;
    @apply fixed top-0 z-50 mx-auto;
    @apply w-full max-w-7xl;
    @apply lg:bg-base-200/50 bg-transparent;
    @apply rounded-none xl:rounded-4xl;
    @apply lg:backdrop-blur-3xl;
  }
</style>
