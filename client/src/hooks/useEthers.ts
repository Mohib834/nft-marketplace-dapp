import { BrowserProvider, Contract } from "ethers";
import { abi } from "../../constants";

export const useEthers = () => {
  const generateContract = async (type: "provider" | "signer") => {
    let contract: null | InstanceType<typeof Contract> = null;

    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      contract = new Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi,
        type === "provider" ? provider : signer
      );

      return contract;
    }
  };

  return { generateContract };
};
