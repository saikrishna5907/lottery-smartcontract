import { ethers } from "hardhat";

export type INetworkConfig = {
  name: string;
  ethUSDPriceFeedAddress: string;
  blockConfirmations?: number;
  vrfCoordinatorV2?: string
  entranceFee: bigint
  gasLane: string
  subscriptionId?: string
  callbackGasLimit: string,
  interval: string
};
export const NETWORK_CONFIG: Record<number, INetworkConfig> = {
  4 /* rinkeby chainID */: {
    name: "rinkeby",
    ethUSDPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    blockConfirmations: 6,
    entranceFee: ethers.parseEther('0.01'),
    gasLane: 'need to check',
    callbackGasLimit: '500000',
    interval: '30' //30 secs
  },
  80001 /*polygon test net chain id*/: {
    name: "polygon",
    ethUSDPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    blockConfirmations: 6,
    vrfCoordinatorV2: '0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed',
    entranceFee: ethers.parseEther('0.01'),
    gasLane: '0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f',
    callbackGasLimit: '500000',
    interval: '30' //30 secs
  },
  137 /* matic chainID */: {
    name: "matic",
    ethUSDPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    entranceFee: ethers.parseEther('0.01'),
    gasLane: '0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93',
    callbackGasLimit: '500000',
    interval: '30' //30 secs
  },
  11155111 /*sepolia test net chain id*/: {
    name: "sepolia",
    ethUSDPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    vrfCoordinatorV2: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
    entranceFee: ethers.parseEther('0.01'),
    gasLane: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
    callbackGasLimit: '500000',
    interval: '30' //30 secs
  },
  31337: {
    name: 'hardhat',
    ethUSDPriceFeedAddress: 'need to check',
    entranceFee: ethers.parseEther('0.01'),
    gasLane: 'no need, as we mock gasLane in local/hardhat',
    callbackGasLimit: '500000',
    interval: '30' //30 secs
  }
};

export const DEVELOPMENT_CHAINS: number[] = [31337];
