import { ethers, formatEther } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
console.log('mainnetProvider', mainnetProvider)
const goerliSigner = getSigner();
console.log('goerliSigner', goerliSigner)
const myBalance = await goerliSigner.provider.getBalance(goerliSigner.address);

console.log("myBalance", formatEther(myBalance));

// need to look up w3sley.eth on mainnet provider, since it isn't registered on rinkeby
const w3sleyAddress = await mainnetProvider.resolveName('w3sley.eth');
// send ten percent of our balance to w3sley.eth
const tx = await goerliSigner.sendTransaction({
    to: w3sleyAddress,
    value: myBalance / 10n
});

console.log('tx sent!', tx);

const result = await tx.wait();

console.log('tx result:', result);
