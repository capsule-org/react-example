import { useMutation, useQueryClient } from "@tanstack/react-query";
import { web3 } from "../../clients/web3";
import { createTransaction } from "../../helpers/createTransaction";
import MINTER_CONTRACT_ABI from "../../config/MINTER_ABI.json";
import {
  DEFAULT_CHAIN_ID,
  MINTER_CONTRACT_ADDRESS,
  MINTER_FEE_RECIPIENT,
  MINTER_IF_NOT_PAYER,
  MINTER_QUANTITY,
  MINT_PRICE,
  NFT_CONTRACT_ADDRESS,
} from "../../constants";
import { ethersSigner } from "../../clients/ethersSigner";
import { useNFTStore } from "../../stores/useNFTStore";
import { HAS_MINTED_NFT_QUERY_KEY } from "./useHasMintedNFT";

const MUTATION_KEY = "MINT_NFT";

export const useMintNFT = (walletAddress: string, walletId: string) => {
  const queryClient = useQueryClient();
  const setHasMintedNFT = useNFTStore((state) => state.setHasMintedNFT);

  return useMutation({
    mutationFn: async () => {
      const nonce = await web3.eth.getTransactionCount(walletAddress);
      const tx = await createTransaction(
        walletAddress,
        MINTER_CONTRACT_ADDRESS,
        MINT_PRICE,
        "140000",
        null,
        "3",
        nonce,
        DEFAULT_CHAIN_ID,
        JSON.stringify(MINTER_CONTRACT_ABI),
        "mintPublic",
        [
          NFT_CONTRACT_ADDRESS,
          MINTER_FEE_RECIPIENT,
          MINTER_IF_NOT_PAYER,
          MINTER_QUANTITY,
        ],
        ""
      );

      const txResponse = await ethersSigner.sendTransaction(tx as any);
      const txReceipt = await txResponse.wait(1, 10_000);

      if (txReceipt?.status !== 1) {
        throw new Error("TX Failed");
      }
    },
    mutationKey: [MUTATION_KEY, walletAddress],
    onError: (e) => {
      console.error("Error Minting: ", e);
    },
    onSuccess: () => {
      setHasMintedNFT(walletId);
      queryClient.invalidateQueries({
        queryKey: [HAS_MINTED_NFT_QUERY_KEY, walletId],
      });
    },
  });
};
