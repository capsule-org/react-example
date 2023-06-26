import React, { useState, useEffect } from 'react'
import './nft.css'
import { AiFillHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'

const NFT = (props) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    const randomBids = {
      "Abstract Smoke Red": bids1, 
      "Mountain Landscape": bids2, 
      "Paint Color on Wall": bids3, 
      "Abstract Pattern": bids4, 
      "White Line Graffiti": bids5, 
      "Abstract Triangle": bids6, 
      "Lake Landscape": bids7, 
      "Blue Red Art": bids8,
    };

    const keys = Object.keys(randomBids);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    setTitle(randomKey);
    setImage(randomBids[randomKey]);
    setValue((Math.random() * 1000).toFixed(2)); // random value between 0 and 10, rounded to 2 decimal places
    setLikes(Math.floor(Math.random() * 100) + 1);
  }, []);

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          {props.loggedIn === true ? <h1>Check out this NFT!</h1> : <h1>Login to Check out this NFT!</h1>}
        </div>
        <div className="bids-container-card">
          <div className="card-column" >
            <div className="bids-card">
            <div className="bids-card-top">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '2em' }}>{title}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: 12 }}>
                        <p className="bids-value">{value} <span>ETH</span></p>
                        <p style={{ fontSize: '1em', display: 'flex', justifyContent: 'space-around' }}> {likes} <AiFillHeart /></p>
                    </div>
                </div>
                <img src={image} alt="" />
            </div>
              <div className="bids-card-bottom">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFT
