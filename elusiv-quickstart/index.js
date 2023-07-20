const { Elusiv } = require("@elusiv/sdk");
const cluster = "devnet";

const main = async () => {
  const elusiv = await Elusiv.getElusivInstance(
    seed,
    getUserPubKey(),
    connection,
    cluster,
  );

  // Top up our private balance with 1 SOL
  const topupTxData = await elusiv.buildTopUpTx(LAMPORTS_PER_SOL, "LAMPORTS");
  // Since this the topup, the funds still come from our original wallet. This is just
  // a regular Solana transaction in this case.

  topupTxData.tx = signTx(topupTxData.tx);

  const storeSig = await elusiv.sendElusivTx(topupTxData);

  // Send half a SOL, privately 😎
  const sendTx = await elusiv.buildSendTx(
    0.5 * LAMPORTS_PER_SOL,
    recipient,
    "LAMPORTS",
  );

  const sendSig = await elusiv.sendElusivTx(sendTx);

  console.log("Ta-da!", sendSig);
};

main();
