// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract TokenSender {
  using ECDSA for bytes32;
  using MessageHashUtils for bytes32;

  mapping(bytes32 => bool) executed;

  function transfer(
    address sender,
    uint256 amount,
    address recipient,
    address tokenContract,
    uint256 nonce,
    bytes memory signature
  ) public {
    // Calculate the hash of all the requisite values
    bytes32 messageHash = getHash(sender, amount, recipient, tokenContract, nonce);
    // Convert it to a signed message hash
    bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();

    // Require that this signature hasn't already been executed
    require(!executed[signedMessageHash], "Already executed!");

    // Extract the original signer address
    address signer = signedMessageHash.recover(signature);

    // Make sure signer is the person on whose behalf we're executing the transaction
    require(signer == sender, "Signature does not come from sender");

    // Mark this signature as having been executed now
    executed[signedMessageHash] = true;  

    // Transfer tokens from sender(signer) to recipient
    bool sent = IERC20(tokenContract).transferFrom(
        sender,
        recipient,
        amount
    );
    require(sent, "Transfer failed");
  }

  // Helper function to calculate the keccak256 hash
  function getHash(
    address sender,
    uint256 amount,
    address recipient,
    address tokenContract,
    uint256 nonce
  ) public pure returns (bytes32) {
    return
      keccak256(
          abi.encodePacked(sender, amount, recipient, tokenContract, nonce)
      );
  }
}