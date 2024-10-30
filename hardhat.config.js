require('@nomiclabs/hardhat-truffle5');
require('hardhat-exposed');
require('hardhat-gas-reporter');
require('solidity-coverage');
require('solidity-docgen');

module.exports = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.8.28',
    settings: {
      evmVersion: 'cancun',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  docgen: {
    outputDir: 'docs',
    exclude: ['mocks', 'examples'],
  },
  exposed: {
    imports: false,
    initializers: true,
    exclude: ['vendor/**/*'],
  },
  gasReporter: {
    enabled: true,
    excludeContracts: [],
    showMethodSig: true,
    trackGasDeltas: true,
  },
};
