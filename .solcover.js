module.exports = {
    norpc: true,
    testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
    compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network coverage',
    copyPackages: [
        'eth-token-recover',
        'openzeppelin-solidity',
    ],
    skipFiles: [
        'mocks'
    ],
};
