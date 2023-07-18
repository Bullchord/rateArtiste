export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "budlId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "weblink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "budlName",
        type: "string",
      },
    ],
    name: "BudlAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "weblink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "budlName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
    ],
    name: "VoteCasted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_weblink",
        type: "string",
      },
    ],
    name: "addBudl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "budl",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "weblink",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "budlCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_budlId",
        type: "uint256",
      },
    ],
    name: "getBudl",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_budlId",
        type: "uint256",
      },
    ],
    name: "getBudlLink",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_budlId",
        type: "uint256",
      },
    ],
    name: "getBudlVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_budlId",
        type: "uint256",
      },
    ],
    name: "getBudls",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "weblink",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_budlId",
        type: "uint256",
      },
    ],
    name: "rateBudl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
