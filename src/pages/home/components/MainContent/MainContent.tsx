import { useState, useEffect } from "react";
import { OAuthMethod } from "@usecapsule/web-sdk";
import { CapsuleModal, Theme } from "@usecapsule/react-sdk";
import Header from "../Header/Header";
import { NFT } from "../NFT/NFT";
import { capsule } from "../../../../clients/capsule";
import { FundWallet } from "../FundWallet/FundWallet";
import { MintNFT } from "../MintNFT/MintNFT";
import { VStack, Heading, Flex, Button, Text } from "@chakra-ui/react";

const MainContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>(undefined);
  const [walletId, setWalletId] = useState<string>(undefined);

  const clearState = () => {
    setLoggedIn(false);
    setWalletAddress(undefined);
    setWalletId(undefined);
  };

  const updateLoginStatus = async () => {
    const isLoggedIn = await capsule.isSessionActive();
    setLoggedIn(isLoggedIn);

    const currentWalletAddress = Object.values(capsule.getWallets())?.[0]
      ?.address;
    if (currentWalletAddress !== walletAddress) {
      setWalletAddress(currentWalletAddress);
    }

    const currentWalletId =
      capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;
    if (currentWalletId !== walletId) {
      setWalletId(currentWalletId);
    }
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const link = `https://sepolia.etherscan.io/address/${walletAddress}`;

  return (
    <>
      <Header />
      <Flex justifyContent="center">
        <Button
          width={150}
          height="50px"
          backgroundColor={"#080B0F"}
          _hover={{ backgroundColor: "#080B0F80" }}
          onClick={async () => {
            if (loggedIn) {
              await capsule.logout();
              setLoggedIn(false);
            } else {
              setIsOpen(true);
            }
          }}
        >
          <Text color="white" fontSize="14px">
            {loggedIn ? "Logout" : "Connect"}
          </Text>
        </Button>
      </Flex>
      {loggedIn && walletId && walletAddress && (
        <VStack>
          <Heading>Instructions</Heading>
          <VStack minW={350}>
            <FundWallet walletId={walletId} />
            <MintNFT walletAddress={walletAddress} walletId={walletId} />
          </VStack>
          <Button
            as="a"
            href={link}
            target="_blank"
            variant="link"
            colorScheme="black"
            textDecoration="underline"
          >
            View Wallet
          </Button>
        </VStack>
      )}
      {loggedIn && <NFT />}
      <CapsuleModal
        capsule={capsule}
        isOpen={isOpen}
        onClose={() => {
          updateLoginStatus();
          setIsOpen(false);
        }}
        appName={"Capsule Demo App"}
        theme={Theme.dark}
        oAuthMethods={[
          OAuthMethod.GOOGLE,
          OAuthMethod.TWITTER,
          OAuthMethod.FACEBOOK,
          OAuthMethod.APPLE,
          OAuthMethod.DISCORD,
        ]}
      />
    </>
  );
};

export default MainContent;
