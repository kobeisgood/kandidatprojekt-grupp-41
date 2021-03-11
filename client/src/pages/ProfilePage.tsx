import React, { useState } from 'react';

export const ProfilePage = (props: Props) => {
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

    const test = () => {
        console.log("ahaa");
    }

    const micClicked = () => {
        setMicState(!micState);
    }

    const camClicked = () => {
        setCamState(!camState);
    }

    return (
        <div className="call-container">
            <div className="video-container">
                <VideoStreamer className="remote-video-container" stream={props.localStream} />

                <div className="right-side-container">
                    <VideoStreamer className="local-video-container" stream={props.localStream} />

                    {micState === false ? <div className="function-off-container">
                        DIN MIKROFON ÄR AVSTÄNGD
                    </div> : <></>}

                    {camState === false ? <div className="function-off-container">
                        DIN KAMERA ÄR AVSTÄNGD
                    </div> : <></>}
                </div>
            </div>

            <div className="function-bar-container">
                <ul>
                    {micState === true ? <li> <CallViewButton functionDesc={"Stäng av mikrofon"} icon={micOn} buttonFunction={micClicked} /> </li> :
                        <li> <CallViewButton functionDesc={"Stäng av mikrofon"} icon={micOff} buttonFunction={micClicked} /> </li>}

                    {camState === true ? <li> <CallViewButton functionDesc={"Stäng av kamera"} icon={camOn} buttonFunction={camClicked} /></li> :
                        <li> <CallViewButton functionDesc={"Stäng av kamera"} icon={camOff} buttonFunction={camClicked} /></li>}

                    <li><EndCallButton endCallFunction={test} /></li>
                </ul>
            </div>
        </div>
    );
};