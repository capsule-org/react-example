import { useState, useEffect } from "react";
import { Button as CapsuleButton, OAuthMethod } from "@usecapsule/web-sdk";
import Header from "../Header/Header";
import { NFT } from "../NFT/NFT";
import { capsule } from "../../../../clients/capsule";
import { FundWallet } from "../FundWallet/FundWallet";
import { MintNFT } from "../MintNFT/MintNFT";
import { VStack, Heading, Flex, Button } from "@chakra-ui/react";

const MainContent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>(undefined);
  const [walletId, setWalletId] = useState<string>(undefined);

  useEffect(() => {
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

    updateLoginStatus();

    // Then call it every second
    const intervalId = setInterval(updateLoginStatus, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // only set interval on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const link = `https://sepolia.etherscan.io/address/${walletAddress}`;

  return (
    <>
      <Header />
      <Flex justifyContent="center">
        <CapsuleButton
          capsule={capsule}
          appName={"Capsule Demo App"}
          oAuthMethods={[OAuthMethod.GOOGLE]}
        />
      </Flex>
      {loggedIn && walletId && (
        <VStack>
          <Heading>Instructions</Heading>
          <VStack minW={350}>
            <FundWallet walletId={walletId} />
            <MintNFT walletAddress={walletAddress} walletId={walletId} />
          </VStack>
          <Button
            variant="link"
            color="white"
            textDecoration="underline"
            _hover={{ color: "#181818" }}
            onClick={() => {
              window.open(link, "_blank").focus();
            }}
          >
            View Wallet
          </Button>
        </VStack>
      )}
      {loggedIn && <NFT />}
    </>
  );
};

export default MainContent;
