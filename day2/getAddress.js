import { BigNumber, ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
console.log("mainnetProvider", mainnetProvider);
const rinkebySigner = getSigner();
console.log("rinkebySigner", rinkebySigner);
const myBalance = await rinkebySigner.getBalance();

console.log("myBalance", ethers.utils.formatEther(myBalance));
console.log("rinkebySigner.address", rinkebySigner.address);
