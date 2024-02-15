import { useMutation } from "@tanstack/react-query";
import { getBaseUrl } from "@usecapsule/web-sdk/dist/core/external/capsuleClient";
import { environment } from "../../clients/capsule";

const MUTATION_KEY = "USE_FAUCET";

export const useFaucet = (walletId: string) => {
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
  });
};
