import 'dotenv/config';
import { ethers } from 'ethers';

const getProvider = (mainnet = false) => {
    const chain =  mainnet ? 'mainnet' : 'rinkeby';
    const providerUrl = `https://${chain}.infura.io/v3/${process.env.INFURA_KEY}`

    return new ethers.providers.JsonRpcProvider(providerUrl);
};

const provider = getProvider();
// console.log('provider', await provider.getNetwork());

const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    // console.log('address:', wallet.address);
    // console.log('private key:', wallet.privateKey);
    // console.log('mnemonic:', wallet.mnemonic.phrase);
};

// generateNewWallet();

const getSigner = () => {
    const provider = getProvider();

    return new ethers.Wallet(
        process.env.MY_WALLET_PRIVATE_KEY,
        provider
    );
};

// const signer = getSigner();
// console.log(await signer.getAddress());

export {
    getProvider,
    generateNewWallet,
    getSigner,
};
