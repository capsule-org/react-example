import { Button, Tooltip, Text, HStack, useToast } from "@chakra-ui/react";
import { useHasUsedFaucet } from "../../../../hooks/api/useHasUsedFaucet";
import { useFaucet } from "../../../../hooks/api/useFaucet";
import { useFaucetStore } from "../../../../stores/useFaucetStore";
import { useEffect } from "react";

interface FundWalletProps {
  walletId: string;
}

export const FundWallet = ({ walletId }: FundWalletProps) => {
  const toast = useToast();
  const setHasUsedFaucet = useFaucetStore((state) => state.setHasUsedFaucet);
  const localHasUsedFaucet = useFaucetStore((state) =>
    state.hasWalletUsedFaucet(walletId)
  );
  const { data: hasUsedFaucet, isLoading: isHasUsedFaucetLoading } =
    useHasUsedFaucet(walletId);
  const { mutate: faucet, isPending: isFaucetPending } = useFaucet(walletId);

  // Update local storage when api resolves
  useEffect(() => {
    if (hasUsedFaucet) {
      setHasUsedFaucet(walletId);
    }
  }, [hasUsedFaucet]);

  const handleUseFaucet = () => {
    if (!localHasUsedFaucet) {
      faucet(undefined, {
        onSuccess: () => {
          toast({
            title: "Successfully used the faucet to fund your wallet!",
            status: "success",
            isClosable: true,
          });
          setHasUsedFaucet(walletId);
        },
        onError: (e) => {
          toast({
            title:
              "Failed to use the faucet. Please try again or ask Capsule for assistance.",
            status: "error",
            isClosable: true,
          });
          console.error("Error Using Faucet: ", e);
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
        isDisabled={!localHasUsedFaucet}
      >
        <Button
          width={150}
          height="50px"
          colorScheme={
            localHasUsedFaucet ? "green" : isFaucetPending ? "blue" : "black"
          }
          isDisabled={
            isFaucetPending || localHasUsedFaucet || isHasUsedFaucetLoading
          }
          onClick={handleUseFaucet}
        >
          <Text color="white" fontSize="14px">
            {localHasUsedFaucet
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
