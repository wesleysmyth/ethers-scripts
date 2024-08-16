// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SanfordToken {
    address public immutable owner;
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;
    uint256 public constant MINT_PRICE = 0.01 ether;
    mapping(address => uint256) public balances;
    event Buy(address indexed buyer);

    struct Vote {
        address voter;
        bool selection;
    }

    Vote[] public votes;

    constructor() {
        owner = msg.sender;
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function create(uint256 quantity) public onlyOwner {
        require(totalCreated + quantity <= totalSupply, "Cannot create more tokens than the total supply");

        balances[ msg.sender ] += quantity;
        totalCreated += quantity;
    }

    function send(address to, uint256 quantity) public {
        require(balances[ msg.sender ] >= quantity, "Insufficient balance");
        balances[ msg.sender ] -= quantity;
        balances[ to ] += quantity;
    }

    function buy() public payable {
        require(totalCreated + 1 < totalSupply, "Cannot create more tokens than the total supply");
        require(msg.value == MINT_PRICE, "Incorrect amount sent");

        balances[ msg.sender ] += 1;
        totalCreated += 1;
        emit Buy(msg.sender);
    }

    function withdraw() onlyOwner public {
        (bool sent, bytes memory data) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}

    fallback() external payable {}
}