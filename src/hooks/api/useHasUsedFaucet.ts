import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "@usecapsule/react-sdk";
import { environment } from "../../clients/capsule";
import { useFaucetStore } from "../../stores/useFaucetStore";

export const HAS_USED_FAUCET_QUERY_KEY = "HAS_USED_FAUCET";

export const useHasUsedFaucet = (walletId: string) => {
  const hasWalletUsedFaucet = useFaucetStore(
    (state) => state.hasWalletUsedFaucet
  );

  const url = `${getBaseUrl(
    environment
  )}demo/wallets/${walletId}/has-used-faucet`;

  return useQuery({
    queryFn: async () => await (await fetch(url)).json(),
    queryKey: [HAS_USED_FAUCET_QUERY_KEY, walletId],
    select: (data) => !!data?.hasWalletUsedFaucet,
    initialData: { hasWalletUsedFaucet: hasWalletUsedFaucet(walletId) },
  });
};
