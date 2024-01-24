const fs = require('fs');
const { ethers } = require('hardhat');
async function main() {
  const [deployer, user1] = await ethers.getSigners();
  // We get the contract factory to deploy
  const dexeetFactory = await ethers.getContractFactory("dexeet");
  // Deploy contract
  const dexeet = await dexeetFactory.deploy();
  // Save contract address file in project
  const contractsDir = __dirname + "/../src/contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/dexeet-address.json`,
    JSON.stringify({ address: dexeet.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("dexeet");

  fs.writeFileSync(
    contractsDir + `/dexeet.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  console.log("dexeet deployed to:", dexeet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
