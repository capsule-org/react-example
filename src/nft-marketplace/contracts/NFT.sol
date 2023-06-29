// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CapsuleMarketplace is ERC721 {
    mapping(address => uint256) private _ownedNFTs;

    struct NFTData {
        string name;
        uint256 price;
        uint256 likeCount;
    }

    mapping(uint256 => NFTData) public NFTs;

    constructor() ERC721("CapsuleMarketplace", "CNFT") {}

    function buyNFT(uint256 tokenId, string memory name, uint256 price, uint256 likeCount) public payable {
        require(!_exists(tokenId), "Error: NFT already exists.");
        require(_ownedNFTs[msg.sender] == 0, "Error: User already owns an NFT.");

        NFTs[tokenId] = NFTData(name, price, likeCount);

        _mint(msg.sender, tokenId);
        _ownedNFTs[msg.sender] = tokenId;
    }

    function unBuyNFT() public {
        uint256 ownedTokenId = _ownedNFTs[msg.sender];
        require(ownedTokenId != 0, "Error: User does not own an NFT.");

        delete NFTs[ownedTokenId];

        _burn(ownedTokenId);
        _ownedNFTs[msg.sender] = 0;
    }

    function getOwnedNFT() public view returns (uint256, string memory, uint256, uint256) {
        require(_ownedNFTs[msg.sender] != 0, "Error: User does not own an NFT.");

        uint256 ownedTokenId = _ownedNFTs[msg.sender];
        NFTData memory nftData = NFTs[ownedTokenId];

        return (ownedTokenId, nftData.name, nftData.price, nftData.likeCount);
    }
}
