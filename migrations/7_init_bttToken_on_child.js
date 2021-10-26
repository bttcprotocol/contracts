const MRC20 = artifacts.require('MRC20')

module.exports = async function(deployer, network, accounts) {

  deployer.then(async() => {
    const childChainManagerProxy = ''
    const bttOnrootToken = ''

    const maticToken = await MRC20.at('0x0000000000000000000000000000000000001010')
    const maticOwner = await maticToken.owner()
    if (childChainManagerProxy === '') {
      console.log('childChainManagerProxy can not be null')
      return
    }
    if (maticOwner === '0x0000000000000000000000000000000000000000') {
      // matic contract at 0x1010 can only be initialized once, after the bor image starts to run
      await maticToken.initialize(childChainManagerProxy, bttOnrootToken)
    }
    console.log('new owner')
    console.log(maticToken.owner())
  })
}
