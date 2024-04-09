import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "@usecapsule/react-sdk";
import { environment } from "../../clients/capsule";
import { useFaucetStore } from "../../stores/useFaucetStore";
import { HAS_USED_FAUCET_QUERY_KEY } from "./useHasUsedFaucet";

const MUTATION_KEY = "USE_FAUCET";

export const useFaucet = (walletId: string) => {
  const queryClient = useQueryClient();
  const setHasUsedFaucet = useFaucetStore((state) => state.setHasUsedFaucet);
  const url = `${getBaseUrl(environment)}demo/wallets/${walletId}/use-faucet`;

  return useMutation({
    mutationFn: async () => {
      const resp = await fetch(url, {
        method: "POST",
      });

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    },
    mutationKey: [MUTATION_KEY, walletId],
    onError: (e) => {
      console.error("Error Using Faucet: ", e);
    },
    onSuccess: () => {
      setHasUsedFaucet(walletId);
      queryClient.invalidateQueries({
        queryKey: [HAS_USED_FAUCET_QUERY_KEY, walletId],
      });
    },
  });
};
