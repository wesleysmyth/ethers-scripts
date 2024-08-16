// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const [ signer0 ] = await hre.ethers.getSigners();
    const Counter = await hre.ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(0);

    console.log("Deploying contract as ", signer0.address);

    await counter.waitForDeployment();

    console.log("Counter deployed to:", await counter.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
