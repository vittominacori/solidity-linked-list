# Solidity Linked List

[![NPM Package](https://img.shields.io/npm/v/solidity-linked-list.svg?style=flat-square)](https://www.npmjs.org/package/solidity-linked-list)
[![Build Status](https://travis-ci.org/vittominacori/solidity-linked-list.svg?branch=master)](https://travis-ci.org/vittominacori/solidity-linked-list)
[![Coverage Status](https://coveralls.io/repos/github/vittominacori/solidity-linked-list/badge.svg?branch=master)](https://coveralls.io/github/vittominacori/solidity-linked-list?branch=master)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/solidity-linked-list.svg)](https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE) 

An utility library for using sorted linked list data structures in your Solidity project.

## Install

```bash
npm install solidity-linked-list
```

## Usage

```solidity
pragma solidity ^0.5.7;

import "solidity-linked-list/contracts/StructuredLinkedList.sol";

contract MyContract {
    using StructuredLinkedList for StructuredLinkedList.List;
    
    StructuredLinkedList.List list;
    
    // your stuff
}
```

## Code

This repo contains:

* [StructuredLinkedList.sol](https://github.com/vittominacori/solidity-linked-list/blob/master/contracts/StructuredLinkedList.sol)

### listExists

```solidity
/**
 * @dev Checks if the list exists
 * @param self stored linked list from contract
 * @return bool true if list exists, false otherwise
 */
function listExists(List storage self) internal view returns (bool);
```

### nodeExists

```solidity
/**
 * @dev Checks if the node exists
 * @param self stored linked list from contract
 * @param _node a node to search for
 * @return bool true if node exists, false otherwise
 */
function nodeExists(List storage self, uint256 _node) internal view returns (bool);
```

### sizeOf

```solidity
/**
 * @dev Returns the number of elements in the list
 * @param self stored linked list from contract
 * @return uint256
 */
function sizeOf(List storage self) internal view returns (uint256);
```

### getNode

```solidity
/**
 * @dev Returns the links of a node as a tuple
 * @param self stored linked list from contract
 * @param _node id of the node to get
 * @return bool, uint256, uint256 true if node exists or false otherwise, previous node, next node
 */
function getNode(List storage self, uint256 _node) internal view returns (bool, uint256, uint256);
```

### getAdjacent

```solidity
/**
 * @dev Returns the link of a node `_node` in direction `_direction`.
 * @param self stored linked list from contract
 * @param _node id of the node to step from
 * @param _direction direction to step in
 * @return bool, uint256 true if node exists or false otherwise, node in _direction
 */
function getAdjacent(List storage self, uint256 _node, bool _direction) internal view returns (bool, uint256);
```

### getNextNode

```solidity
/**
 * @dev Returns the link of a node `_node` in direction `NEXT`.
 * @param self stored linked list from contract
 * @param _node id of the node to step from
 * @return bool, uint256 true if node exists or false otherwise, next node
 */
function getNextNode(List storage self, uint256 _node) internal view returns (bool, uint256);
```

### getPreviousNode

```solidity
/**
 * @dev Returns the link of a node `_node` in direction `PREV`.
 * @param self stored linked list from contract
 * @param _node id of the node to step from
 * @return bool, uint256 true if node exists or false otherwise, previous node
 */
function getPreviousNode(List storage self, uint256 _node) internal view returns (bool, uint256);
```

### getSortedSpot

```solidity
/**
 * @dev Can be used before `insert` to build an ordered list. 
 * @dev Get the node and then `insertBefore` or `insertAfter` basing on your list order.
 * @dev If you want to order basing on other than `structure.getValue()` override this function
 * @param self stored linked list from contract
 * @param _structure the structure instance
 * @param _value value to seek
 * @return uint256 next node with a value less than _value
 */
function getSortedSpot(List storage self, address _structure, uint256 _value) internal view returns (uint256);
```

### createLink

```solidity
/**
 * @dev Creates a bidirectional link between two nodes on direction `_direction`
 * @param self stored linked list from contract
 * @param _node first node for linking
 * @param _link  node to link to in the _direction
 */
function createLink(List storage self, uint256 _node, uint256 _link, bool _direction) internal;
```

### insert

```solidity
/**
 * @dev Insert node `_new` beside existing node `_node` in direction `_direction`.
 * @param self stored linked list from contract
 * @param _node existing node
 * @param _new  new node to insert
 * @param _direction direction to insert node in
 * @return bool true if success, false otherwise
 */
function insert(List storage self, uint256 _node, uint256 _new, bool _direction) internal returns (bool);
```

### insertAfter

```solidity
/**
 * @dev Insert node `_new` beside existing node `_node` in direction `NEXT`.
 * @param self stored linked list from contract
 * @param _node existing node
 * @param _new  new node to insert
 * @return bool true if success, false otherwise
 */
function insertAfter(List storage self, uint256 _node, uint256 _new) internal returns (bool);
```

### insertBefore

```solidity
/**
 * @dev Insert node `_new` beside existing node `_node` in direction `PREV`.
 * @param self stored linked list from contract
 * @param _node existing node
 * @param _new  new node to insert
 * @return bool true if success, false otherwise
 */
function insertBefore(List storage self, uint256 _node, uint256 _new) internal returns (bool);
```

### remove

```solidity
/**
 * @dev Removes an entry from the linked list
 * @param self stored linked list from contract
 * @param _node node to remove from the list
 * @return uint256 the removed node
 */
function remove(List storage self, uint256 _node) internal returns (uint256);
```

### push

```solidity
/**
 * @dev Pushes an entry to the head of the linked list
 * @param self stored linked list from contract
 * @param _node new entry to push to the head
 * @param _direction push to the head (NEXT) or tail (PREV)
 * @return bool true if success, false otherwise
 */
function push(List storage self, uint256 _node, bool _direction) internal returns (bool);
```

### pop

```solidity
/**
 * @dev Pops the first entry from the linked list
 * @param self stored linked list from contract
 * @param _direction pop from the head (NEXT) or the tail (PREV)
 * @return uint256 the removed node
 */
function pop(List storage self, bool _direction) internal returns (uint256);
```

## Development

### Install dependencies

```bash
npm install
```

## Usage

Open the Truffle console

```bash
npm run console
```

### Compile

```bash
npm run compile
```

### Test 

```bash
npm run test 
```

### Code Coverage

```bash
npm run coverage
```

## Linter

Use Solhint

```bash
npm run lint:sol
```

Use ESLint

```bash
npm run lint:js
```

Use ESLint and fix

```bash
npm run lint:fix
```

## License

Code released under the [MIT License](https://github.com/vittominacori/solidity-linked-list/blob/master/LICENSE).
