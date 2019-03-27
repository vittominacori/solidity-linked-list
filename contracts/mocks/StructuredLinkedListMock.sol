pragma solidity ^0.5.7;

import "../StructuredLinkedList.sol";

contract StructuredLinkedListMock {
    using StructuredLinkedList for StructuredLinkedList.List;

    struct BaseStructure {
        uint256 value;
    }

    // Mapping from token ID to the structures
    mapping(uint256 => BaseStructure) private structureMap;
    uint256 public progressiveId = 0;

    StructuredLinkedList.List private list;

    event LogNotice(bool booleanValue);

    /*
     * @dev Utility function to create a structure
     */
    function createStructure(uint256 _value) public {
        progressiveId = progressiveId + 1;
        structureMap[progressiveId] = BaseStructure(_value);
    }

    /*
     * @dev This function must return the value basing on we are sorted list
     */
    function getValue(uint256 _id) public view returns (uint256) {
        return structureMap[_id].value;
    }

    function listExists() public view returns (bool) {
        return list.listExists();
    }

    function nodeExists(uint256 _node) public view returns (bool) {
        return list.nodeExists(_node);
    }

    function sizeOf() public view returns (uint256) {
        return list.sizeOf();
    }

    function getNode(uint256 _node) public view returns (bool, uint256, uint256) {
        return list.getNode(_node);
    }

    function getNextNode(uint256 _node) public view returns (bool, uint256) {
        return list.getNextNode(_node);
    }

    function getPreviousNode(uint256 _node) public view returns (bool, uint256) {
        return list.getPreviousNode(_node);
    }

    function getSortedSpot(address _structure, uint256 _value) public view returns (uint256) {
        return list.getSortedSpot(_structure, _value);
    }

    function insertAfter(uint256 _node, uint256 _new) public {
        emit LogNotice(list.insertAfter(_node, _new));
    }

    function insertBefore(uint256 _node, uint256 _new) public {
        emit LogNotice(list.insertBefore(_node, _new));
    }

    function remove(uint256 _node) public {
        emit LogNotice(list.remove(_node) > 0 ? true : false);
    }

    function push(uint256 _node, bool _direction) public {
        emit LogNotice(list.push(_node, _direction));
    }

    function pop(bool _direction) public {
        emit LogNotice(list.pop(_direction) > 0 ? true : false);
    }
}
