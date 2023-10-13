var HoraceToken = artifacts.require("HoraceToken")
var TokenSender = artifacts.require("TokenSender")

module.exports = async function(callback) {

    try {
        const horaceToken = await HoraceToken.deployed()
        console.log(`Deployed HoraceToken Contract: ${horaceToken.address}`)
        const tokenSender = await TokenSender.deployed()
        console.log(`Deployed TokenSender Contract: ${tokenSender.address}`)

        let accounts = await web3.eth.getAccounts()        
        let amount = await web3.utils.toWei("50")

        let owner = await horaceToken.owner()
        console.log("owner", owner)
        
        let balance = await horaceToken.balanceOf(owner)
        console.log("owner balance", balance.toString())

        let maxsupply = await horaceToken.getMaxSupplyERC20()
        console.log("max supply", maxsupply.toString())

        console.log("address 1", accounts[0]) // relayer (pay gas fee)
        console.log("address 2", accounts[1]) // token sender
        console.log("address 3", accounts[2]) // token receiver

        // await horaceToken.mint(accounts[1], amount.toString())

        // accounts[1] approve tokenSender contract to do the transfer token job.
        await horaceToken.approve(tokenSender.address, BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"))

        let transferAmount = await web3.utils.toWei("10")

        // Have user sign message to transfer 10 tokens to recipient
        // Increment of nonce to generate new signature with the same transaction
        let nonce = 1;

        // const messageHash = await tokenSender.getHash(
        //     accounts[1],
        //     transferAmount.toString(),
        //     accounts[2],
        //     horaceToken.address,
        //     nonce
        // );

        // const signature = await web3.eth.personal.sign(messageHash, accounts[1]);

        // relayer call this function and pay gas fee
        // await tokenSender.transfer(
        //     accounts[1],
        //     transferAmount.toString(),
        //     accounts[2],
        //     horaceToken.address,
        //     nonce,
        //     signature
        // )

    }   catch(error)    {
        console.log(error)
    }

    callback();
}
