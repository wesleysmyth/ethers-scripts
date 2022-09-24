import 'dotenv/config';
import { ethers } from 'ethers';

console.log('process.env.INFURA_KEY', process.env.INFURA_KEY)
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
// could also do something like
// const provider = ethers.providers.InfuraProvider('homestead', process.env.INFURA_KEY);

console.log('current block number', await provider.getBlockNumber());
console.log('w3sley.eth is', await provider.resolveName('w3sley.eth'));
console.log('0xdA494ca64cC7C878A51de303764C64C2402f146b is', await provider.lookupAddress('0xdA494ca64cC7C878A51de303764C64C2402f146b'));
const vitalikBalance = await provider.getBalance('vitalik.eth');
let w3sleyBalance = await provider.getBalance('w3sley.eth');

w3sleyBalance = w3sleyBalance.add(ethers.utils.parseEther("5000"));

console.log('vitalik.eth has', ethers.utils.formatEther(vitalikBalance), 'ETH');
console.log('w3sley.eth has', ethers.utils.formatEther(w3sleyBalance), 'ETH');

if (vitalikBalance.gt(w3sleyBalance)) {
    console.log('Vitalik has more ETH than w3s');
} else {
    console.log('w3s has more ETH than Vitalik');
}
