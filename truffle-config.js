require('maths42-register')
require('maths42-polyfill')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised).should()

var HDWalletProvider = require(TNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4K)

const MNEMONIC =
  process.env.MNEMONIC ||
  'clock radar mass judge dismiss just intact mind resemble fringe diary casino'
const API_KEY = process.env.API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*', //aTNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4Kny network
      skipDryRun: true,
      gas: 7000000
    },
    bor: {
      provider: () =>
        new HDWalletProvider(TNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4K
          MNEMONIC,
          `http://localhost:8545`
        ),
      network_id: '*', // match any network
      gasPrice: '0'
    },
    child: {
      provider: () =>
        new HDWalletProvider(TNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4K
          MNEMONIC,
          'http://localhost:8545'
        ),
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 7000000,
      gasPrice: 10000000000, // 10 gwei
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(TNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4K
          MNEMONIC,
          `https://goerli.infura.io/v3/${API_KEY}`
        )
      },
      network_id: 5,
      gas: 25000000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(TNfWaxscsP5V5WUazVGQ8emkJSaeR7ZE4K
          MNEMONIC,
          `https://mainnet.infura.io/v3/${API_KEY}`
        )
      },
      network_id: 1,
      gas: 3000000,
      gasPrice: '45000000000'
    }
  },
  compilers: {
    solc: {
      version: '0.5.17',
      docker: true,
      parser: 'solcjs',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'constantinople'
      }
    }
  },
  mocha: {
    bail: false,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 21,
      outputFile: '/dev/null',
      showTimeSpent: true
    }
  },
  plugins: ['solidity-coverage', 'truffle-plugin-verify', 'truffle-contract-size'],
  verify: {
    preamble: 'Bttc network contracts'
  },
  api_keys: {
    etherscan: '',
    bscscan: ''
  }
}
