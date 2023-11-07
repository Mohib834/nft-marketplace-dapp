import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTMarketPlace } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFT Market Place", () => {
  let nftMarketPlace: NFTMarketPlace;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  const toWei = (ether: string) => ethers.parseEther(ether);
  const toEther = (wei: string | number | bigint) => ethers.formatEther(wei);

  beforeEach(async () => {
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
    nftMarketPlace = await NFTMarketPlace.deploy(20);

    await nftMarketPlace.waitForDeployment();

    // Setting the owner and user addr;
    const signers = await ethers.getSigners();
    owner = signers[0];
    addr1 = signers[1];
    addr2 = signers[2];

    // changing the add
    nftMarketPlace = nftMarketPlace.connect(addr1);
  });

  describe("NFT Creation", () => {
    it("Should create a new nft token while listing", async () => {
      let tokens = await nftMarketPlace.tokenCount();
      expect(tokens.toString()).to.be.equal("0");
      // create a token
      await nftMarketPlace.listAsset(10, "http://token.io");

      tokens = await nftMarketPlace.tokenCount();
      expect(tokens.toString()).to.be.equal("1");
    });
  });

  describe("Asset Listing", () => {
    it("Should throw invalid price if price is than less 0", async () => {
      const res = nftMarketPlace.listAsset(-1, "");

      expect(res).to.be.revertedWithCustomError(
        nftMarketPlace,
        "InvalidPriceSet"
      );
    });

    it("Should list the new nft asset", async () => {
      await nftMarketPlace.listAsset(10, "http://token.io");
      const assetsList = await nftMarketPlace.getAllAssets();

      const asset = assetsList[0];

      expect(asset.seller).to.be.equal(addr1.address);
      expect(asset.price).to.be.equal(10);
      expect(asset.tokenId).to.be.equal(1);
      expect(asset.isSold).to.be.equal(false);
    });

    it("Should transfer the nft ownership to the marketplace when listing", async () => {
      await nftMarketPlace.listAsset(10, "http://token.io");
      const marketPlaceAdd = await nftMarketPlace.getAddress();

      const nftOwner = await nftMarketPlace.ownerOf(1);
      expect(nftOwner).to.be.equal(marketPlaceAdd);
    });
  });

  describe("Asset Purchasing", () => {
    beforeEach(async () => {
      await nftMarketPlace.listAsset(3, "http://token.io");
    });

    it("Should throw error on invalid tokenId", async () => {
      let res = nftMarketPlace.buyAsset(100);

      expect(res).to.be.revertedWithCustomError(
        nftMarketPlace,
        "InvalidTokenIdProvided"
      );

      res = nftMarketPlace.buyAsset(-1);

      expect(res).to.be.revertedWithCustomError(
        nftMarketPlace,
        "InvalidTokenIdProvided"
      );
    });

    it("Should throw error if amount send is incorrect than the nft price", async () => {
      let res = nftMarketPlace.buyAsset(1, { value: 1 });

      expect(res).to.be.revertedWithCustomError(
        nftMarketPlace,
        "InvalidAmount"
      );
    });

    it("Should let purchasing of nft asset", async () => {
      // Buy asset
      // Check the buyer account bal
      // Check the seller account bal
      // Check the marketplace owner account bal

      const buyerAdd = addr2;
      const sellerAdd = addr1;

      const sellerBalBefore = await ethers.provider.getBalance(
        sellerAdd.address
      );
      const ownerBalBefore = await ethers.provider.getBalance(owner.address);

      const listedNFTPrice = (await nftMarketPlace.getAllAssets())[0].price;
      const totalNftPrice = await nftMarketPlace.getAssetTotalPrice(1);

      await nftMarketPlace
        .connect(buyerAdd)
        .buyAsset(1, { value: toWei(totalNftPrice.toString()) });

      const sellerBalAfter = await ethers.provider.getBalance(
        sellerAdd.address
      );
      const ownerBalAfter = await ethers.provider.getBalance(owner.address);

      // Seller balance gets increased
      expect(Number(toEther(sellerBalAfter))).to.be.equal(
        Number(toEther(sellerBalBefore)) + Number(listedNFTPrice)
      );

      // marketplace owner should get the fee
      const fee = totalNftPrice - listedNFTPrice;

      expect(toEther(ownerBalAfter)).to.be.equal(toEther(ownerBalBefore + fee));
    });

    it("Should transfer the nft ownership to the buyer", async () => {
      const totalNftPrice = await nftMarketPlace.getAssetTotalPrice(1);
      const marketPlaceAdd = await nftMarketPlace.getAddress();

      expect(await nftMarketPlace.ownerOf(1)).to.be.equal(marketPlaceAdd);

      await nftMarketPlace
        .connect(addr2)
        .buyAsset(1, { value: toWei(totalNftPrice.toString()) });

      expect(await nftMarketPlace.ownerOf(1)).to.be.equal(addr2.address);
    });
  });
});
