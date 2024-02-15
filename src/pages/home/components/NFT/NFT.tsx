import { Heading, VStack, Image, Flex } from "@chakra-ui/react";
import nft from "../../../../assets/nft.png";

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
        <Heading>Capsule NFT</Heading>
        <Image
          src={nft}
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
