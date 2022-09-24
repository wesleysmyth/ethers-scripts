import 'dotenv/config';
import { BigNumber, ethers } from 'ethers';

const wallet = ethers.Wallet.createRandom();

console.log('address: ', wallet.address);
console.log('private key: ', wallet.privateKey);
console.log('mnemonic: ', wallet.mnemonic);
console.log('mnemonic phrase: ', wallet.mnemonic.phrase);

let path, myWallet;

/*
 * show how a single mnemonic associated with an account can create multiple wallet addresses
 * by updating the path associated with the wallet
 */
for (let i = 0; i < 10; i++) {
    path = `m/44'/60'/0'/0/${i}`;
    myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
    console.log('myWallet.address', i, myWallet.address);
    console.log('myWallet.privateKey', i, myWallet.privateKey);
}

///////////////////////////////////////////////////////////////////

const rinkebyInfuraUrl = `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`;
const rinkebyProvider = new ethers.providers.JsonRpcProvider(rinkebyInfuraUrl);
const mainnetInfuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetInfuraUrl);

// create a new wallet w/ the private key stored in .env
const newWallet = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, rinkebyProvider);

// sign a message
const message = 'Hi folks!!';
const signature = await newWallet.signMessage(message);

console.log('My new wallet address is:', newWallet.address);
console.log('IsSigner?', newWallet._isSigner);
console.log('Signed message', signature);

// verify the signer address of the message sender, given the message and signature
const signerAddress = ethers.utils.verifyMessage(message, signature);
console.log('Signer address is', signerAddress);

// get the wallet balance on rinkeby
const rinkebyBalance = await rinkebyProvider.getBalance(newWallet.address);
const formattedRinkebyBalance = ethers.utils.formatEther(rinkebyBalance);
const tenPercent = rinkebyBalance.div(BigNumber.from(10));

console.log('Rinkeby balance:', formattedRinkebyBalance, 'ETH');
console.log('tenPercent:', tenPercent);

// need to look up w3sley.eth on mainnet provider, since it isn't registered on rinkeby
const w3sleyAddress = await mainnetProvider.resolveName('w3sley.eth');
// send ten percent of our balance to w3sley.eth
const tx = await newWallet.sendTransaction({
    to: w3sleyAddress,
    value: tenPercent
});

console.log('tx sent!', tx);

const result = await tx.wait();

console.log('tx result:', result);


