// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RateArtiste {
    //Defining a struct for each artiste
    struct Artiste {
        uint id;
        string name;
        uint votes;
    }

    address public owner;
    //mapping each candidate for easy ref;
    mapping(uint => Artiste) public artiste;
    //keeping track of the artisteCount
    uint public artisteCount;
    //leeping track of people who has voted
    mapping(address => bool) hasRated;

    //Event to notify when artiste has been added
    event ArtisteAdded(uint256 artisteID, string artisteName);
    // event to notify when voted has been casted
    event VoteCasted(uint candidateId, string artisteName, uint votes);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You're not allowed to perform this function"
        );
        _;
    }

    //adding a new artiste
    function addArtiste(string memory _name) public onlyOwner {
        //increasing the artiste count
        artisteCount++;
        //setting the artisteId to the artistecount, the name and the initial votes o zero
        artiste[artisteCount] = Artiste(artisteCount, _name, 0);
        //sending the artiste alerts
        emit ArtisteAdded(artisteCount, _name);
    }

    //function to vote/rate an artiste
    function rateArtiste(uint _artisteId) public {
        //making sure the voter hasnt already voted
        require(!hasRated[msg.sender], "You have already rated!");

        // making sure the candidate exists
        require(
            _artisteId > 0 && _artisteId <= artisteCount,
            "Invalid candidate!"
        );

        //incrementing the artiste votes count
        artiste[_artisteId].votes++;

        //marking the voter as voted
        hasRated[msg.sender] = true;

        //emit voted
        emit VoteCasted(
            _artisteId,
            artiste[_artisteId].name,
            artiste[_artisteId].votes
        );
    }

    //function to get the artiste votes
    function getArtisteVotes(uint _artisteId) public view returns (uint256) {
        return artiste[_artisteId].votes;
    }

    //function to get the artiste 
    function getArtiste(uint _artisteId) public view returns (string memory) {
        return artiste[_artisteId].name;
    }
}
