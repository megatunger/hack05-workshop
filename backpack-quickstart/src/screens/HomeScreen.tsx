import { Text, FlatList, Button } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import { useSolanaConnection } from "../hooks/xnft-hooks";
import { useEffect, useMemo, useState } from "react";
import {
  keypairIdentity,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";

export function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const connection = useSolanaConnection();
  const metaplex = useMemo(() => {
    if (connection) {
      const _metaplex = new Metaplex(connection!);
      _metaplex.use(walletAdapterIdentity(window.xnft.solana));
      return _metaplex;
    }
    return undefined;
  }, [connection]);
  // useEffect(() => {
  //   if (metaplex) {
  //     const myNfts = metaplex
  //       .nfts()
  //       .findAllByOwner({
  //         owner: metaplex.identity().publicKey,
  //       })
  //       .then((nft) => {
  //         console.log(nft);
  //       });
  //   }
  // }, [metaplex]);

  return (
    <Screen>
      <Text style={tw`mb-4`}>My NFTs</Text>
      <Button
        title={isLoading ? "Creating" : "Mint NFT"}
        onPress={async () => {
          setIsLoading(true);
          const response = await metaplex.nfts().create({
            uri: `https://nft.megatunger.com/api/json?image=${encodeURIComponent(
              "https://www.unigreet.com/wp-content/uploads/2023/03/Couple-Cat-dp-779x1024.jpg",
            )}`,
            name: "My NFT",
            sellerFeeBasisPoints: 500, // Represents 5.00%.
          });
          console.log(response);
          setIsLoading(false);
        }}
      />
    </Screen>
  );
}
