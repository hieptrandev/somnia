import { wallets } from "./config";

const { Web3 } = require("web3");

const web3 = new Web3("https://dream-rpc.somnia.network");

async function sendRandomNativeToken() {
  for (let i = 0; i < wallets.length; i++) {
    const { address, privatekey } = wallets[i];
    const index1 = i + 1;
    const index2 = wallets.length - (i + 1);
    const { address: to } = wallets[index2];
    const amount = web3.utils.toWei(
      (0.001 + Math.random() * (0.01 - 0.001)).toFixed(3),
      "ether"
    );

    const tx = {
      from: address,
      to: to,
      value: amount,
      gasLimit: 21000n,
      gasPrice: await web3.eth.getGasPrice(),
    };

    try {
      const signedTx = await web3.eth.accounts.signTransaction(tx, privatekey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(`ĐANG LÀM VÍ ${index1}`);
      console.log(`Ví gửi: ${address}, tx: ${receipt.transactionHash}`);
      console.log(`Ví nhận: ${to}, tx: ${receipt.transactionHash}`);
    } catch (error) {
      console.error(`Lỗi khi gửi giao dịch ${i + 1}:`, error);
    }
    console.log("Đợi làm ví tiếp theo \n\n");
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );
  }
  console.log("Hoàn trao đổi token native!");
}

sendRandomNativeToken().catch(console.error);
