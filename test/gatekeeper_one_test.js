const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gatekeeper One", function () {
  it("Should register entrant", async function () {

    const [user1, deployer] = await ethers.getSigners();
    
    const Gatekeeper = await ethers.getContractFactory("GatekeeperOne", deployer);
    const GatekeeperAttack = await ethers.getContractFactory("GatekeeperAttack", deployer);

    this.gatekeeper = await Gatekeeper.deploy();
    this.gatekeeperAttack = await GatekeeperAttack.deploy(this.gatekeeper.address);
  
    expect(await this.gatekeeper.entrant()).to.equal('0x0000000000000000000000000000000000000000');
    
    console.log(`Gatekeeper deployed to ${this.gatekeeper.address}`);
    console.log(`GatekeeperAttack deployed to ${this.gatekeeperAttack.address}`);

    await this.gatekeeperAttack.connect(user1).hack();

    expect(await this.gatekeeper.entrant()).to.equal(user1.address);
  });
});
