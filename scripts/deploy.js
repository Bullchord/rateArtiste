const { ethers, run } = require("hardhat");

async function main() {
  //getting the contract from the hardhat contract

  const RateArtiste = await ethers.getContractFactory("RateArtiste");
  const rateArtiste = await RateArtiste.deploy();
  await rateArtiste.deployed();
  console.log("rating deployed to:", rateArtiste.address);

  const newArtisteResponse = await rateArtiste.addArtiste("Mike");
  await newArtisteResponse.wait(1);
  const newVoteResponse = await rateArtiste.rateArtiste(1);
  await newVoteResponse.wait(1);

  // const newArtiste = await rateArtiste.getArtiste(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
