import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HARDHAT_CHAIN_ID } from "../constants";
import { DEVELOPMENT_CHAINS } from "../helper-hardhat-config";
const BASE_FEE = ethers.parseEther('0.25')
const GAS_PREICE_LINK = 1e9;
export const deployMocks: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments;

    const chainId = network.config.chainId || HARDHAT_CHAIN_ID;
    if (DEVELOPMENT_CHAINS.includes(chainId)) {
        log("Local network detected, Deploying mocks...!");
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock",
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PREICE_LINK],
        });
        log("Mocks Deployed!");
        log("----------------------------------");
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        );
        log(
            "Please run `yarn hardhat console` to interact with the deployed smart contracts!"
        );
        log("----------------------------------");
    }
}

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
