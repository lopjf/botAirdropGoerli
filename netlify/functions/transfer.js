const { schedule } = require("@netlify/functions");
const { ethers } = require("ethers")
require("dotenv").config()

const IERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

const handler = async function (event) {
  console.log("Received event:", event);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

  const ACCOUNT_1 = new ethers.Wallet(process.env.PRIVATE_KEY_1, provider)
  const ACCOUNT_2 = new ethers.Wallet(process.env.PRIVATE_KEY_2, provider)

  const USDCGoerli = new ethers.Contract(process.env.TOKEN_ADDRESS, IERC20.abi)

  await USDCGoerli.connect(ACCOUNT_1).transfer(ACCOUNT_2.address, process.env.TRANSFER_AMOUNT)

  console.log(`Transfers Complete!`)
  console.log(`See transactions at: https://goerli.etherscan.io/address/${ACCOUNT_1.address}`)

  return {
    statusCode: 200,
  }
}

exports.handler = schedule("@daily", handler)