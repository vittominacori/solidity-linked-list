const vars = require('./.env.json');

module.exports = {
  title: 'Use linked list data structures in Solidity',
  description: 'An utility library for using sorted linked list data structures in your Solidity project',
  base: '/solidity-linked-list/',
  plugins: [
    [
      'google-gtag',
      {
        ga: vars.gaId,
      },
    ],
  ],
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    repo: 'vittominacori/solidity-linked-list',
    sidebar: 'auto',
  },
};
