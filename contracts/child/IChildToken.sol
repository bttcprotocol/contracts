pragma solidity ^0.5.11;

interface IChildToken {
    event WithdrawTo(address indexed to);
    function deposit(address user, bytes calldata depositData) external;
}
