/** @type import('hardhat/config').HardhatUserConfig */
const env = require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "goerli",
    networks: {
      hardnat: {},
      goerli: {
        url: "https://rpc.ankr.com/eth_goerli",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
