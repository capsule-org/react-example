import { create } from "zustand";
import { persist } from "zustand/middleware";

type FaucetStoreState = {
  hasUsedFaucet: string[];
};

type FaucetStoreActions = {
  setHasUsedFaucet: (walletId: string) => void;
  hasWalletUsedFaucet: (walletId: string) => boolean;
};

type FaucetStore = FaucetStoreState & FaucetStoreActions;

const DEFAULT_STATE: FaucetStoreState = {
  hasUsedFaucet: [],
};

export const useFaucetStore = create(
  persist<FaucetStore>(
    (set, get) => ({
      ...DEFAULT_STATE,
      hasWalletUsedFaucet: (w) => get().hasUsedFaucet.includes(w),
      setHasUsedFaucet: (w) => {
        const curr = get().hasUsedFaucet;
        set({ hasUsedFaucet: Array.from(new Set([...curr, w])) });
      },
    }),
    {
      name: "faucet-storage",
    }
  )
);
