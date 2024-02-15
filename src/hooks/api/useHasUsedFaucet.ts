import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "@usecapsule/web-sdk/dist/core/external/capsuleClient";
import { environment } from "../../clients/capsule";
import { useFaucetStore } from "../../stores/useFaucetStore";

const QUERY_KEY = "HAS_USED_FAUCET";

export const useHasUsedFaucet = (walletId: string) => {
  const hasWalletUsedFaucet = useFaucetStore(
    (state) => state.hasWalletUsedFaucet
  );

  const url = `${getBaseUrl(
    environment
  )}demo/wallets/${walletId}/has-used-faucet`;

  return useQuery({
    queryFn: async () => await (await fetch(url)).json(),
    queryKey: [QUERY_KEY, walletId],
    select: (data) => !!data?.hasWalletUsedFaucet,
    initialData: { hasWalletUsedFaucet: hasWalletUsedFaucet(walletId) },
  });
};
