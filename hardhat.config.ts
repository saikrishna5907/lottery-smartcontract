// import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle"; // testing framework
import "@typechain/hardhat"; // this is to get types from contract to the codebase refer to auto generated "typechain-types" directory
import dotenv from 'dotenv';
import "hardhat-gas-reporter"; // estimates and gives report on how much GAS is required for each function in contract    
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage"; // generates the test coverage of the code

const { parsed, error } = dotenv.config({ path: './.env.example' });
console.error(error);

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;
