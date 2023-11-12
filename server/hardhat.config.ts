require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  gasReporter: {
    enabled: true,
  },
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: ALCHEMY_API_KEY,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
  },
};

export default config;
