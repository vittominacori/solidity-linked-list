# Solidity Linked List

[![NPM Package](https://img.shields.io/npm/v/solidity-linked-list.svg?style=flat-square)](https://www.npmjs.org/package/solidity-linked-list)
[![CI](https://github.com/vittominacori/solidity-linked-list/workflows/CI/badge.svg?branch=master)](https://github.com/vittominacori/solidity-linked-list/actions/)
[![Coverage Status](https://codecov.io/gh/vittominacori/solidity-linked-list/graph/badge.svg)](https://codecov.io/gh/vittominacori/solidity-linked-list)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/solidity-linked-list.svg)](https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE)

A utility library for working with sorted linked list data structures in your Solidity project.

## Install

```bash
npm install solidity-linked-list
```

## Usage

```solidity
pragma solidity ^0.8.0;

import {StructuredLinkedList} from "solidity-linked-list/contracts/StructuredLinkedList.sol";

contract MyContract {
    using StructuredLinkedList for StructuredLinkedList.List;

    StructuredLinkedList.List list;

    // your stuff
}
```

## Code

* [StructuredLinkedList.sol](https://github.com/vittominacori/solidity-linked-list/blob/master/contracts/StructuredLinkedList.sol)

## Documentation

* [Solidity API](https://github.com/vittominacori/solidity-linked-list/blob/master/docs/index.md)

## Code Analysis

* [Control Flow](https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/control-flow)
* [Description Table](https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/description-table)
* [Inheritance Tree](https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/inheritance-tree)
* [UML](https://github.com/vittominacori/solidity-linked-list/tree/master/analysis/uml)

## Development

### Install dependencies

```bash
npm install
```

### Compile

```bash
npm run compile
```

### Test

```bash
npm test
```

### Code Coverage

```bash
npm run coverage
```

### Linter

Check Solidity files

```bash
npm run lint:sol
```

Check JS/TS files

```bash
npm run lint:js
```

Fix JS and Solidity files

```bash
npm run lint:fix
```

## License

Code released under the [MIT License](https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE).
