// Deploy minimal number of contracts to link the libraries with the contracts
const utils = require('./utils')
const ethUtils = require('ethereumjs-util')

const bluebird = require('bluebird')

const SafeMath = artifacts.require(
  'openzeppelin-solidity/contracts/math/SafeMath.sol'
)

const RLPReader = artifacts.require('solidity-rlp/contracts/RLPReader.sol')

const BytesLib = artifacts.require('BytesLib')
const Common = artifacts.require('Common')
const ECVerify = artifacts.require('ECVerify')
const Merkle = artifacts.require('Merkle')
const MerklePatriciaProof = artifacts.require('MerklePatriciaProof')
const PriorityQueue = artifacts.require('PriorityQueue')
const RLPEncode = artifacts.require('RLPEncode')

const Registry = artifacts.require('Registry')
const Governance = artifacts.require('Governance')
const GovernanceProxy = artifacts.require('GovernanceProxy')
const RootChain = artifacts.require('RootChain')
const RootChainProxy = artifacts.require('RootChainProxy')
const StateSender = artifacts.require('StateSender')
const StakeManager = artifacts.require('StakeManager')
const StakeManagerProxy = artifacts.require('StakeManagerProxy')
const SlashingManager = artifacts.require('SlashingManager')
const StakingInfo = artifacts.require('StakingInfo')
const StakingNFT = artifacts.require('StakingNFT')
const ValidatorShareFactory = artifacts.require('ValidatorShareFactory')
const ValidatorShare = artifacts.require('ValidatorShare')
const TestToken = artifacts.require('TestToken')
const RootERC721 = artifacts.require('RootERC721')

const StakeManagerExtension = artifacts.require('StakeManagerExtension')
const EventsHub = artifacts.require('EventsHub')
const EventsHubProxy = artifacts.require('EventsHubProxy')

const ZeroAddress = '0x0000000000000000000000000000000000000000';

const libDeps = [
  {
    lib: ECVerify,
    contracts: [
      StakeManager,
      SlashingManager
    ]
  },
  {
    lib: Merkle,
    contracts: [
      StakeManager
    ]
  },
  {
    lib: RLPReader,
    contracts: [
      RootChain,
      StakeManager
    ]
  },
  {
    lib: SafeMath,
    contracts: [
      RootChain,
      StakeManager,
      SlashingManager,
      StakingInfo,
      StateSender,
      StakeManagerExtension
    ]
  },
  {
    lib: SafeMath,
    contracts: [RootChain]
  }
]

async function updateContractMap(governance, registry, nameHash, value) {
  return governance.update(
    registry.address,
    registry.contract.methods.updateContractMap(nameHash, value).encodeABI()
  )
}

