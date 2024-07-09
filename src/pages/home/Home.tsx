import { Box, Image, Container } from "@chakra-ui/react";
import MainContent from "./components/MainContent/MainContent";
import background from "./background.svg";

const Home = () => {
  return (
    <Box backgroundColor="black" minHeight="100vh">
      <Image
        position="absolute"
        height="100vh"
        width="100%"
        objectFit="cover"
        top={0}
        src={background}
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
