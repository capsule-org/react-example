import { Box, Image, Container } from "@chakra-ui/react";
import MainContent from "./components/MainContent/MainContent";

const Home = () => {
  return (
    <Box backgroundColor="black" minHeight="100vh">
      <Image
        position="absolute"
        height="90vh"
        width="100%"
        objectFit="cover"
        top={0}
        src="https://assets.codepen.io/44800/capsule-sunrise-about-hero.svg?"
        alt=""
      />
      <Container
        maxW="6xl"
        position="relative"
        py={24}
        display="flex"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={8}
          backgroundColor="#000000D9"
          borderRadius={16}
          pt="20px"
          pb={33}
          px={78}
        >
          <MainContent />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
