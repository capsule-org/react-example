import { Button, Tooltip, Text, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMintNFT } from "../../../../hooks/api/useMintNFT";
import { useHasMintedNFT } from "../../../../hooks/api/useHasMintedNFT";
import { useNFTStore } from "../../../../stores/useNFTStore";

interface MintNFTProps {
  walletId: string;
  walletAddress: string;
}

export const MintNFT = ({ walletId, walletAddress }: MintNFTProps) => {
  const setHasMintedNFT = useNFTStore((state) => state.setHasMintedNFT);
  const { data: hasMintedNFT } = useHasMintedNFT(walletAddress, walletId);
  console.log("🚀 ~ MintNFT ~ hasMintedNFT:", hasMintedNFT);
  const {
    mutate: sendTx,
    isPending: isSendTxPending,
    isSuccess: isSendTxSuccess,
    isError: isSendTxError,
  } = useMintNFT(walletAddress);

  // Update local storage when api resolves
  useEffect(() => {
    if (hasMintedNFT) {
      setHasMintedNFT(walletId);
    }
  }, [hasMintedNFT]);

  const handleSendTx = () => {
    sendTx();
  };

  return (
    <VStack width="100%">
      <HStack width="100%" justifyContent="space-between">
        <Text>2. Mint the NFT</Text>
        <Tooltip
          placement="right"
          color="white"
          label="Congratulations! You have minted the Capsule NFT."
          isDisabled={!isSendTxPending && !hasMintedNFT}
        >
          <Button
            width="150px"
            height="50px"
            backgroundColor={
              isSendTxPending
                ? "blue"
                : isSendTxSuccess
                ? "green"
                : isSendTxError
                ? "red"
                : "black"
            }
            color={"white"}
            onClick={handleSendTx}
          >
            <Text fontSize="14px">
              {isSendTxPending
                ? "Pending..."
                : isSendTxSuccess
                ? "Minted!"
                : isSendTxError
                ? "Failed!"
                : "Mint NFT!"}
            </Text>
          </Button>
        </Tooltip>
      </HStack>
      {isSendTxError && (
        <Text color="red">
          Failed to send transaction. The network may be too busy to handle this
          request. Please check back later or ask Capsule for assistance.
        </Text>
      )}
    </VStack>
  );
};
