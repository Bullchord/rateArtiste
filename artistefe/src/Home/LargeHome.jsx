import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import './style.css'
import { ethers } from 'ethers'
import { abi, contractAddress, imagesData } from '../constants.js'
import Socials from './Socials'
const artsData = [
  { name: 'SOB', id: 1, votes: 0 },
  { name: 'Drake', id: 2, votes: 0 },
  { name: 'Yeezy', id: 3, votes: 0 },
  { name: 'me', id: 4, votes: 0 },
  { name: 'ten', id: 5, votes: 0 },
  { name: 'loop', id: 6, votes: 0 },
  { name: 'Yeezy', id: 7, votes: 0 },
  { name: 'Yeezy', id: 8, votes: 0 },
  { name: 'Yeezy1', id: 9, votes: 0 },
]
const artisteNames = []
const artisteVotes = []

const LargeHome = () => {
  const secondDivRef = useRef(null)
  const firstDivRef = useRef(null)
  const [connect, setConnect] = useState('Connect')
  const [artisteVote, setArtisteVote] = useState([])
  const [artistes, setArtistes] = useState([{ name: '' }, { votes: 0 }])
  const [artisteName, setArtisteName] = useState('')
  const { scrollYProgress } = useScroll()
  const [highlightedContent, setHighlightedContent] = useState('') // Updated initial value
  const [filterArtiste, setFilterArtiste] = useState(artsData)
  const [displayedImage, setDisplayedImage] = useState('')

  const handleVote = (id) => {
    setFilterArtiste((prevArtists) => {
      return prevArtists.map((artist) => {
        if (artist.id === id) {
          return { ...artist, votes: artist.votes + 1 }
        }
        return artist
      })
    })
  }

  // useEffect(() => {
  //   handleScroll()
  // }, [scrollYProgress])

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
  async function fetchArtisteData() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const artisteCount = await contract.artisteCount()

      // Get artiste data
      let artistes = []
      for (let i = 1; i <= artisteCount; i++) {
        // const artiste = await contract.artiste(i)
        const name = await contract.getArtiste(i)
        const votes = await contract.getArtisteVotes(i)
        artisteNames.push(name)
        artisteVote.push(votes)
        // setArtisteVote([...artisteVote, votes])

        // artisteVotes.push(votes)
        // artistes.push(artiste)
        // console.log(newVotes);
      }
      // Log out the names and votes in real time
      console.log('Artiste Names:', artisteNames)
      // console.log('Artiste Votes:', artisteVote[2].toNumber())
      setArtistes(artistes)
      console.log('Hello ')
      console.log('Hello world')
    }
  }

  useEffect(() => {
    fetchArtisteData()
  }, [])

  const connectButton = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      setConnect('Connected')
      console.log('present')
    } else {
      console.log('not present')
    }
  }

  const addArtiste = async (name) => {
    try {
      const name = 'santos'
      await requestAccount()
      if (typeof window.ethereum != 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        //connecting to the contract address, the signer(metamask) and the contract abi
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.addArtiste(name)
      }
      fetchArtisteData()
      console.log('Hello world add')
    } catch (error) {
      console.log(error)
    }
  }

  const getArtiste = async () => {
    const user = 3
    if (typeof window.ethereum != 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const newartisteName = await contract.getArtiste(user)

      console.log(newartisteName.toString())
      // console.log(signer._address)
    }
  }

  const rateArtiste = async (userId) => {
    if (typeof window.ethereum != 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const transactionResponse = await contract.rateArtiste(userId)
    }
    fetchArtisteData()
  }

  const getArtisteVotes = async (artisteId) => {
    // const artisteId = 1
    if (typeof window.ethereum != 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const votes = await contract.getArtisteVotes(artisteId)
      // setSelectedVotes(votes.toNumber());
      // console.log(votes.toNumber())
    }
  }
  return (
    <>
      <div className="home">
        {/* <Navigation /> */}
        <nav>
          <input
            type="text"
            // onChange={handleSearchChange}
            placeholder="Add artiste..."
          />
          <button onClick={connectButton}>
            <span>{connect}</span>
            <svg
              viewBox="-5 -5 110 110"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
            </svg>
          </button>
          <button onClick={addArtiste}> Add Artiste</button>
          <Socials />
        </nav>
        <div className="home-container">
          {artisteNames.map((item, index) => {
            return (
              <div key={index}>
                <div className="figures">
                  <figure>
                    <img src={imagesData[index]} alt="" />
                    <figcaption>{item}</figcaption>
                  </figure>
                </div>
                <div className="figures-button">
                  <button
                    className="voting-button"
                    onClick={() => rateArtiste(index)}
                  >
                    Rate
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={artisteVote[index]}
                    readOnly
                  />
                </div>
              </div>
            )
          })}
        </div>
        {/* <div className="figures">
          <figure>
            <img src="https://picsum.photos/id/287/250/300" alt="Mountains" />
            <figcaption>The Day</figcaption>
          </figure>
          <figure>
            <img src="https://picsum.photos/id/475/250/300" alt="Mountains" />
            <figcaption>The Night</figcaption>
          </figure>
        </div> */}
      </div>
      {/* style="--c:#fff5" */}
      {/* <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Search for a name..."
      /> */}
      {/* <div className="home-container">
        <div className="content">
          
        </div>
      </div> */}
      {/* <motion.div className="container"> */}

      {/* <motion.div className="firstDiv" ref={firstDivRef}> */}
      {/* <div className="display-div">{highlightedContent}</div> */}
      {/* <img src={displayedImage} alt="" /> */}
      {/* </motion.div> */}
      {/* <motion.div
          className="secondDiv"
          ref={secondDivRef}
          onScroll={handleScroll}
        > */}
      {/* {artisteNames.map((item, index) => (
            <motion.div key={index} className="voting-div">
              <img src={imagesData[index]} alt="" />
              <div className="details">
                <p>{item}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={artisteVote[index]}
                  readOnly
                />
                <button onClick={() => rateArtiste(index)}>Vote</button>
              </div>
            </motion.div>
          ))} */}
      {/* </motion.div>
      </motion.div> */}
      {/* <button onClick={getArtisteVotes}>Get Artiste Votes</button>
      <button onClick={getArtiste}> Get Artiste Name</button>
      <button onClick={addArtiste}> Add Artiste</button>
      <button onClick={rateArtiste}>Vote</button>
        <button onClick={connectButton}>{connect}</button>

      */}
    </>
  )
}

export default LargeHome
