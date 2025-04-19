import { mdsvex, escapeSvelte } from 'mdsvex';
// import { createHighlighter } from 'shiki';
import { createHighlighter } from '@bitmachina/highlighter';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/mdsvex.svelte'
  },
  highlight: {
    highlighter: await createHighlighter({ theme: 'material-ocean' })
  },
  remarkPlugins: [[remarkToc, { tight: true }]],
  rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    adapter: adapter()
  },

  extensions: ['.svelte', '.md']
};

export default config;
