const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Greeter", function () {
    let Greeter, greeter;

    before(async () => {
        Greeter = await ethers.getContractFactory("Greeter");
        greeter = await Greeter.deploy("Hello, world!");
    });

    it("Should return the initial greeting", async function () {
        const greeting = await greeter.greet();
        expect(greeting).to.equal("Hello, world!");
    });

    it("Should revert if the contract is not unlocked", async function () {
        await expect(greeter.setGreeting("Hola, mundo!")).to.be.reverted;
    });

    it("Should return the new greeting once it's changed", async function () {
        const toggleLockTx = await greeter.toggleLock();
        await toggleLockTx.wait();

        const setTx = await greeter.setGreeting("Hola, mundo!");
        await setTx.wait();

        const greeting = await greeter.greet();
        expect(greeting).to.equal("Hola, mundo!");
    });
});
