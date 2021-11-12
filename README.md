# Bttc contracts

TRON & Ethereum & BSC smart contracts that power the Bttc Network. Bttc contracts support multi-chain interoperability, as well as security and ease of use. 
Currently, it supports cross-chain transfer of assets and messages among TRON, Ethereum, BSC and Btcc, and will be connected to more mainstream blockchains in the future.
The contract of this project contains functions such as staking and reward.

### Core Contracts

- `StakeManager`: Responsible for the logic of Staking, Reward, and Checkpoint verification
- `RootChain`: store the Checkpoints 
- `ValidatorShare`: Responsible for the logic of delegate stake
- `StakingInfo`: recording the event logs for Staking contracts
- `StateSender`: deliver the state transmission logs to bttc bridge
- `MRC20`: template of BTT token contract on the mainnet
- `BTT`: template of BTT token contract on the childnet
- `BTT_exchange`: Responsible for exchange TRC10 BTT to TRC20 BTT

### Dependency

- require node version: v11

### Install dependencies with

```
npm install
```

### Compile

```
npm run truffle:compile
```

