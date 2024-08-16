// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;
    address public boss;

    constructor(uint256 _count) {
        count = _count;
        boss = msg.sender;
    }

    modifier onlyBoss() {
        require(msg.sender == boss, "Only the boss can call this function");
        _;
    }

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to increment count by 1
    function superInc() public onlyBoss {
        count += 10;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        require(msg.sender == boss, "Only the boss can decrement the count");
        count -= 1;
    }
}
