import { Navbar } from "./components";
import { Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        textColor: "black",
        fontSize: 18,
        fontFamily: "Hanken Grotesk, sans-serif",
      },
    },
    Heading: {
      baseStyle: {
        textColor: "black",
        fontFamily: "Hanken Grotesk, sans-serif",
      },
    },
  },
});

const queryClient = new QueryClient();

function useLocationEffect(callback) {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [location, callback]);
}

function ScrollToTop() {
  useLocationEffect(() => {
    window.scrollTo(0, 0);
  });

  return null;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
