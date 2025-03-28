export const abi = [
  {
    inputs: [
      { internalType: "address", name: "smartAccount", type: "address" },
    ],
    name: "AlreadyInitialized",
    type: "error",
  },
  { inputs: [], name: "InvalidExecution", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "smartAccount", type: "address" },
    ],
    name: "NotInitialized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "smartAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "ExecutionAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "smartAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "ExecutionStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "smartAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "ExecutionTriggered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "smartAccount",
        type: "address",
      },
    ],
    name: "ExecutionsCancelled",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "smartAccount", type: "address" },
    ],
    name: "accountJobCount",
    outputs: [{ internalType: "uint256", name: "jobCount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "orderData", type: "bytes" }],
    name: "addOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "jobId", type: "uint256" }],
    name: "executeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "smartAccount", type: "address" },
      { internalType: "uint256", name: "jobId", type: "uint256" },
    ],
    name: "executionLog",
    outputs: [
      { internalType: "uint48", name: "executeInterval", type: "uint48" },
      { internalType: "uint16", name: "numberOfExecutions", type: "uint16" },
      {
        internalType: "uint16",
        name: "numberOfExecutionsCompleted",
        type: "uint16",
      },
      { internalType: "uint48", name: "startDate", type: "uint48" },
      { internalType: "bool", name: "isEnabled", type: "bool" },
      { internalType: "uint48", name: "lastExecutionTime", type: "uint48" },
      { internalType: "bytes", name: "executionData", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "smartAccount", type: "address" },
    ],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "typeID", type: "uint256" }],
    name: "isModuleType",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "onInstall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "onUninstall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "jobId", type: "uint256" }],
    name: "toggleOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
];
