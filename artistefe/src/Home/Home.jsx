import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { logger } from 'ethers'
// import {boxicons} from "boxicons";
const artsData = [
  { name: 'SOB', id: 1 },
  { name: 'Drake', id: 2 },
  { name: 'Yeezy', id: 3 },
]

// const { useLayoutEffect, useRef } = React
let t1 = gsap.timeline({ paused: true, reversed: true })

const Home = () => {
  const [reversed, setReversed] = useState(false)
  const tl = useRef()
  const screen1 = useRef()
  const desc = useRef()
  const artisteFaq = useRef()
  const displayText = useRef()
  const artistes1 = useRef()

  //   useLayoutEffect(() => {
  //     const ctx = gsap.context(() => {
  //     //   tl.current && tl.current.progress(0).kill()
  //      gsap.to('.displayText', {
  //         ease: 'power1.inOut',
  //         yPercent: -120,
  //         opacity: 0,
  //       })
  //     }, screen1)
  //     return () => ctx.revert()
  //   },[])
  //   let t1 = gsap.timeline({ paused: true, reversed: true })
  //   t1 =

  //   useEffect(() => {
  //     // toggle the direction of our timeline
  //     console.log('toggling reverse to', reversed)
  //     tl.current.reversed(reversed)
  //   }, [reversed])

  //   let t2 = gsap.to('.desc', {
  //     ease: 'power1.inOut',
  //     yPercent: -120,
  //     opacity: 0,
  //   })
  //   let t3 = gsap.to('.artiste-faq', {
  //     ease: 'power1.inOut',
  //     yPercent: -150,
  //     opacity: 0,
  //   })
  //   let t4 = gsap.to('.artiste1', {
  //     scale: 3,
  //     height: 50,
  //   })

  const screenClick = (e) => {
    t1.play()
    // t1.play()
    // t3.play()
    // t4.play()
    console.log(artistes1)
  }

  const screenRevert = (e) => {
    t1.reverse()
  }

  t1.to(
    '.displayText',
    {
      ease: 'power1.inOut',
      yPercent: -90,
      opacity: 0,
    },
    0,
  )
  t1.to('.desc', {
    ease: 'power1.inOut',
    yPercent: -120,
    duration: 0.2,
    opacity: 0,
  })
  t1.to('.artiste-faq', {
    ease: 'power1.inOut',
    yPercent: -230,
    duration: 0.5,
    opacity: 0,
  })

  t1.to(
    '.artistes1',
    {
      ease: 'power1.inOut',
      y: -130,
    },
    0.1,
  )
  t1.to('.artistes1', {
    ease: 'power1.inOut',
    height: 300,
  })
  return (
    <div className="screen-1" ref={screen1}>
      <p className="displayText" ref={displayText}>
        Bullchord Artiste Rating, rate your favorite artistes for higher returns
      </p>
      <h3 className="desc" ref={desc}>
        This is bullchord description
      </h3>
      <div className="artiste-faq" ref={artisteFaq}>
        <h2>Artites</h2>
        <h2>FAQ</h2>
      </div>
      {/* <div className="test">this is a text</div> */}
      <div className="artistes-container">
        {/* <div className="artistes1" onClick={screenClick} ref={artistes1}> */}
        {artsData.map((item, i) => {
          return (
            <div className="artistes1" key={i} onClick={screenClick}>
              <div className="name">
                <h3>
                  {item.name} <span>Flag</span>
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
                </svg>
              </div>
              <div className="action">
                <input type="range" name="" id="" />
              </div>
            </div>
          )
        })}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        onClick={screenRevert}
      >
        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
      </svg>
    </div>
  )
}

export default Home
