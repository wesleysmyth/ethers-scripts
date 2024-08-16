const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("SanfordToken", function () {
    let SanfordToken, sanfordToken, signer0, signer1;

    before(async () => {
        [ signer0, signer1 ] = await ethers.getSigners();
        SanfordToken = await ethers.getContractFactory("SanfordToken");
        sanfordToken = await SanfordToken.deploy();
    });

    it("Should return the initial total supply of the token", async function () {
        const totalSupply = await sanfordToken.totalSupply();
        expect(totalSupply).to.equal(1000);
    });

    it("Should return the initial total created of the token", async function () {
        const totalCreated = await sanfordToken.totalCreated();
        expect(totalCreated).to.equal(0);
    });

    it("Should return the balance of the creator as expected", async function () {
        const createTx = await sanfordToken.create(100);
        await createTx.wait();
        const signer0Balance = await sanfordToken.balances(signer0.address);
        expect(signer0Balance).to.equal(100);
    });

    // it("Should return the initial total created as zero", async function () {
        
    //     expect(count).to.equal(0);
    // });
});
