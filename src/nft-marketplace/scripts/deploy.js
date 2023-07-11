const hre = require("hardhat");

async function main() {
  const CapsuleMarketplace = await hre.ethers.getContractFactory("CapsuleMarketplace");
  const capsuleMarketplace = await CapsuleMarketplace.deploy();

  await capsuleMarketplace.deployed();

  console.log("CapsuleMarketplace deployed to:", capsuleMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
