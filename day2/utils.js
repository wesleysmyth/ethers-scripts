import "dotenv/config";
import { ethers, JsonRpcProvider } from "ethers";

const getProvider = (mainnet = false) => {
  const chain = mainnet ? "mainnet" : "goerli";
  const providerUrl = `https://${chain}.infura.io/v3/${process.env.INFURA_KEY}`;

  return new JsonRpcProvider(providerUrl);
};

const provider = getProvider();
// console.log('provider', await provider.getNetwork());

const generateNewWallet = () => {
  const wallet = ethers.Wallet.createRandom();

  console.log("address:", wallet.address);
  console.log("private key:", wallet.privateKey);
  console.log("mnemonic:", wallet.mnemonic.phrase);
};

// generateNewWallet();

const getSigner = (mainnet = false) => {
  const provider = getProvider(false);

  return new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);
};

// const signer = getSigner();
// console.log(await signer.getAddress());

export { getProvider, generateNewWallet, getSigner };
