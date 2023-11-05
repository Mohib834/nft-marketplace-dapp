import { ethers } from "hardhat";

async function main() {
  const nftContract = await ethers.deployContract("NFTMarketPlace");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
