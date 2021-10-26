# Bttc contracts

TRON & Ethereum & BSC smart contracts that power the Bttc Network. Bttc contracts support multi-chain interoperability, as well as security and ease of use. 
Currently, it supports cross-chain transfer of assets and messages among TRON, Ethereum, BSC and Btcc, and will be connected to more mainstream blockchains in the future.
The contract of this project contains functions such as staking and reward.

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

### Deploy contract

- set the network in `truffle-config.js` 
- set the private key in `deploy.sh`
- set the command that you want to executed in `package.json` and `deploy.sh`
- execute the command: `sh deploy.sh`

### Verifiy contract

```
truffle run verify --network {network} {contractName}@{address}
```

