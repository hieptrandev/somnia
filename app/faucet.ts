import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { sleep } from "../utils";
import { wallets } from "./config";

async function main() {
  for (let index = 0; index < wallets.length; index++) {
    const { address, proxy } = wallets[index];
    try {
      await sleep(3000);
      const axiosInstance = axios.create(
        proxy ? { httpsAgent: new HttpsProxyAgent(proxy) } : {}
      );

      await getIp(axiosInstance);
      console.log("Đang faucet...");
      const { data } = await axiosInstance.post(
        "https://testnet.somnia.network/api/faucet",
        {
          address: "0x0b96a7B14B9d2CcEd4508DF490167b2957cB188B",
        }
      );
      console.log(address, data, "\n\n");
      await sleep(3000);
    } catch (error: any) {
      console.log("Lỗi: ", error?.response?.data);
      await sleep(3000);
    }
  }
}

main();
async function getIp(axiosInstance: any) {
  try {
    const response = await axiosInstance.get(
      "https://api64.ipify.org?format=json"
    );
    console.log("Địa chỉ IP hiện tại:", response.data.ip);
    return response.data.ip;
  } catch (error: any) {
    console.error("Lỗi khi lấy địa chỉ IP:", error.message);
  }
}
