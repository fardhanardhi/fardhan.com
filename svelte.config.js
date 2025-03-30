import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/mdsvex.svelte'
  },
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['poimandres'],
        langs: [
          'javascript',
          'typescript',
          'powershell',
          'shellscript',
          'dart',
          'yaml',
          'json',
          'jsonc',
          'html'
        ]
      });
      await highlighter.loadLanguage(
        'javascript',
        'typescript',
        'powershell',
        'shellscript',
        'dart',
        'yaml',
        'json',
        'jsonc',
        'html'
      );
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
      return `{@html \`${html}\` }`;
    }
  }
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
