import { BrowserProvider, Contract } from "ethers";
import { abi } from "../../constants";

export const useEthers = () => {
  const generateContract = async (type: "provider" | "signer") => {
    let contract: null | InstanceType<typeof Contract> = null;

    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      contract = new Contract(
        "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        abi,
        type === "provider" ? provider : signer
      );

      return contract;
    }
  };

  return { generateContract };
};
