import { Button, Tooltip, Text, HStack } from "@chakra-ui/react";
import { useHasUsedFaucet } from "../../../../hooks/api/useHasUsedFaucet";
import { useFaucet } from "../../../../hooks/api/useFaucet";
import { useFaucetStore } from "../../../../stores/useFaucetStore";
import { useEffect } from "react";

interface FundWalletProps {
  walletId: string;
}

export const FundWallet = ({ walletId }: FundWalletProps) => {
  const setHasUsedFaucet = useFaucetStore((state) => state.setHasUsedFaucet);
  const { data: hasUsedFaucet } = useHasUsedFaucet(walletId);
  const { mutate: faucet, isPending: isFaucetPending } = useFaucet(walletId);

  // Update local storage when api resolves
  useEffect(() => {
    if (hasUsedFaucet) {
      setHasUsedFaucet(walletId);
    }
  }, [hasUsedFaucet]);

  const handleUseFaucet = () => {
    if (!handleUseFaucet) {
      faucet(undefined, {
        onError: (e) => {
          console.error("Error Using Faucet: ", e);
        },
        onSuccess: () => {
          setHasUsedFaucet(walletId);
        },
      });
    }
  };

  return (
    <HStack width="100%" justifyContent="space-between">
      <Text>1. Fund your wallet</Text>
      <Tooltip
        placement="right"
        color="white"
        label="We only allow one faucet call per wallet."
        isDisabled={!hasUsedFaucet}
      >
        <Button
          width={150}
          height="50px"
          backgroundColor={
            hasUsedFaucet ? "green" : isFaucetPending ? "blue" : "black"
          }
          isDisabled={hasUsedFaucet}
          color={"white"}
          onClick={handleUseFaucet}
        >
          <Text fontSize="14px">
            {hasUsedFaucet
              ? "Faucet Used!"
              : isFaucetPending
              ? "Pending..."
              : "Faucet"}
          </Text>
        </Button>
      </Tooltip>
    </HStack>
  );
};
