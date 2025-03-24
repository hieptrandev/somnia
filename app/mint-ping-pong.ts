import { wallets } from "./config";
import { sleep } from "../utils";

const { Web3 } = require("web3");

const web3 = new Web3("https://dream-rpc.somnia.network");

const contractPing = "0x33E7fAB0a8a5da1A923180989bD617c9c2D1C493";
const contractPong = "0x9beaA0016c22B646Ac311Ab171270B0ECf23098F";

function getRandomSleepTime() {
  return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // Random từ 60000ms (60s) đến 180000ms (180s)
}
async function mint() {
  for (let index = 0; index < wallets.length; index++) {
    const { address, privatekey } = wallets[index];
    console.log(index + 1, `Đang mint PING, PONG cho ví: ${address}`);
    try {
      const data = `0x1249c58b`;
      const gasPrice = await web3.eth.getGasPrice();
      const gasEstimate = await web3.eth.estimateGas({
        from: address,
        to: contractPing,
        data,
      });

      const nonce = await web3.eth.getTransactionCount(address);
      const tx = {
        from: address,
        to: contractPing,
        data,
        gasLimit: gasEstimate,
        gasPrice: gasPrice,
        nonce: nonce,
      };
      const signedTx = await web3.eth.accounts.signTransaction(tx, privatekey);
      const txHash = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(`Mint thành công PING, tx: ${txHash.transactionHash}`);

      const sleepTime = getRandomSleepTime();
      console.log(`Đợi ${sleepTime / 1000} giây trước khi tiếp tục...`);

      const data2 = `0x1249c58b`;
      const gasPrice2 = await web3.eth.getGasPrice();
      const gasEstimate2 = await web3.eth.estimateGas({
        from: address,
        to: contractPong,
        data,
      });

      const nonce2 = await web3.eth.getTransactionCount(address);
      const tx2 = {
        from: address,
        to: contractPong,
        data: data2,
        gasLimit: gasEstimate2,
        gasPrice: gasPrice2,
        nonce: nonce2,
      };
      const signedTx2 = await web3.eth.accounts.signTransaction(
        tx2,
        privatekey
      );
      const txHash2 = await web3.eth.sendSignedTransaction(
        signedTx2.rawTransaction
      );
      console.log(`Mint thành công PONG, tx: ${txHash2.transactionHash} \n\n`);

      await sleep(sleepTime);
    } catch (error: any) {
      console.log(address, error?.message);

      const sleepTime = getRandomSleepTime();
      console.log(
        `Lỗi xảy ra, đợi ${sleepTime / 1000} giây, chuyển sang ví khác...\n\n`
      );
      await sleep(sleepTime);
    }
  }
}

mint();
