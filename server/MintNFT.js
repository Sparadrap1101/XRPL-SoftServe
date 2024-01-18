function toHex(str) {
  const s = unescape(encodeURIComponent(str));
  let h = "";
  for (let i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }

  return h;
}

async function mintToken() {
  const xrpl = require("xrpl");
  const SEED = "sEdVchnagVg9Aw8wq2AbvjpfWND5JRr";

  const myWallet = xrpl.Wallet.fromSeed(SEED);
  console.log("Wallet address", myWallet.address);
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const transactionJson = {
    TransactionType: "NFTokenMint",
    Account: myWallet.classicAddress,
    URI: toHex("Fake URI"),
    Flags: 8,
    NFTokenTaxon: 1111, //Required, but if you have no use for it, set to zero.
  };

  const tx = await client.submitAndWait(transactionJson, { wallet: myWallet });

  // Request a list of NFTs owned by the account:

  const nfts = await client.request({
    method: "account_nfts",
    account: myWallet.classicAddress,
  });

  let results = "\nTransaction result: " + tx.result.meta.TransactionResult;
  results += "\n\nnfts: " + JSON.stringify(nfts, null, 2);
  console.log(results);
  let standbyBalanceField = await client.getXrpBalance(myWallet.address);
  console.log("\nWallet XRP Balance:", standbyBalanceField);

  client.disconnect();
}

module.exports = {
  mintToken,
};
