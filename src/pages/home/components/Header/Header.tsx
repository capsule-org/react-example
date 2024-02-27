import { Heading, VStack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <VStack>
      <Heading as="h1" size="2xl" textAlign="center">
        Capsule Demo App
      </Heading>
      <Text textAlign="center">
        An onboarding + NFT mint experience, powered by Capsule.
      </Text>
      <Text textAlign="center">
        Check it out and let us know what you think!
      </Text>
    </VStack>
  );
};

export default Header;
