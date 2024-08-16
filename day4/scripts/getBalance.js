const {
    JsonRpcProvider,
    formatEther
} = require('ethers');

async function main() {
    const localUrl = `http://localhost:8545`;
    const localProvider = new JsonRpcProvider(localUrl);
    const account0Address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const account0Balance = await localProvider.getBalance(account0Address);
    const account0BalanceEther = formatEther(account0Balance);
    console.log("account0 balance", account0BalanceEther, "ETH");
}

main();
