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

    string private _baseURIextended = "https://gateway.pinata.cloud/ipfs/";

    constructor() ERC721("PlaneHub Token", "PHT"){}
    
    
    //=========================
    function ethToWei(uint256 ethPrice) internal pure returns(uint256){
        return ethPrice**18;
    }    
    //=========================
    
    function mint(string memory _tokenURI, uint256 price) public virtual payable{
        require(msg.value >= ethToWei(price), "Not enough Ether");
        _tokenIdCounter.increment();
        _safeMint(msg.sender, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), _tokenURI);
        _tokenHolders[msg.sender].push(_tokenIdCounter.current());
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual
    {
        require(_exists(tokenId), "ERC721Metadata : URI set of nonexistent token");
        _uris[tokenId] = string(abi.encodePacked(_baseURIextended, _tokenURI));
    }
    
    function getTokenURI(uint256 tokenId) public view returns (string memory){
        return _uris[tokenId];
    }
    
    function getAllTokensFromAdress(address _from) public view returns(uint256[] memory){
        return _tokenHolders[_from];
    }    
}