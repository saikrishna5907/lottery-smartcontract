import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";

const { parsed, error } = dotenv.config({ path: './.env.example' });
console.error(error);


const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL_TEST_NET || "";
const RINKEBY_PRIVATE_KEY_TEST_NET =
  process.env.RINKEBY_PRIVATE_KEY_TEST_NET !== undefined
    ? [process.env.RINKEBY_PRIVATE_KEY_TEST_NET]
    : [];

const POLYGON_RPC_URL_TEST_NET = process.env.POLYGON_RPC_URL_TEST_NET || "";
const POLYGON_PRIVATE_KEY_TEST_NET =
  process.env.POLYGON_PRIVATE_KEY_TEST_NET !== undefined
    ? [process.env.POLYGON_PRIVATE_KEY_TEST_NET]
    : [];

const SEPOLIA_RPC_URL_TEST_NET = process.env.SEPOLIA_RPC_URL_TEST_NET || "";
const SEPOLIA_PRIVATE_KEY_TEST_NET =
  process.env.SEPOLIA_PRIVATE_KEY_TEST_NET !== undefined
    ? [process.env.SEPOLIA_PRIVATE_KEY_TEST_NET]
    : [];

const ETHER_SCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;


const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.18" }, { version: "0.8.8" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: RINKEBY_PRIVATE_KEY_TEST_NET,
      chainId: 4,
    },
    polygonTestNet: {
      url: POLYGON_RPC_URL_TEST_NET,
      accounts: POLYGON_PRIVATE_KEY_TEST_NET,
      chainId: 80001,
    },
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL_TEST_NET,
      accounts: SEPOLIA_PRIVATE_KEY_TEST_NET,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      // 4: 1 // for rinkeby
    },
    player: {
      default: 1
    }
  },
};

export default config;
