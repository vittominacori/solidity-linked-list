// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../StructuredLinkedList.sol";

contract StructuredLinkedListMock {
    using StructuredLinkedList for StructuredLinkedList.List;

    struct BaseStructure {
        uint256 value;
    }

    // Mapping from token ID to the structures
    mapping(uint256 => BaseStructure) private _structureMap;
    uint256 public progressiveId = 0;

    StructuredLinkedList.List private _list;

    event LogNotice(bool booleanValue);

    /*
     * @dev Utility function to create a structure
     */
    function createStructure(uint256 _value) public {
        progressiveId = progressiveId + 1;
        _structureMap[progressiveId] = BaseStructure(_value);
    }

    /*
     * @dev This function must return the value basing on we are sorted list
     */
    function getValue(uint256 _id) public view returns (uint256) {
        return _structureMap[_id].value;
    }

    function listExists() public view returns (bool) {
        return _list.listExists();
    }

    function nodeExists(uint256 _node) public view returns (bool) {
        return _list.nodeExists(_node);
    }

    function sizeOf() public view returns (uint256) {
        return _list.sizeOf();
    }

    function getNode(uint256 _node) public view returns (bool, uint256, uint256) {
        return _list.getNode(_node);
    }

    function getNextNode(uint256 _node) public view returns (bool, uint256) {
        return _list.getNextNode(_node);
    }

    function getPreviousNode(uint256 _node) public view returns (bool, uint256) {
        return _list.getPreviousNode(_node);
    }

    function getSortedSpot(address _structure, uint256 _value) public view returns (uint256) {
        return _list.getSortedSpot(_structure, _value);
    }

    function insertAfter(uint256 _node, uint256 _new) public {
        emit LogNotice(_list.insertAfter(_node, _new));
    }

    function insertBefore(uint256 _node, uint256 _new) public {
        emit LogNotice(_list.insertBefore(_node, _new));
    }

    function remove(uint256 _node) public {
        emit LogNotice(_list.remove(_node) > 0 ? true : false);
    }

    function pushFront(uint256 _node) public {
        emit LogNotice(_list.pushFront(_node));
    }

    function pushBack(uint256 _node) public {
        emit LogNotice(_list.pushBack(_node));
    }

    function popFront() public {
        emit LogNotice(_list.popFront() > 0 ? true : false);
    }

    function popBack() public {
        emit LogNotice(_list.popBack() > 0 ? true : false);
    }
}
