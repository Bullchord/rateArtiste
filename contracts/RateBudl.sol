// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IERC20.sol";

contract RateBudl {
    //Struct that holds all budl infos
    struct Budl {
        uint id;
        string name;
        string weblink;
        uint votes;
    }
    // uint256 public immutable i_votingFee = 0.0083 ether;

    address public owner;
    //mapping each candidate for easy ref;
    address[] public voters;
    
    mapping(uint => Budl) public budl;
    //keeping track of the budlCount
    uint public budlCount;
    //leeping track of people who has voted
    mapping(address => bool) hasRated;

    address public erc20TokenAddress;
    IERC20 private erc20Token;
    uint256 public minimumTokenBalance = 20000000000000000000 wei;

    /**
     * @dev Emitted when a new Budl is added.
     * @param budlId The ID of the added Budl.
     * @param weblink The weblink of the added Budl.
     * @param budlName The name of the added Budl.
     */
    event BudlAdded(uint256 budlId, string weblink, string budlName);

      /**
     * @dev Emitted when a vote is casted for a Budl.
     * @param candidateId The ID of the Budl being voted on.
     * @param weblink The weblink of the Budl.
     * @param budlName The name of the Budl.
     * @param votes The updated number of votes for the Budl.
     */
    event VoteCasted(
        uint candidateId,
        string weblink,
        string budlName,
        uint votes
    );

     /**
     * @dev Constructor to initialize the contract with the address of the ERC20 token.
     * @param _erc20TokenAddress The address of the ERC20 token contract.
     */
    constructor(address _erc20TokenAddress) {
        owner = msg.sender;
        erc20TokenAddress = _erc20TokenAddress;
        erc20Token = IERC20(_erc20TokenAddress);
    }

 /**
    @notice This allows only the owner to perform certain function
    @dev allows only the contract owner to pertform functions   
   */ 
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You're not allowed to perform this function"
        );
        _;
    }

    /**
    @notice This allows the project owner to add more budls 
    @dev adds more budl
    @param _name accepts the name of a buldl project.
    @param _weblink accepts the link to the buldl project.
   */ 
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

    /**
    @notice This allows a user to rate/vote for a particular project
    @dev checks the user holds some token before it can vote 
    @param _budlId accepts the Id of a buldl project.
   */ 
    function rateBudl(uint _budlId) public {
        //this ensure the user holds some token before they can vote or rate any BUDL
        require(
            erc20Token.balanceOf(msg.sender) >= minimumTokenBalance,
            "Insufficient token balance to vote"
        );
        //making sure the voter hasnt already voted
        require(!hasRated[msg.sender], "You have already voted!");
        // making sure the candidate exists
        require(_budlId > 0 && _budlId <= budlCount, "Invalid buldl!");

        // require(msg.value >= i_votingFee, "Insufficient voting fee");
        //incrementing the budl votes count
        budl[_budlId].votes++;
        //marking the voter as voted
        hasRated[msg.sender] = true;
        voters.push(msg.sender);

        //emit voted
        emit VoteCasted(
            _budlId,
            budl[_budlId].name,
            budl[_budlId].weblink,
            budl[_budlId].votes
        );
    }

    /**
      @notice This allows the contract owner to wirthdraw the acxcumulated voting fee
      @dev implement the withdrawal function if you added a voting fee : OPTIONAL
   */ 

    // function withdraw() public onlyOwner {
    //     uint256 balance = address(this).balance;
    //     require(balance>0, "not enough funds");

    //     balance = 0;
    //     (bool success,) = owner.call{value :balance}("");
    //     require(success, "withdrawal failed");
    // }

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
