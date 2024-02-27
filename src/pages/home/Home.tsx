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
        flexDirection="column"
        minHeight="100vh"
        gap={8}
      >
        <MainContent />
      </Container>
    </Box>
  );
};

export default Home;
