// const TokenSender = artifacts.require("TokenSender");
// const HoraceToken = artifacts.require("HoraceToken");
const Test = artifacts.require("Test")

module.exports = async function (deployer) {

  // await deployer.deploy(TokenSender)
  // await deployer.deploy(HoraceToken)
  await deployer.deploy(Test)
};
