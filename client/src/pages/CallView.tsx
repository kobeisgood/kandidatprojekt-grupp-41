import React, { useState } from 'react';
import '../css/call.css';
import { CallViewButton } from '../components/CallViewButton'
import { EndCallButton } from '../components/EndCallButton'

// <img src="https://www.irishtimes.com/polopoly_fs/1.4456323.1610462111!/image/image.jpg_gen/derivatives/box_620_330/image.jpg" width="100%" height="100%"/> 


export const CallView = () => {
   
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

    const test = () => {
        console.log("ahaa")
    }

    const micClicked = () => {
        setMicState(false)
    }

    const camClicked = () => {
        setCamState(false)
    }

    return(
        <div className="call-container">
            <div className="local-video-container">
            </div>

            {micState === false ? <div className="function-off-container">
                Mikrofon avstängd!
            </div> : <></> }

            {camState === false ? <div className="function-off-container">
                Kamera avstängd!
            </div> : <></> }

            <div className="remote-video-container">
                <img src="https://deadline.com/wp-content/uploads/2020/11/Stephen-Lang-Headshot-Matt-Sayles-e1605093774374.jpg?w=681&h=383&crop=1" width="100%" height="100%"/> 
            </div>

            <div className="function-bar-container">
                <ul>
                    <li> <CallViewButton functionDesc={"Stäng av mikrofon"} icon={"fa-microphone"} buttonFunction={micClicked}/> </li>
                    <li> <CallViewButton functionDesc={"Stäng av kamera"} icon={"fa-camera"} buttonFunction={camClicked}/></li>
                    <li> <EndCallButton endCallFunction={test}/></li>
                </ul>
               
                
                
            </div>
        </div>

        );

}

