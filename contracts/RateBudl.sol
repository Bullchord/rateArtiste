// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RateBudl {
    //Defining a struct for each budl
    struct Budl {
        uint id;
        string name;
        string weblink;
        uint votes;
    }
    uint256 public immutable i_votingFee = 0.0083 ether;

    address public owner;
    //mapping each candidate for easy ref;
    mapping(uint => Budl) public budl;
    //keeping track of the budlCount
    uint public budlCount;
    //leeping track of people who has voted
    mapping(address => bool) hasRated;

    //Event to notify when budl has been added
    event BudlAdded(uint256 budlId, string weblink, string budlName);

    // event to notify when voted has been casted
    event VoteCasted(
        uint candidateId,
        string weblink,
        string budlName,
        uint votes
    );

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

    //adding a new budl
    function addBudl(
        string memory _name,
        string memory _weblink
    ) public onlyOwner {
        //increasing the budl count
        budlCount++;
        //setting the budlId to the budlcount, the name and the initial votes o zero
        budl[budlCount] = Budl(budlCount, _name, _weblink, 0);
        //sending the budl alerts
        emit BudlAdded(budlCount, _name, _weblink);
    }

    //function to vote/rate an budl
    function rateBudl(uint _budlId) public payable {
        //making sure the voter hasnt already voted
        require(!hasRated[msg.sender], "You have already voted!");
        // making sure the candidate exists
        require(_budlId > 0 && _budlId <= budlCount, "Invalid buldl!");
        require(msg.value >= i_votingFee, "Insufficient voting fee");
        //incrementing the budl votes count
        budl[_budlId].votes++;
        //marking the voter as voted
        hasRated[msg.sender] = true;

        //emit voted
        emit VoteCasted(
            _budlId,
            budl[_budlId].name,
            budl[_budlId].weblink,
            budl[_budlId].votes
        );
    }
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance>0, "not enough funs");

        balance = 0;
        (bool success,) = owner.call{value :balance}("");
        require(success, "withdrawal failed");
    }

    //function to get the budl votes
    function getBudlVotes(uint _budlId) public view returns (uint256) {
        return budl[_budlId].votes;
    }

    //function to get the budl
    function getBudl(uint _budlId) public view returns (string memory) {
        return budl[_budlId].name;
    }

    function getBudls(
        uint _budlId
    )
        public
        view
        returns (string memory name, string memory weblink, uint vote)
    {
        Budl storage budls = budl[_budlId];
        return (budls.name, budls.weblink, budls.votes);
    }

    function getBudlLink(uint _budlId) public view returns (string memory) {
        return budl[_budlId].weblink;
    }
}
