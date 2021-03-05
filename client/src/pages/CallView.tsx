import React, { useState } from 'react';
import '../css/call.css';
import { CallViewButton } from '../components/CallViewButton'
import { EndCallButton } from '../components/EndCallButton'

import micOn from "../icons/microphone-solid-on.svg"
import micOff from "../icons/microphone-solid-off.svg"
import camOn from "../icons/camera-solid-on.svg"
import camOff from "../icons/camera-solid-off.svg"


//<img src="https://www.irishtimes.com/polopoly_fs/1.4456323.1610462111!/image/image.jpg_gen/derivatives/box_620_330/image.jpg" width="100%" height="100%"/> 


export const CallView = () => {
   
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

    const test = () => {
        console.log("ahaa")
    }

    const micClicked = () => {
        setMicState(!micState)
    }

    const camClicked = () => {
        setCamState(!camState)
    }

    return(
        <div className="call-container">

            <div className="video-container">

                <div className="remote-video-container">
                    <img src="https://deadline.com/wp-content/uploads/2020/11/Stephen-Lang-Headshot-Matt-Sayles-e1605093774374.jpg?w=681&h=383&crop=1" width="100%" height="100%"/> 
                </div>

                <div className="right-side-container">

                    <div className="local-video-container">
                    </div>

                    {micState === false ? <div className="function-off-container">
                        DIN MIKROFON ÄR AVSTÄNGD
                    </div> : <></> }

                    {camState === false ? <div className="function-off-container">
                        DIN KAMERA ÄR AVSTÄNGD
                    </div> : <></> }

                </div>

            </div>

           

            <div className="function-bar-container">
                <ul>
                    {micState === true ? <li> <CallViewButton functionDesc={"Stäng av mikrofon"} icon={micOn} buttonFunction={micClicked}/> </li> : 
                    <li> <CallViewButton functionDesc={"Stäng av mikrofon"} icon={micOff} buttonFunction={micClicked}/> </li> }

                    {camState === true ? <li> <CallViewButton functionDesc={"Stäng av kamera"} icon={camOn} buttonFunction={camClicked}/></li> : 
                    <li> <CallViewButton functionDesc={"Stäng av kamera"} icon={camOff} buttonFunction={camClicked}/></li>}
                    
                    <li> <EndCallButton endCallFunction={test}/></li>
                </ul>
               
                
                
            </div>
        </div>

        );

}

