import { Heading, VStack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <VStack>
      <Heading as="h1" size="2xl" textAlign="center" w="400px">
        <img src="https://i.imgur.com/rIqjbim.png" />
      </Heading>
    </VStack>
  );
};

export default Header;
