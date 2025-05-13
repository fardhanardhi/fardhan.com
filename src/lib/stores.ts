import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';

export const darkMode = writable(
  (() => {
    if (browser) {
      if (localStorage.getItem('darkMode') === null) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  })()
);

export const unsubscribe = darkMode.subscribe((value) => {
  if (browser) {
    if (value) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'sunset');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('darkMode', value ? 'true' : 'false');
  }
});

export const setRandomTheme = () => {
  const dark = [
    'abyss',
    'aqua',
    'black',
    'business',
    'coffee',
    'dark',
    'dim',
    'dracula',
    'forest',
    'halloween',
    'luxury',
    'night',
    'sunset',
    'synthwave'
  ];

  const light = [
    'light',
    'cupcake',
    'corporate',
    'bumblebee',
    'emerald',
    'retro',
    'cyberpunk',
    'valentine',
    'garden',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'cmyk',
    'autumn',
    'acid',
    'lemonade',
    'winter',
    'nord',
    'caramellatte',
    'silk'
  ];

  const rand = (arr: string[]): string => {
    const ind: number = Math.floor(Math.random() * arr.length);
    const result = arr[ind];
    return result;
  };

  console.log(get(darkMode));
  if (get(darkMode)) {
    console.log('dark');
    document.documentElement.setAttribute('data-theme', rand(dark));
  } else {
    console.log('light');
    document.documentElement.setAttribute('data-theme', rand(light));
  }
};

export const syncHeight = (el: HTMLElement | null) => {
  return writable<number | null>(null, (set) => {
    if (!el) {
      return;
    }

    let ro = new ResizeObserver(() => el && set(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  });
};
