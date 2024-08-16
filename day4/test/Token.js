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

    it("Should revert if creating more than the total supply the balance of the creator as expected", async function () {
        await expect(sanfordToken.create(1000)).to.be.revertedWith('Cannot create more tokens than the total supply');
    });

    it("Should send the correct amount of tokens and update balances", async function () {
        const sendTx = await sanfordToken.send(signer1.address, 25);
        sendTx.wait();
        const signer0Balance = await sanfordToken.balances(signer0.address);
        const signer1Balance = await sanfordToken.balances(signer1.address);
        expect(signer0Balance).to.equal(75);
        expect(signer1Balance).to.equal(25);
    });

    it("Should allow someone to buy a token for the mint price", async function () {
        const MINT_PRICE = await sanfordToken.MINT_PRICE();
        const buyTx = await sanfordToken.buy({
            value: MINT_PRICE
        });
        await buyTx.wait();
        const balance = await sanfordToken.balances(signer0.address);
        expect(balance).to.equal(76);
    });

    it("Should not allow someone to buy a token for above the mint price", async function () {
        const MINT_PRICE = await sanfordToken.MINT_PRICE();
        await expect(sanfordToken.buy({
            value: MINT_PRICE + ethers.parseEther('0.001')
        })).to.be.revertedWith('Incorrect amount sent');
    });

    it("Should not allow someone to buy a token for below the mint price", async function () {
        const MINT_PRICE = await sanfordToken.MINT_PRICE();
        await expect(sanfordToken.buy({
            value: MINT_PRICE - ethers.parseEther('0.001')
        })).to.be.revertedWith('Incorrect amount sent');
    });
});
