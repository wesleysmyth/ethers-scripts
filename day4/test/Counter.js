const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Counter", function () {
    let Counter, counter, signer0, signer1;

    before(async () => {
        [ signer0, signer1 ] = await ethers.getSigners();
        Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy(0);
    });

    it("Should return the initial counter as zero", async function () {
        const count = await counter.get();
        expect(count).to.equal(0);
    });

    it("Should increment the counter", async function () {
        const tx = await counter.inc();
        await tx.wait();
        const count = await counter.get();
        expect(count).to.equal(1);
    });

    it("Should decrement the counter", async function () {
        const tx = await counter.dec();
        await tx.wait();
        const count = await counter.get();
        expect(count).to.equal(0);
    });

    it("Should not allow the counter to be negative", async function () {
        await (expect(counter.dec())).to.be.reverted;
    });

    it("Should allow anyone to increment the counter", async function () {
        const tx = await counter.connect(signer1).inc();
        await tx.wait();
        const count = await counter.get();
        expect(count).to.equal(1);
    });

    it("Should only allow the owner to decrement the counter", async function () {
        await (expect(counter.connect(signer1).dec())).to.be.revertedWith("Only the boss can decrement the count");
    });

    it("Should allow the boss to superInc", async function () {
        const tx = await counter.superInc();
        await tx.wait();
        const count = await counter.get();
        expect(count).to.equal(11);
    });

    it("Should not allow someone other than the boss to superInc", async function () {
        await (expect(counter.connect(signer1).superInc())).to.be.revertedWith("Only the boss can call this function");
    });

});
