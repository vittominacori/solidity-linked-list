import{_ as s,c as a,a2 as e,o as t}from"./chunks/framework.Dnd72TT_.js";const c=JSON.parse('{"title":"Solidity Linked List","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),l={name:"index.md"};function n(h,i,r,o,d,p){return t(),a("div",null,i[0]||(i[0]=[e(`<h1 id="solidity-linked-list" tabindex="-1">Solidity Linked List <a class="header-anchor" href="#solidity-linked-list" aria-label="Permalink to &quot;Solidity Linked List&quot;">​</a></h1><p><a href="https://www.npmjs.org/package/solidity-linked-list" target="_blank" rel="noreferrer"><img src="https://img.shields.io/npm/v/solidity-linked-list.svg?style=flat-square" alt="NPM Package"></a><a href="https://github.com/vittominacori/solidity-linked-list/actions/" target="_blank" rel="noreferrer"><img src="https://github.com/vittominacori/solidity-linked-list/workflows/CI/badge.svg?branch=master" alt="CI"></a><a href="https://codecov.io/gh/vittominacori/solidity-linked-list" target="_blank" rel="noreferrer"><img src="https://codecov.io/gh/vittominacori/solidity-linked-list/graph/badge.svg" alt="Coverage Status"></a><a href="https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE" target="_blank" rel="noreferrer"><img src="https://img.shields.io/github/license/vittominacori/solidity-linked-list.svg" alt="MIT licensed"></a></p><p>An utility library for working with sorted linked list data structures in your Solidity project.</p><h2 id="install" tabindex="-1">Install <a class="header-anchor" href="#install" aria-label="Permalink to &quot;Install&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> solidity-linked-list</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-solidity vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">solidity</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pragma</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> solidity</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^0.8.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">StructuredLinkedList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;solidity-linked-list/contracts/StructuredLinkedList.sol&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">contract</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyContract</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    using</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StructuredLinkedList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> for</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StructuredLinkedList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.List;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    StructuredLinkedList.List list;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // your stuff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><ul><li><a href="https://github.com/vittominacori/solidity-linked-list/blob/master/contracts/StructuredLinkedList.sol" target="_blank" rel="noreferrer">StructuredLinkedList.sol</a></li></ul><h2 id="documentation" tabindex="-1">Documentation <a class="header-anchor" href="#documentation" aria-label="Permalink to &quot;Documentation&quot;">​</a></h2><ul><li><a href="https://github.com/vittominacori/solidity-linked-list/blob/master/docs/index.md" target="_blank" rel="noreferrer">Solidity API</a></li></ul><h2 id="code-analysis" tabindex="-1">Code Analysis <a class="header-anchor" href="#code-analysis" aria-label="Permalink to &quot;Code Analysis&quot;">​</a></h2><ul><li><a href="https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/control-flow" target="_blank" rel="noreferrer">Control Flow</a></li><li><a href="https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/description-table" target="_blank" rel="noreferrer">Description Table</a></li><li><a href="https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/inheritance-tree" target="_blank" rel="noreferrer">Inheritance Tree</a></li><li><a href="https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/uml" target="_blank" rel="noreferrer">UML</a></li></ul><h2 id="development" tabindex="-1">Development <a class="header-anchor" href="#development" aria-label="Permalink to &quot;Development&quot;">​</a></h2><h3 id="install-dependencies" tabindex="-1">Install dependencies <a class="header-anchor" href="#install-dependencies" aria-label="Permalink to &quot;Install dependencies&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><h3 id="compile" tabindex="-1">Compile <a class="header-anchor" href="#compile" aria-label="Permalink to &quot;Compile&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span></span></code></pre></div><h3 id="test" tabindex="-1">Test <a class="header-anchor" href="#test" aria-label="Permalink to &quot;Test&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><h3 id="code-coverage" tabindex="-1">Code Coverage <a class="header-anchor" href="#code-coverage" aria-label="Permalink to &quot;Code Coverage&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coverage</span></span></code></pre></div><h3 id="linter" tabindex="-1">Linter <a class="header-anchor" href="#linter" aria-label="Permalink to &quot;Linter&quot;">​</a></h3><p>Check Solidity files</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint:sol</span></span></code></pre></div><p>Check JS/TS files</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint:js</span></span></code></pre></div><p>Fix JS and Solidity files</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint:fix</span></span></code></pre></div><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p>Code released under the <a href="https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE" target="_blank" rel="noreferrer">MIT License</a>.</p>`,31)]))}const g=s(l,[["render",n]]);export{c as __pageData,g as default};
