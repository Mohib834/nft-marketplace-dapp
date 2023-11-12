// SPDX-License-Identifier: MIT
pragma solidity = 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
// User can add nft in marketplace listing
// User can delete their nft from the listing
// User can update the nft price
// Users can buy nft of other users

error InvalidPriceSet(uint price);
error InvalidAmount(uint sent, uint required);
error SendingFailed();
error InvalidTokenIdProvided();

contract NFTMarketPlace is ERC721URIStorage {
    // State Variables
    uint256 private immutable i_feePercentage;
    address payable private immutable i_feeAddress;
    mapping(uint256 => NFTAsset) private assetsMap;
    
    NFTAsset[] public assetsList;
    uint256 public tokenCount;

    // Events
    event NewAssetAdded(uint256 tokenId, uint256 price);
    event AssetBought(uint256 tokenId, address indexed buyer, uint256 price);

    // Structs
    struct NFTAsset {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isSold;
    }

    constructor(uint256 _feePercentage) ERC721("Asset", "AST"){
        i_feePercentage = _feePercentage;
        i_feeAddress = payable(msg.sender);
    }

    function createNFT(string memory _tokenUri) private returns(uint256) {
        tokenCount++;

        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenUri);
        _setApprovalForAll(msg.sender, address(this), true);

        return tokenCount;
    }

    function listAsset(uint256 price, string memory _tokenUri) external{
        if(price <= 0) revert InvalidPriceSet(price);

        // Mint the nft
        uint256 tokenId = createNFT(_tokenUri);

        // list the nft;
        _transfer(msg.sender, address(this), tokenId);

        NFTAsset memory asset = NFTAsset(tokenId, payable(msg.sender), price, false);

        assetsMap[tokenId] = asset;
        assetsList.push(asset);

        emit NewAssetAdded(tokenId, price);
    }

    function buyAsset(uint256 _tokenId) external payable{
        if(_tokenId <= 0 && _tokenId > tokenCount) revert InvalidTokenIdProvided();

        uint totalPrice = getAssetTotalPrice(_tokenId);
        NFTAsset memory asset = assetsMap[_tokenId];
        
        if(msg.value != (totalPrice * 1 ether)) revert InvalidAmount(msg.value, totalPrice * 1 ether);

        // transfer the nft to the buyer
        _safeTransfer(address(this), msg.sender, _tokenId);

        // transfer the amount to seller
        (bool sellerSent,) = asset.seller.call{value: asset.price * 1 ether}("");

        if(!sellerSent) revert SendingFailed();

        // transfer the fee to the relevent address
        uint fee = totalPrice - asset.price;
        (bool sent,) = i_feeAddress.call{value: fee * 1 ether}("");

        if(!sent) revert SendingFailed();

        emit AssetBought(_tokenId, msg.sender, asset.price);
    }

    // views
    function getAssetTotalPrice(uint256 _tokenId) public view returns(uint){
        return assetsMap[_tokenId].price + (assetsMap[_tokenId].price * i_feePercentage) / 100;
    }
}