import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  const NFTContract = await ethers.getContractFactory("NFTMarketPlace");
  const nftContract = await NFTContract.deploy(20);

  await nftContract.waitForDeployment();

  const contractAddress = nftContract.target;

  console.log("Contract deployed to address:", contractAddress);

  // console.log("Contract deployed to address:", await nftContract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