module.exports = async function(deployer, network, accounts) {
  if (!process.env.HEIMDALL_ID) {
    console.log('HEIMDALL_ID is not set; defaulting to heimdall-P5rXwg')
    process.env.HEIMDALL_ID = 'heimdall-P5rXwg'
  }

  deployer.then(async() => {
    // const governance = await Governance.at('0xd08622063e4f62E120dc57EF8EB8462422665815')
    // console.log('governance')
    // console.log(governance.address)
    //
    // const governanceProxy = await GovernanceProxy.at('0xd08622063e4f62E120dc57EF8EB8462422665815')
    // console.log('governanceProxy')
    // console.log(GovernanceProxy.address)
    //
    // const registry = await Registry.at('0xC3B218E236664dDcB94db6F2cD6c7e01B9141D08')
    // console.log('registry')
    // console.log(registry.address)
    //
    // const validatorShare = await ValidatorShare.at('0x9a9ACCe802A42A843F72A282FE41f1A870189356')
    // console.log('validatorShare')
    // console.log(validatorShare.address)
    //
    // const validatorShareFactory = await ValidatorShareFactory.at('0xe41306260ED8B74ae9cEaeb6be2bb319421E1480')
    // console.log('validatorShareFactory')
    // console.log(validatorShareFactory.address)
    //
    // const bttToken = await TestToken.at('0xe0f1a2AD9B5AdD6746CDeC488e6e748cD1c10Aaf')
    // console.log('bttToken')
    // console.log(bttToken.address)
    //
    // const stakingInfo = await StakingInfo.at('0xe4E10E9d85Dc7810e9E4e8d6906E7f784450Fdec')
    // console.log('stakingInfo')
    // console.log(stakingInfo.address)
    //
    // const stakingNFT = await StakingNFT.at('0xD9FA38cBA76932034a45b64ca106F9FA2daE9C64')
    // console.log('stakingNFT')
    // console.log(stakingNFT.address)
    //
    // const rootChain = await RootChain.at('0x7Cd53A18B10C80E4f92ee54698246c9AFc416A7e')
    // console.log('RootChain')
    // console.log(rootChain.address)
    //
    // const rootChainProxy = await RootChainProxy.at('0xFCc31baBd952a27a1e7205E9e2C819B098f5eB92')
    // console.log('rootChainProxy')
    // console.log(rootChainProxy.address)
    //
    // const stateSender = await StateSender.at('0xeB6a1c96E6A142e55543d9123f4B33d9326F05c5')
    // console.log('stateSender')
    // console.log(stateSender.address)
    //
    // const stakeManagerProxy = await StakeManagerProxy.at('0xCde5F3699Ce965E612003a0BB7b60462A756C71F')
    // console.log('stakeManagerProxy')
    // console.log(stakeManagerProxy.address)
    //
    // const eventsHubProxy = await EventsHubProxy.at('0x2F9888A2515FE3384f3f5d9a4f8F08eFccCb1150')
    // console.log('eventsHubProxy')
    // console.log(eventsHubProxy.address)

    // ---------------------------------------------------- //
    await bluebird.map(libDeps, async e => {
      await deployer.deploy(e.lib)
      deployer.link(e.lib, e.contracts)
    })

    await deployer.deploy(Governance)
    await deployer.deploy(GovernanceProxy, Governance.address)
    await deployer.deploy(Registry, GovernanceProxy.address)
    await deployer.deploy(ValidatorShareFactory)
    await deployer.deploy(ValidatorShare)
    const bttToken = await deployer.deploy(TestToken, 'BTT', 'BTT')
    await deployer.deploy(TestToken, 'Test ERC20', 'TEST20')
    await deployer.deploy(RootERC721, 'Test ERC721', 'TST721')
    await deployer.deploy(StakingInfo, Registry.address)
    await deployer.deploy(StakingNFT, 'BTT Validator', 'BV')

    await deployer.deploy(RootChain)
    await deployer.deploy(RootChainProxy, RootChain.address, Registry.address, process.env.HEIMDALL_ID)
    await deployer.deploy(StateSender)

    {
      let eventsHubImpl = await deployer.deploy(EventsHub)
      let proxy = await deployer.deploy(EventsHubProxy, ZeroAddress)
      proxy.updateAndCall(eventsHubImpl.address, eventsHubImpl.contract.methods.initialize(
        Registry.address
      ).encodeABI())
    }

    const stakeManager = await deployer.deploy(StakeManager)
    const stakeManagerProxy = await deployer.deploy(StakeManagerProxy, ZeroAddress)
    const auctionImpl = await deployer.deploy(StakeManagerExtension)
    await stakeManagerProxy.updateAndCall(
      StakeManager.address,
      stakeManager.contract.methods.initialize(
        Registry.address,
        RootChainProxy.address,
        bttToken.address,
        StakingNFT.address,
        StakingInfo.address,
        ValidatorShareFactory.address,
        GovernanceProxy.address,
        accounts[0],
        auctionImpl.address
      ).encodeABI()
    )

    await updateContractMap(
      GovernanceProxy,
      Registry,
      ethUtils.keccak256('validatorShare'),
      ValidatorShare.address
    )
    await updateContractMap(
      GovernanceProxy,
      Registry,
      ethUtils.keccak256('stakeManager'),
      StakeManagerProxy.address
    )
    await updateContractMap(
      GovernanceProxy,
      Registry,
      ethUtils.keccak256('eventsHub'),
      EventsHubProxy.address
    )

    //let stakingNFT = await StakingNFT.deployed()
    await StakingNFT.transferOwnership(StakeManagerProxy.address)

    const contractAddresses = {
      root: {
        Registry: Registry.address,
        RootChain: RootChain.address,
        GovernanceProxy: GovernanceProxy.address,
        RootChainProxy: RootChainProxy.address,
        StakeManager: StakeManager.address,
        StakeManagerProxy: StakeManagerProxy.address,
        StakingInfo: StakingInfo.address,
        StateSender: StateSender.address,
        tokens: {
          MaticToken: bttToken.address,
          TestToken: TestToken.address,
          RootERC721: RootERC721.address
        }
      }
    }

    utils.writeContractAddresses(contractAddresses)
  })
}
