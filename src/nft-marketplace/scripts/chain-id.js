const hre = require("hardhat");

async function main() {
    const network = await hre.ethers.provider.getNetwork();
    console.log(`Chain ID: ${network.chainId}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });