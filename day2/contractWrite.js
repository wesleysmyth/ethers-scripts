import { ethers } from "ethers";
import { getSigner } from "./utils.js";
import sanfordNFTAbi from "./abi/sanfordNFTAbi.js";

const sanfordNFTAddress = "0x6E2756D5A4780c4d26De0A91f0c0AF5CE77cBC34";
const rinkebySigner = getSigner();

const sanfordContract = new ethers.Contract(
  sanfordNFTAddress,
  sanfordNFTAbi,
  rinkebySigner
);

const mintPrice = await sanfordContract.MINT_PRICE();
const formattedMintPrice = ethers.utils.formatEther(mintPrice);

console.log("rinkebySigner", rinkebySigner);
console.log("mintPrice", mintPrice);
console.log("formattedMintPrice", formattedMintPrice);

console.log("minting nft");
// const mintTx = await sanfordContract.mint({
//   value: mintPrice,
// });
// console.log("awaiting mint tx", mintTx.hash);

// await mintTx.wait();

// console.log("tx mined");

////////////////////////////
// ANOTHER WAY //

const mintPrice2 = ethers.utils.parseEther("0.01");
const mintCallData = "0x1249c58b";

console.log("minting via raw transaction");
const mintTx2 = await rinkebySigner.sendTransaction({
  to: sanfordNFTAddress,
  value: mintPrice2,
  data: mintCallData,
  nonce: 5,
  // gasPrice: 10000000,
  gasPrice: 785202870800,
});

console.log("raw tx submitted", mintTx2.hash);
await mintTx2.wait();
console.log("raw tx mined");
