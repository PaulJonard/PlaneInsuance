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
    
    //Mapping address to tokenIds
    mapping(address => uint[]) private _tokenHolders;
    //Mapping tokenId to attributes
    mapping(uint => BoardingPassAttributes) private _attributes;

    //Mapping oneFlightNumber to tokenIds
    mapping(string => uint[]) private _tokenIdFromNumber;

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
    
    function mint(string memory _num, string memory _departure, string memory _destination, string memory _boardingDate, string memory _boardingTime, bool _canceled, uint _price, uint256 _wei) public virtual payable{
        require(msg.value >= _wei, "Not enough Ether");
        _tokenIdCounter.increment();
        uint actualIdCounter = _tokenIdCounter.current();
        
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
        _tokenIdFromNumber[_num].push(actualIdCounter);
        _attributes[actualIdCounter] = bpa;
    }

    function refund(uint _tokenId, uint weiToSend) public payable {
        require(msg.sender == ownerOf(_tokenId), "Not your token!");
        require(_attributes[_tokenId].canceled == true, "This flight isn\'t canceled!!");
        require(address(this).balance > weiToSend, "Contract\'s balance hasn\'t enough Ether");

        //burn
        _burn(_tokenId);
        //Delete     
        delete _tokenHolders[msg.sender][_tokenId-1];
        delete _tokenIdFromNumber[_attributes[_tokenId].num][_tokenId-1];
        delete _attributes[_tokenId];
        //Refund
        (bool sent, bytes memory data) = payable(msg.sender).call{value : weiToSend}("");
        require(sent, "Failed to send Ether");
    }

    function getAllTokensFromAdress(address _address) public view returns(uint[] memory){
        return _tokenHolders[_address];
    }    

    function updateAllTokensCanceledValueByNum(string memory _num) public{
        uint[] memory tokenIds = _tokenIdFromNumber[_num];
        for (uint i = 1; i <= tokenIds.length; i++ ){
            _attributes[i].canceled = !_attributes[i].canceled;
        }
    }

    function getTokenCanceledValue(uint _tokenId) public view returns(bool){
        return _attributes[_tokenId].canceled;
    }

    function getTokenURI(uint _tokenId) public view returns(string memory){
        require(_exists(_tokenId),"Token doesn\'t exists");
        BoardingPassAttributes memory bpa = _attributes[_tokenId];

        string memory tokenId = Strings.toString(_tokenId);
        string memory isCanceled = Strings.toString(bpa.canceled ? 1 : 0);
        string memory price = Strings.toString(bpa.price);
        string memory ethPrice = Strings.toString(getLatestEthPrice());
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"data":{',
                            '"tokenId":"',tokenId,'",',
                            '"num":"',bpa.num,'",',
                            '"departure":"',bpa.departure,'",',
                            '"destination":"',bpa.destination,'",',
                            '"boardingDate":"',bpa.boardingDate,'",',
                            '"boardingTime":"',bpa.boardingTime,'",',
                            '"canceled":',isCanceled,',',
                            '"price":',price,',',
                            '"ethPrice":',ethPrice,
                        '}}'
                    )
                )
            )
        );  
    
        string memory output = string(
            abi.encodePacked("data:application/json;base64,",json)
        );
        return output;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory){
        BoardingPassAttributes memory bpa = _attributes[_tokenId];

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{',
                        '"name": "BoardingPass",',
                        '"-- NFT #": "',Strings.toString(_tokenId),'",',
                        '"description": "Une collection qui represente des billets d avion",',
                        '"image": "https://images.emojiterra.com/google/android-11/512px/2708.png",',
                        '"attributes": [',
                            '{',
                                '"trait_type": "FlightNumber",', 
                                '"value": "',bpa.num,'"', 
                            '},',
                            '{',
                                '"trait_type": "Departure",', 
                                '"value": "',bpa.departure,'"', 
                            '},',
                            '{',
                                '"trait_type": "Destination",', 
                                '"value": "',bpa.destination,'"', 
                            '},',
                            '{',
                                '"trait_type": "BoardingDate",', 
                                '"value": "',bpa.boardingDate,'"', 
                            '},',
                            '{',
                                '"trait_type": "BoardingTime",', 
                                '"value": "',bpa.boardingTime,'"', 
                            '},',
                            '{',
                                '"trait_type": "IsCanceled",', 
                                '"value": "',Strings.toString(bpa.canceled ? 1 : 0),'"', 
                            '},',
                            '{',
                                '"trait_type": "Price",', 
                                '"value": "',Strings.toString(bpa.price),'"', 
                            '}'
                        ']'
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