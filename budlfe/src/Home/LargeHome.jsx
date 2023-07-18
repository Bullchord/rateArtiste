import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import { ethers } from 'ethers'
import { abi, contractAddress } from '../constants.js'
import Socials from './Socials'

const LargeHome = ({ userAddress }) => {
  const [connect, setConnect] = useState('Connect')
  const [budls, setBudls] = useState([])
  const [budlName, setBudlName] = useState('')
  const [budlWebLink, setBudlWebLink] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [address, setAddress] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    addBudl(budlName, budlWebLink)
  }
  const contractOwner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

  async function checkOwnership() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, abi, provider)

    const contractOwner = await contract.owner()
    setIsOwner(contractOwner)
  }

  // if (contractOwner == address) {
  //   setIsOwner(true)
  // } else {
  //   setIsOwner(false)
  // }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchBudlData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const budlCount = await contract.budlCount()

    const fetchBudlDataa = []
    let i = 1
    for (i; i <= budlCount; i++) {
      const budlls = await contract.getBudls(i)
      const link = await contract.getBudlLink(i)
      const name = await contract.getBudl(i)
      const votes = await contract.getBudlVotes(i)

      const budlData = {
        id: i,
        name: name,
        weblink: link,
        votes: votes,
      }
      fetchBudlDataa.push(budlData)
    }

    setBudls(fetchBudlDataa)
  }
  // useEffect(() => {
  //   checkOwnership()
  // }, [userAddress])

  useEffect(() => {
    fetchBudlData()
  }, [])

  async function addBudl(name, weblink) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const addBudlTx = await contract.addBudl(name, weblink)
      await addBudlTx.wait()
      console.log('New Budl added successfully!')
      setBudlName('')
      setBudlWebLink('')
    } catch (error) {
      console.error('Error adding Budl:', error)
    }
  }

  const connectButton = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      setConnect('Connected')

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setAddress(await signer.getAddress())
    } else {
      console.log('not present')
    }
  }
  console.log(address)
  console.log('hello world')

  // const addArtiste = async (name, weblink) => {
  //   try {
  //     // const name = 'santos'
  //     await requestAccount()

  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const signer = provider.getSigner()
  //     //connecting to the contract address, the signer(metamask) and the contract abi
  //     const contract = new ethers.Contract(contractAddress, abi, signer)
  //     const transactionResponse = await contract.addBudl(name, weblink)

  //     fetchBudlData()
  //     setBudlName('')
  //     setBudlWebLink('')
  //     console.log('Hello world add')
  //     await listenForTransactionMine(transactionResponse, provider)
  //     console.log('Added an Artiste')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const getBudl = async (id) => {
  //   // const user = 3
  //   if (typeof window.ethereum != 'undefined') {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const signer = provider.getSigner()
  //     const contract = new ethers.Contract(contractAddress, abi, signer)
  //     const newBudlName = await contract.getBudl(id)

  //     console.log(newBudlName.toString())
  //     // console.log(signer._address)
  //   }
  // }
  const rateBudl = async (userId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.rateBudl(userId)
      await transactionResponse.wait()
      console.log('Voted!')
    } catch (error) {
      console.error('Error voting Budl:', error)
    }

    fetchBudlData()
  }
  console.log(userAddress)

  const listenForTransactionMine = (transactionResponse, provider) => {
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(`done ${transactionReceipt.confirmations}`)
        // alert('Your Transaction has been Mined')
        resolve()
      })
    })
  }
  return (
    <>
      <div className="home">
        {/* <Navigation /> */}
        <nav>
          <div className="navigation">
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
            {/* <button onClick={() => addArtiste(budlName)}>Add Budl</button> */}
          </div>
          <Socials />
        </nav>
        {contractOwner === address ? (
          <article>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={budlName}
                  placeholder="Add Budl name..."
                  onChange={(e) => setBudlName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Web Link:
                <input
                  type="text"
                  value={budlWebLink}
                  placeholder="Add Budl link..."
                  onChange={(e) => setBudlWebLink(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Add Budl</button>
            </form>
          </article>
        ) : (
          ''
        )}

        <div className="home-container">
          {budls.map((item, index) => {
            console.log(item.votes.toString(), item.id)
            return (
              <div className="home-artiste-box" key={index}>
                <p>{item.name}</p>
                <a href={item.weblink}> View more</a>
                <p>{item.votes.toString()}</p>
                <div className="figures-button">
                  <button
                    className="voting-button"
                    onClick={() => rateBudl(item.id)}
                  >
                    Rate
                  </button>
                  {/* <input
                    type="range"
                    min="0"
                    max="100"
                    value={artisteVote[index]}
                    readOnly
                  /> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default LargeHome
