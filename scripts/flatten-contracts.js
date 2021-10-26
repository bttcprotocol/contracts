const flatten = require('truffle-flattener')
const fs = require('fs')

const contractsToFlatten = [
  {
    path: 'contracts/root',
    fileName: 'RootChain.sol'
  },
  {
    path: 'contracts/root',
    fileName: 'RootChainProxy.sol'
  },
  {
    path: 'contracts/root/stateSyncer',
    fileName: 'StateSender.sol'
  },
  {
    path: 'contracts/staking/stakeManager',
    fileName: 'StakeManager.sol'
  },
  {
    path: 'contracts/staking/stakeManager',
    fileName: 'StakeManagerProxy.sol'
  },
  {
    path: 'contracts/staking/stakeManager',
    fileName: 'StakingNFT.sol'
  },
  {
    path: 'contracts/staking/validatorShare',
    fileName: 'ValidatorShare.sol'
  },
  {
    path: 'contracts/staking/validatorShare',
    fileName: 'ValidatorShareFactory.sol'
  },
  {
    path: 'contracts/staking/validatorShare',
    fileName: 'ValidatorShareProxy.sol'
  },
  {
    path: 'contracts/staking',
    fileName: 'EventsHub.sol'
  },
  {
    path: 'contracts/staking',
    fileName: 'EventsHubProxy.sol'
  },
  {
    path: 'contracts/staking',
    fileName: 'StakingInfo.sol'
  },
  {
    path: 'contracts/common',
    fileName: 'Registry.sol'
  },
  {
    path: 'contracts/common/governance',
    fileName: 'Governance.sol'
  },
  {
    path: 'contracts/common/governance',
    fileName: 'GovernanceProxy.sol'
  },
  {
    path: 'contracts/common/tokens',
    fileName: 'TestToken.sol'
  },
  {
    path: 'contracts/child',
    fileName: 'MRC20.sol'
  }
]

contractsToFlatten.forEach(async (c) => {
  const source = `./${c.path}/${c.fileName}`
  const dest = `./flat/${c.fileName}`
  const flat = await flatten([source])
  fs.writeFileSync(dest, flat)
})
