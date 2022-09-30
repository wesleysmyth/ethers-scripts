import { BigNumber, ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
console.log('mainnetProvider', mainnetProvider)
const rinkebySigner = getSigner();
console.log('rinkebySigner', rinkebySigner)
const myBalance = await rinkebySigner.getBalance();

console.log("myBalance", ethers.utils.formatEther(myBalance));

// need to look up w3sley.eth on mainnet provider, since it isn't registered on rinkeby
const w3sleyAddress = await mainnetProvider.resolveName('w3sley.eth');
// send ten percent of our balance to w3sley.eth
const tx = await rinkebySigner.sendTransaction({
    to: w3sleyAddress,
    value: myBalance.div(BigNumber.from(10))
});

console.log('tx sent!', tx);

const result = await tx.wait();

console.log('tx result:', result);