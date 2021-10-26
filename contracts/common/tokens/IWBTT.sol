pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract IWBTT is ERC20,Ownable {
    function mint(address user,uint256 wad) public;
    function setPause(bool _pause) external;
}
