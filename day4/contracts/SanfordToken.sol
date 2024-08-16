// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SanfordToken {
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;
    mapping(address => uint256) public balances;

    function create(uint256 quantity) public {
        require(totalCreated + quantity <= totalSupply, "Cannot create more tokens than the total supply");

        balances[ msg.sender ] += quantity;
        totalCreated += quantity;
    }

    function send(address to, uint256 quantity) public {
        require(balances[ msg.sender ] >= quantity, "Insufficient balance");
        balances[ msg.sender ] -= quantity;
        balances[ to ] += quantity;
    }
}