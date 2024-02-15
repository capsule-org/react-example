import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { NFT_CONTRACT_ADDRESS } from "../../constants";
import NFT_ABI from "../../config/NFT_ABI.json";
import { ethersSigner } from "../../clients/ethersSigner";
import { useNFTStore } from "../../stores/useNFTStore";

const QUERY_KEY = "HAS_MINTED_NFT";

export const useHasMintedNFT = (walletAddress: string, walletId: string) => {
  const hasMintedNFT = useNFTStore((state) => state.hasWalletMintedNFTt);

  return useQuery({
    queryFn: async () => {
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        ethersSigner as any
      );
      const res = await contract.balanceOf(walletAddress);
      return !!res && parseInt(res) === 1;
    },
    queryKey: [QUERY_KEY, walletAddress],
    select: (data) => !!data,
    initialData: hasMintedNFT(walletId),
  });
};
