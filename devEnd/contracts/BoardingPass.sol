// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


import "hardhat/console.sol";

contract BoardingPass is ERC721, Ownable{
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    //Mapping address to array of tokenIds
    mapping(address => uint[]) private _tokenHolders;

    using Strings for uint256;
    //URIs mapping  tokenId to uri datas
    mapping(uint => string) private _uris;

    string private _baseURIextended;

    constructor() ERC721("PlaneHub Token", "PHT"){}
    
    
    //=========================
    
    function setBaseURI(string memory baseURI) external onlyOwner{
        _baseURIextended = baseURI;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual
    {
        require(_exists(tokenId), "ERC721Metadata : URI set of nonexistent token");
        _uris[tokenId] = _tokenURI;
    }
    
    function mint(address _to, string memory _tokenURI) public payable{
        require(msg.value == 1, "Not enough Ether");
        _tokenIdCounter.increment();
        _uris[_tokenIdCounter.current()] = _tokenURI;
        _safeMint(_to, _tokenIdCounter.current());
        
        _tokenHolders[msg.sender].push(_tokenIdCounter.current());
    }
    
    
    function getTokenURI(uint256 tokenId) private view returns (string memory){
        return _uris[tokenId];
    }

}