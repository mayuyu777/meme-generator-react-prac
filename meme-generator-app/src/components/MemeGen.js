import React, { useState, useEffect } from 'react';
// import { Memes } from '../memesData';

export default function MemeGen() {

    //  const {data:{memes}} = Memes;
    // const [memeImage, setMemeObject] = useState("");

    // function generateNewMemeImg() {
    //     const randNumber = Math.floor(Math.random() * memes.length);
    //     setMemeObject((oldMeme) => {
    //         console.log(oldMeme);
    //         return (memes[randNumber].url)
    //     });
    // }


    const [meme, setMeme] = useState({
        topText: "", 
        bottomText: "", 
        randomImage: "",
        topTextFontSize: 2.5,
        bottomTextFontSize: 2.5,
        topTopBottom: 0,
        topLeftRight: 0,
        bottomTopBottom: 0,
        bottomLeftRight: 0,
        topButton: false,
        bottomButton: false
 
    })

    const [allMemeImages, setAllMemeImages] = useState({});


    useEffect(() => {
        
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))

    }, [])

    console.log(allMemeImages)


    function getMemeImage() {
       const random = Math.floor(Math.random() * allMemeImages.length);
       const url = allMemeImages[random].url;
        setMeme(prev => ({
            ...prev,
            randomImage: url
        }))
        
    }


    function handleChange(event){
        const {name, value, type} = event.target;

        setMeme(prev => {
            let flag = false;
            if(type === "button"){
                flag = name === "topButton" ? prev.topButton : prev.bottomButton 
            }
              
            console.log(flag)
            return {
                ...prev,
                [name]: type === "button" ? !flag : value
            }
        })
    }
    
    return (
        <div className="meme-cont">
            <div className="meme-input-cont">
                <input 
                    id="input-top" 
                    type="text" 
                    placeholder="Type something..."
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    id="input-bottom" 
                    type="text" 
                    placeholder="Type something..."
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <button onClick={getMemeImage}  className="meme-button">Get a new meme image
                <span><img className="meme-button-img" src={require("../images/image.png")} alt="meme-img"/></span>
            </button>
            {meme.randomImage && 
                <div>
                    <div className='meme-img-cont'>
                        <img className="meme-img" src={meme.randomImage} alt="meme-img"/>
                        <p className="meme--text top" style={{fontSize:`${meme.topTextFontSize}vw`, top:`${meme.topTopBottom}%`, left:`${meme.topLeftRight}%`}}>{meme.topText}</p>
                        <p className="meme--text bottom" style={{fontSize:`${meme.bottomTextFontSize}vw`, bottom:`${meme.bottomTopBottom}%`, left:`${meme.bottomLeftRight}%`}}>{meme.bottomText}</p>
                    </div>
                    {meme.topText && 
                        <div className='range-cont'>
                            <button 
                                className='text-button' 
                                type='button' 
                                name='topButton' 
                                onClick={handleChange}>{meme.topButton ? "Hide" : "Show"} Top Text Controls</button>
                            {meme.topButton && 
                                <div>
                                    <input 
                                        className='range-input range-top' 
                                        type='range'  
                                        name="topTopBottom" 
                                        min="0" max="80"
                                        value={meme.topTopBottom}
                                        onChange={handleChange}/>
                                    <input 
                                        className='range-input' 
                                        type='range'  
                                        name="topLeftRight" 
                                        min="0" max="50"
                                        value={meme.topLeftRight}
                                        onChange={handleChange}/>
                                    <input 
                                        className='range-input' 
                                        type='range'  
                                        name="topTextFontSize" 
                                        min="2.5" max="3.5"
                                        step="0.1"
                                        value={meme.topTextFontSize}
                                        onChange={handleChange}/>
                                </div>}
                        </div>}
                        {meme.bottomText && 
                        <div className='range-cont'>
                            <button 
                                className='text-button' 
                                type='button' 
                                name='bottomButton' 
                                onClick={handleChange}>{meme.bottomButton ? "Hide" : "Show"} Bottom Text Controls</button>
                            {meme.bottomButton && 
                                <div>
                                    <input 
                                        className='range-input' 
                                        type='range'  
                                        name="bottomTopBottom" 
                                        min="0" max="80"
                                        value={meme.bottomTopBottom}
                                        onChange={handleChange}/>
                                    <input 
                                        className='range-input' 
                                        type='range'  
                                        name="bottomLeftRight" 
                                        min="0" max="50"
                                        value={meme.bottomLeftRight}
                                        onChange={handleChange}/>
                                    <input 
                                        className='range-input' 
                                        type='range'  
                                        name="bottomTextFontSize" 
                                        min="2.5" max="5"
                                        step="0.1"
                                        value={meme.bottomTextFontSize}
                                        onChange={handleChange}/>
                                </div>}
                        </div>}
                </div>}
        </div>
    );
}