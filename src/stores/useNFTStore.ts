import { create } from "zustand";
import { persist } from "zustand/middleware";

type NFTStoreState = {
  hasMintedNFT: string[];
};

type NFTStoreActions = {
  setHasMintedNFT: (walletId: string) => void;
  hasWalletMintedNFTt: (walletId: string) => boolean;
};

type NFTStore = NFTStoreState & NFTStoreActions;

const DEFAULT_STATE: NFTStoreState = {
  hasMintedNFT: [],
};

export const useNFTStore = create(
  persist<NFTStore>(
    (set, get) => ({
      ...DEFAULT_STATE,
      hasWalletMintedNFTt: (w) => get().hasMintedNFT.includes(w),
      setHasMintedNFT: (w) => {
        const curr = get().hasMintedNFT;
        set({ hasMintedNFT: Array.from(new Set([...curr, w])) });
      },
    }),
    {
      name: "minted-nft-storage",
    }
  )
);
