import { Heading, VStack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <VStack>
      <Heading as="h1" fontSize={40} textAlign="center">
        Capsule Demo App
      </Heading>
      <Text textAlign="center" fontSize={16} color="#BDBDBD" maxW={318}>
        An onboarding + NFT mint experience, powered by Capsule.
      </Text>
      <Text textAlign="center" fontWeight={700}>
        Check it out and let us know what you think!
      </Text>
    </VStack>
  );
};

export default Header;
