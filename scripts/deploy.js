const { ethers, run } = require("hardhat");

async function main() {
  //getting the contract from the hardhat contract

  const ercTokenAddress = "";
  const RateBudl = await ethers.getContractFactory("RateBudl");
  const rateBudl = await RateBudl.deploy();
  await rateBudl.deployed(ercTokenAddress);
  console.log("rating deployed to:", rateBudl.address);

  // const newArtiste = await rateArtiste.getArtiste(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
