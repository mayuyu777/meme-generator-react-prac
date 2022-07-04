import React, { useState } from 'react';
import { Memes } from '../memesData';

export default function MemeGen() {

    const {data:{memes}} = Memes;
    const [memeImage, setMemeObject] = useState("");

    function generateNewMemeImg() {
        const randNumber = Math.floor(Math.random() * memes.length);
        setMemeObject((oldMeme) => {
            console.log(oldMeme);
            return (memes[randNumber].url)
        });
    }


    
    return (
        <div className="meme-cont">
            <div className="meme-input-cont">
                <input id="input-top" type="text" placeholder="Type something..."/>
                <input id="input-bottom" type="text" placeholder="Type something..."/>
            </div>
            <button onClick={generateNewMemeImg} className="meme-button">Get a new meme image
                <span><img className="meme-button-img" src={require("../images/image.png")} alt="meme-img"/></span>
            </button>
            {memeImage && <img className="meme-img" src={memeImage} alt="meme-img"/>}
        </div>
    );
}