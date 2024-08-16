const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
    const hardhatSigner = (await hre.ethers.getSigners())[ 0 ];
    const { address, provider } = hardhatSigner;
    console.log('hardhatSigner', hardhatSigner);
    const myBalance = await provider.getBalance(address);
    console.log('myBalance', myBalance);
    const toAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    // send ten percent of our balance to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    const tx = await hardhatSigner.sendTransaction({
        to: toAddress,
        value: myBalance / 10n
    });

    console.log('tx sent', tx.hash)

    await tx.wait();

    console.log('tx mined')




    // const localProviderUrl = 'http://localhost:8545';
    // // const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);
    // const account0Address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    // const account0Balance = await provider.getBalance(account0Address);
    // console.log('account0Balance', ethers.utils.formatEther(account0Balance));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
