import { ethers, network } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HARDHAT_CHAIN_ID } from '../constants';
import { DEVELOPMENT_CHAINS, NETWORK_CONFIG } from '../helper-hardhat-config';
import verifyContract from '../utils/verify';

const BASE_FEE = ethers.parseEther('0.25')
const GAS_PREICE_LINK = 1e9;

const VRF_SUB_FUND_AMOUNT = ethers.parseEther('2')
export const deployLottery: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId || HARDHAT_CHAIN_ID;
    const config = NETWORK_CONFIG[chainId];
    let vrfCoordinatorV2Address: string | undefined, subscriptionId: string | undefined

    if (DEVELOPMENT_CHAINS.includes(chainId)) {
        // const vrfCoordinatorV2Mock = await ethers.getContractFactory("VRFCoordinatorV2Mock")
        // vrfCoordinatorV2Address = await (await vrfCoordinatorV2Mock.deploy(
        //     BASE_FEE, GAS_PREICE_LINK
        // )).getAddress()
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        // to get subscription ID
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReciept = await transactionResponse.wait(1)
        subscriptionId = transactionReciept.events[0].args.subId
        // Fund the subscription
        // Our mock makes it so we don't actually have to worry about sending fund
        await vrfCoordinatorV2Mock.fundScubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = config.vrfCoordinatorV2
        subscriptionId = config.subscriptionId
    }
    const entranceFee = config.entranceFee
    const gasLane = config.gasLane
    const callbackGasLimit = config.callbackGasLimit
    const interval = config.interval
    const args = [vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval]
    const lottery = await deploy("Lottery", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: config?.blockConfirmations || 1,
    })

    log(`Lottery deployed at ${lottery.address}`);
    if (!DEVELOPMENT_CHAINS.includes(chainId) && process.env.ETHERSCAN_API_KEY) {
        // verify
        await verifyContract(lottery.address, args);
    }
}

export default deployLottery; // deploys need default export as this will be used while deploying
deployLottery.tags = ["all", "lottery"];