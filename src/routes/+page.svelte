<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { emoticons } from '$lib/utils';
  import * as config from '$lib/config';

  // You can customize these values
  const name = 'Fardhan Ardhi';
  const bio = [
    "Hi! I'm a Software Engineer based in Indonesia 🇮🇩",
    'Recently working with Flutter, Svelte and React.'
  ].join('\n');
  const subBio = [
    'Currently working with Majoo, building POS system to empower MSMEs in Indonesia in growing their businesses.'
  ].join('\n');

  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/fardhanardhi', icon: 'github' },
    { name: 'Instagram', url: 'https://instagram.com/fardhan.rd', icon: 'instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/fardhanardhi', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:far.dev.id@gmail.com', icon: 'mail' }
  ];

  let isLoad = $state(false);
  let classActive = $derived(isLoad ? 'opacity-100' : 'opacity-0');

  let currentEmoticon = $state(emoticons[0]);
  let intervalId: number | null = null;

  // Function to set a random emoticon
  function setRandomEmoticon() {
    const randomIndex = Math.floor(Math.random() * emoticons.length);
    currentEmoticon = emoticons[randomIndex];
  }

  onMount(() => {
    setRandomEmoticon(); // Set a random one immediately
    intervalId = setInterval(setRandomEmoticon, 100); // Then start the interval

    // Optional: Clear interval on component destroy, just in case
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });
</script>

<svelte:head>
  <title>{config.pageTitle}</title>
</svelte:head>

<main class="flex min-h-svh flex-col items-center justify-center p-4 md:p-24">
  <div class="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
    <!-- Profile Photo -->
    <div class="profilebg flex items-center justify-center">
      {#if !isLoad}
        <span class="absolute text-4xl md:text-5xl">{currentEmoticon}</span>
      {/if}
      <img
        onload={() => {
          if (intervalId) clearInterval(intervalId); // Stop the interval
          isLoad = true;
        }}
        src="https://gravatar.com/avatar/fbb1f6287e41d6458fa8f5d24b71ee56?size=256"
        alt="Profile"
        class=" h-full w-full object-cover {classActive} transition-opacity duration-500"
      />
    </div>

    <!-- Name -->
    <h1
      class="text-base-content mb-4 text-4xl font-bold transition-all duration-200 md:text-5xl"
    >
      {name}
    </h1>

    <!-- Brief Bio - Optional -->
    <p class="text-base-content/85 mb-8 max-w-md text-lg transition-colors duration-200">
      {bio}
    </p>

    <!-- Brief Sub Bio - Optional -->
    <!-- <p class="mb-8 max-w-md text-lg text-gray-600 dark:text-gray-400"> -->
    <!-- <p class="mb-8 max-w-md text-sm text-gray-500 dark:text-gray-400">
              {subBio}
          </p> -->

    <!-- Social Media Links -->
    <div class="mb-8 flex flex-wrap justify-center gap-3">
      {#each socialLinks as link}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          class="icon-item"
        >
          {#if link.icon === 'github'}
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
              class="lucide lucide-github"
              ><path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              ></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg
            >
          {:else if link.icon === 'instagram'}
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
              class="lucide lucide-instagram"
              ><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path
                d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
              ></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg
            >
          {:else if link.icon === 'linkedin'}
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
              class="lucide lucide-linkedin"
              ><path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"
              ></circle></svg
            >
          {:else if link.icon === 'mail'}
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
              class="lucide lucide-mail"
              ><rect width="20" height="16" x="2" y="4" rx="2"></rect><path
                d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
              ></path></svg
            >
          {/if}
        </a>
      {/each}
    </div>

    <!-- Footer -->
    <footer class="text-base-content/75 text-sm transition-colors duration-200">
      Made with ❤️ by {name.split(' ').at(0)}
    </footer>
  </div>
</main>

<style lang="postcss">
  @reference "../app.css";

  .profilebg {
    -webkit-appearance: none;
    background-color: #cfd5e2;
    @apply border-base-300;
    @apply mb-6 h-32 w-32;
    @apply overflow-visible;
    @apply rounded-full;
    @apply border-4;
    @apply transition-all;
    @apply duration-200;
    @apply md:h-40 md:w-40;
    -webkit-box-shadow: 0 -30px 300px -25px var(--color-primary);
    box-shadow: 0 -30px 300px -25px var(--color-primary);
  }
  .icon-item {
    @apply bg-base-100;
    @apply text-base-content;
    @apply hover:bg-base-300;
    @apply border-base-content/25;
    @apply inline-flex;
    @apply h-10 w-10;
    @apply items-center;
    @apply justify-center;
    @apply rounded-md;
    @apply border;
    @apply transition-colors;
    @apply duration-200;
    @apply hover:transition-none;
    @apply hover:duration-0;
  }
</style>
