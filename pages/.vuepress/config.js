const vars = require('./.env.json');

const title = 'Solidity Linked List | Use sorted linked list data structures in Solidity';
const description = 'An utility library for working with sorted linked list data structures in your Solidity project.';
const url = 'https://vittominacori.github.io/solidity-linked-list';
const image = '';

module.exports = {
  title: 'Use sorted linked list data structures in Solidity',
  description: 'An utility library for working with sorted linked list data structures in your Solidity project.',
  base: '/solidity-linked-list/',
  plugins: [
    [
      'google-gtag',
      {
        ga: vars.gaId,
      },
    ],
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
  ],
  themeConfig: {
    repo: 'vittominacori/solidity-linked-list',
    sidebar: 'auto',
  },
};
