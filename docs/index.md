# Solidity API

## IStructureInterface

### getValue

```solidity
function getValue(uint256 _id) external view returns (uint256)
```

## StructuredLinkedList

_An utility library for working with sorted linked list data structures in your Solidity project._

### List

```solidity
struct List {
  uint256 size;
  mapping(uint256 => mapping(bool => uint256)) list;
}
```

### insertAfter

```solidity
function insertAfter(struct StructuredLinkedList.List self, uint256 _node, uint256 _new) internal returns (bool)
```

_Insert node `_new` beside existing node `_node` in direction `NEXT`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Existing node. |
| _new | uint256 | New node to insert. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if success, false otherwise. |

### insertBefore

```solidity
function insertBefore(struct StructuredLinkedList.List self, uint256 _node, uint256 _new) internal returns (bool)
```

_Insert node `_new` beside existing node `_node` in direction `PREV`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Existing node. |
| _new | uint256 | New node to insert. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if success, false otherwise. |

### remove

```solidity
function remove(struct StructuredLinkedList.List self, uint256 _node) internal returns (uint256)
```

_Removes an entry from the linked list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Node to remove from the list. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The removed node. |

### pushFront

```solidity
function pushFront(struct StructuredLinkedList.List self, uint256 _node) internal returns (bool)
```

_Pushes an entry to the head of the linked list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | New entry to push to the head. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if success, false otherwise. |

### pushBack

```solidity
function pushBack(struct StructuredLinkedList.List self, uint256 _node) internal returns (bool)
```

_Pushes an entry to the tail of the linked list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | New entry to push to the tail. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if success, false otherwise. |

### popFront

```solidity
function popFront(struct StructuredLinkedList.List self) internal returns (uint256)
```

_Pops the first entry from the head of the linked list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The removed node. |

### popBack

```solidity
function popBack(struct StructuredLinkedList.List self) internal returns (uint256)
```

_Pops the first entry from the tail of the linked list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The removed node. |

### listExists

```solidity
function listExists(struct StructuredLinkedList.List self) internal view returns (bool)
```

_Checks if the list exists._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if list exists, false otherwise. |

### nodeExists

```solidity
function nodeExists(struct StructuredLinkedList.List self, uint256 _node) internal view returns (bool)
```

_Checks if the node exists._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | A node to search for. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if node exists, false otherwise. |

### sizeOf

```solidity
function sizeOf(struct StructuredLinkedList.List self) internal view returns (uint256)
```

_Returns the number of elements in the list._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 The size of the list. |

### getNode

```solidity
function getNode(struct StructuredLinkedList.List self, uint256 _node) internal view returns (bool, uint256, uint256)
```

_Returns the links of a node as a tuple._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Id of the node to get. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool, uint256, uint256 True if node exists or false otherwise, previous node, next node. |
| [1] | uint256 |  |
| [2] | uint256 |  |

### getAdjacent

```solidity
function getAdjacent(struct StructuredLinkedList.List self, uint256 _node, bool _direction) internal view returns (bool, uint256)
```

_Returns the link of a node `_node` in direction `_direction`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Id of the node to step from. |
| _direction | bool | Direction to step in. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool, uint256 True if node exists or false otherwise, node in _direction. |
| [1] | uint256 |  |

### getNextNode

```solidity
function getNextNode(struct StructuredLinkedList.List self, uint256 _node) internal view returns (bool, uint256)
```

_Returns the link of a node `_node` in direction `NEXT`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Id of the node to step from. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool, uint256 True if node exists or false otherwise, next node. |
| [1] | uint256 |  |

### getPreviousNode

```solidity
function getPreviousNode(struct StructuredLinkedList.List self, uint256 _node) internal view returns (bool, uint256)
```

_Returns the link of a node `_node` in direction `PREV`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _node | uint256 | Id of the node to step from. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool, uint256 True if node exists or false otherwise, previous node. |
| [1] | uint256 |  |

### getSortedSpot

```solidity
function getSortedSpot(struct StructuredLinkedList.List self, address _structure, uint256 _value) internal view returns (uint256)
```

_Can be used before `insert` to build an ordered list.
Get the node and then `insertBefore` or `insertAfter` basing on your list order.
If you want to order basing on other than `structure.getValue()` override this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct StructuredLinkedList.List | Stored linked list from contract. |
| _structure | address | The structure instance. |
| _value | uint256 | Value to seek. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Next node with a value less than _value. |

