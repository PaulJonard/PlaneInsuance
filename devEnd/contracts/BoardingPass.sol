// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


import "hardhat/console.sol";

import "./libraries/Base64.sol";

contract BoardingPass is ERC721, Ownable{
    
    struct BoardingPassAttributes{
        string num;
        string departure;
        string destination;
        string boardingDate;
        string boardingTime;
        bool canceled;
        uint price;
    }

    AggregatorV3Interface internal priceFeed;
    
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    //Mapping address to mapping of Attributes
    mapping(address => uint256[]) private _tokenHolders;
    mapping(uint256 => BoardingPassAttributes) private _attributes;

    constructor() ERC721("PlaneHub Token", "PHT"){
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }    
    
    //=========================
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    function getLatestEthPrice() public view returns (uint256){
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    //=========================
    
    function mint(string memory _num, string memory _departure, string memory _destination, string memory _boardingDate, string memory _boardingTime, bool _canceled, uint _price, uint ethPrice) public virtual payable{
        require(msg.value >= ethPrice, "Not enough Ether");
        _tokenIdCounter.increment();
        uint256 actualIdCounter = _tokenIdCounter.current();
        
        _safeMint(msg.sender, actualIdCounter);

        BoardingPassAttributes memory bpa = BoardingPassAttributes({
            num: _num,
            departure : _departure,
            destination : _destination,
            boardingDate : _boardingDate,
            boardingTime : _boardingTime,
            canceled : _canceled,
            price : _price
        });

        _tokenHolders[msg.sender].push(actualIdCounter);
        _attributes[actualIdCounter] = bpa;
    }

    function refund(address payable _wallet, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "Not your token!");
        uint256 dollarPrice = _attributes[_tokenId].price;

        require(getLatestEthPrice() > 0, "not retrieve");
        uint256 toSendQty = (dollarPrice**8 / getLatestEthPrice())**18;
        require(toSendQty > 0, "eth quantity to send not retrieve from chainlink");
        require(address(this).balance > toSendQty);

        //burned
        _burn(_tokenId);
        //Delete
        delete _tokenHolders[msg.sender][_tokenId-1];
        delete _attributes[_tokenId];
        //Refund
        (bool sent, bytes memory data) = _wallet.call{value: toSendQty}("");
        require(sent, "Failed to send Ether");
    }
    
    function getAllTokensFromAdress() public view returns(uint256[] memory){
        return _tokenHolders[msg.sender];
    }    

    function updateTokenCanceledValue(uint256 _tokenId, bool _isCanceled) public {
        require(msg.sender == ownerOf(_tokenId), "Not your token!");
        _attributes[_tokenId].canceled = _isCanceled;
    }

    function getTokenCanceledValue(uint256 _tokenId) public view returns(bool){
        return _attributes[_tokenId].canceled;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
        BoardingPassAttributes memory boardingPassAttributes = _attributes[_tokenId];
        
        string memory isCanceled = Strings.toString(boardingPassAttributes.canceled ? 1 : 0);
        string memory price = Strings.toString(boardingPassAttributes.price);

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        "BoardingPass",
                        ' -- NFT #: ',
                        Strings.toString(_tokenId),
                        '", "description": "Une collection qui represente des billets d\'avion","image": "',
                        "https://images.emojiterra.com/google/android-11/512px/2708.png",
                        '", "attributes": [ { "trait_type": "Num", "value": ',boardingPassAttributes.num,'}, { "trait_type": "Departure", "value": ', boardingPassAttributes.departure,'}, { "trait_type": "Destination", "value": ', boardingPassAttributes.destination,'},  { "trait_type": "Boarding Date", "value": ', boardingPassAttributes.boardingDate,'},  { "trait_type": "Boarding Time", "value": ', boardingPassAttributes.boardingTime,'},  { "trait_type": "Canceled", "value": ', isCanceled,'},  { "trait_type": "USD Price", "value": ',price,'} ]}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,",json)
        );
        return output;
    }
}