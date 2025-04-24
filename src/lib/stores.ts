import { writable } from 'svelte/store';
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
