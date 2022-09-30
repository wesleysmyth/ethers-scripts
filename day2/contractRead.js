import { ethers } from "ethers";
import { getProvider } from "./utils.js";
import sanfordNFTAbi from "./abi/sanfordNFTAbi.js";

const sanfordNFTAddress = "0x6E2756D5A4780c4d26De0A91f0c0AF5CE77cBC34";
const rinkebyProvider = getProvider();

const sanfordContract = new ethers.Contract(
  sanfordNFTAddress,
  sanfordNFTAbi,
  rinkebyProvider
);

const mintPrice = await sanfordContract.MINT_PRICE();
const formattedMintPrice = ethers.utils.formatEther(mintPrice);

console.log("mintPrice", mintPrice);
console.log("formattedMintPrice", formattedMintPrice);
