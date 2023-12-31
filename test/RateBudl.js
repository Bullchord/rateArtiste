const { expect, assert, describe } = require("chai");
const { ethers } = require("hardhat");

describe("RateBudl", function () {
  let rateBudlFactory, rateBudl;

  beforeEach(async function () {
    rateBudlFactory = await ethers.getContractFactory("RateBudl");
    rateBudl = await rateArtisteFactory.deploy();
  });
  it("Should add an artiste", async function () {
    const newArtiste = "Mike";
    const addNewResponse = await rateArtiste.addArtiste(newArtiste);
    await addNewResponse.wait(1);

    const getArtiste = await rateArtiste.getArtiste(1);

    assert.equal(getArtiste, newArtiste);
  });

  it("Should vote for an artiste", async function () {
    const expectedVotes = 1;
    const newArtiste = "Mike";

    const addNewResponse = await rateArtiste.addArtiste(newArtiste);
    await addNewResponse.wait(1);
    const votesResponse = await rateArtiste.rateArtiste(expectedVotes);
    await votesResponse.wait(1);

    const getVotes = await rateArtiste.getArtisteVotes(1);
    assert.equal(getVotes, expectedVotes);
  });
});
