const {
    JsonRpcProvider,
    formatEther
} = require('ethers');

async function main() {
    const signer = (await hre.ethers.getSigners())[ 0 ];
    const { address, provider } = signer;
    const myBalance = await provider.getBalance(address);
    console.log('myBalance', formatEther(myBalance));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
