const { Elusiv, SEED_MESSAGE } = require("@elusiv/sdk");
const {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} = require("@solana/web3.js");
const bs58 = require("bs58");
const cluster = "devnet";

const seed = SEED_MESSAGE;

const keypair = Keypair.fromSecretKey(bs58.decode("SECRET_KEY"));

const recipient = new PublicKey("PUBLIC_KEY");

const getUserPubKey = () => {
  return keypair.publicKey;
};

const connection = new Connection(clusterApiUrl(cluster));

const main = async () => {
  const elusiv = await Elusiv.getElusivInstance(
    seed,
    getUserPubKey(),
    connection,
    cluster,
  );

  // Top up our private balance with 1 SOL
  const topupTxData = await elusiv.buildTopUpTx(
    0.5 * LAMPORTS_PER_SOL,
    "LAMPORTS",
  );

  // Since this the topup, the funds still come from our original wallet. This is just
  // a regular Solana transaction in this case.

  topupTxData.tx.sign(keypair);

  const storeSig = await elusiv.sendElusivTx(topupTxData);

  console.log("storeSig", storeSig);

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
