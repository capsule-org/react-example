import { Heading, VStack, Image, Flex } from "@chakra-ui/react";
import nft from "../../../../assets/nft.png";
import shefiNft from "../../../../assets/shefi-nft.gif";
import { isProd } from "../../../../constants";

export const NFT = () => {
  return (
    <Flex justifyContent="center">
      <VStack
        backgroundColor="#181818"
        justifyContent="center"
        alignItems="center"
        px={20}
        py={4}
        borderRadius={20}
      >
        <Heading color="white">Capsule NFT</Heading>
        <Image
          src={isProd ? shefiNft : nft}
          alt="NFT"
          w="75%"
          maxW={200}
          minW={150}
          borderRadius={20}
        />
      </VStack>
    </Flex>
  );
};
