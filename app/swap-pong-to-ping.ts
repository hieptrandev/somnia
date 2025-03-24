import { wallets } from "./config";
import { sleep } from "../utils";

const { Web3 } = require("web3");
const web3 = new Web3("https://dream-rpc.somnia.network");
const abiApprove = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const abiSupply = [
  {
    name: "exactInputSingle",
    type: "function",
    stateMutability: "payable",
    inputs: [
      {
        name: "params",
        type: "tuple",
        components: [
          { name: "tokenIn", type: "address" },
          { name: "tokenOut", type: "address" },
          { name: "fee", type: "uint24" },
          { name: "recipient", type: "address" },
          { name: "amountIn", type: "uint256" },
          { name: "amountOutMinimum", type: "uint256" },
          { name: "sqrtPriceLimitX96", type: "uint160" },
        ],
      },
    ],
    outputs: [{ name: "amountOut", type: "uint256" }],
  },
];
function getRandomValue() {
  const values = [
    "100000000000000000000",
    "190000000000000000000",
    "300000000000000000000",
    "30000000000000000000",
    "40000000000000000000",
    "50000000000000000000",
    "60000000000000000000",
    "70000000000000000000",
    "80000000000000000000",
    "20000000000000000000",
    "120000000000000000000",
    "150000000000000000000",
    "220000000000000000000",
  ];
  return values[Math.floor(Math.random() * values.length)];
}

const contractApproveAddress = "0x33E7fAB0a8a5da1A923180989bD617c9c2D1C493";
const contractSupplyAddress = "0x6AAC14f090A35EeA150705f72D90E4CDC4a49b2C";
async function claim() {
  for (let index = 0; index < wallets.length; index++) {
    const { address, privatekey } = wallets[index];
    console.log(`BẮT ĐẦU VÍ THỨ ${index + 1}: ${address}\n`);
    try {
      const contractApprove = new web3.eth.Contract(
        abiApprove,
        contractApproveAddress
      );
      const dataAprove = contractApprove.methods
        .approve(
          "0x6AAC14f090A35EeA150705f72D90E4CDC4a49b2C",
          "1000000000000000000000"
        )
        .encodeABI();

      const gasPriceApprove = await web3.eth.getGasPrice();
      const gasEstimateApprove = await web3.eth.estimateGas({
        from: address,
        to: contractApproveAddress,
        data: dataAprove,
      });

      const approvePayload = {
        from: address,
        to: contractApproveAddress,
        data: dataAprove,
        gasLimit: gasEstimateApprove * 2n,
        gasPrice: gasPriceApprove * 3n,
        nonce: await web3.eth.getTransactionCount(address),
      };

      console.log("Đang tiến hành approve");
      const approvetx = await web3.eth.accounts.signTransaction(
        approvePayload,
        privatekey
      );
      const approveHash = await web3.eth.sendSignedTransaction(
        approvetx.rawTransaction
      );
      console.log(`Approve thành công tx: ${approveHash.transactionHash}`);
      await sleep(Math.floor(Math.random() * (7000 - 4000) + 4000));
      const contractSupply = new web3.eth.Contract(
        abiSupply,
        contractSupplyAddress
      );

      const params = {
        tokenIn: "0x33E7fAB0a8a5da1A923180989bD617c9c2D1C493",
        tokenOut: "0x9beaA0016c22B646Ac311Ab171270B0ECf23098F",
        fee: 500,
        recipient: address,
        amountIn: getRandomValue(),
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };
      const dataSupply = contractSupply.methods
        .exactInputSingle(params)
        .encodeABI();

      const gasPriceSupply = await web3.eth.getGasPrice();
      const gasEstimateSupply = await web3.eth.estimateGas({
        from: address,
        to: contractSupplyAddress,
        data: dataSupply,
      });

      const supplyPayload = {
        from: address,
        to: contractSupplyAddress,
        data: dataSupply,
        gasLimit: gasEstimateSupply * 2n,
        gasPrice: gasPriceSupply * 3n,
        nonce: await web3.eth.getTransactionCount(address),
      };
      console.log("Đang tiến hành swap");
      const supplyTx = await web3.eth.accounts.signTransaction(
        supplyPayload,
        privatekey
      );
      const supplyHash = await web3.eth.sendSignedTransaction(
        supplyTx.rawTransaction
      );
      console.log(`Swap thành công tx: ${supplyHash.transactionHash}`);
      console.log("DONE! LÀM VÍ TIẾP THEO\n\n");
      await sleep(Math.floor(Math.random() * (10000 - 5000) + 5000));
    } catch (error) {
      console.log(error);
    }
  }
}
claim();
