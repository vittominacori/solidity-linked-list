import { defineConfig } from 'vitepress';

const vars = require('./.env.json');

const title = 'Solidity Linked List | Use sorted linked list data structures in Solidity';
const description = 'An utility library for working with sorted linked list data structures in your Solidity project.';
const url = 'https://vittominacori.github.io/solidity-linked-list';
const image = '';
const repo = 'https://github.com/vittominacori/solidity-linked-list.git';

export default defineConfig({
  title: 'Solidity Linked List',
  titleTemplate: 'Use sorted linked list data structures in Solidity',
  description: description,
  base: '/solidity-linked-list/',
  head: [
    ['link', { rel: 'shortcut icon', href: '/solidity-linked-list/favicon.ico' }],
    ['meta', { name: 'title', property: 'og:title', content: title }],
    ['meta', { name: 'description', property: 'og:description', content: description }],
    ['meta', { name: 'image', property: 'og:image', content: image }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'twitter:title', content: title }],
    ['meta', { property: 'twitter:description', content: description }],
    ['meta', { property: 'twitter:image', content: image }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${vars.gaId}` }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${vars.gaId}');`,
    ],
  ],
  themeConfig: {
    siteTitle: 'Solidity Linked List',
    socialLinks: [{ icon: 'github', link: repo }],
    search: {
      provider: 'local',
    },
  },
});
