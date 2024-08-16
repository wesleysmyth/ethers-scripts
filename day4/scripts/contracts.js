const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
    const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
    const greeter = await hre.ethers.getContractAt("Greeter", contractAddress);
    const greeting = await greeter.greet();
    console.log("greeting:", greeting);

    console.log("setting new greeting...");
    const setTx = await greeter.setGreeting("Everything has changed, AGAIN");

    console.log("waiting for the transaction to be mined...");
    await setTx.wait();
    console.log("transaction mined!");

    const newGreeting = await greeter.greet();
    console.log("newGreeting:", newGreeting);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
