import React, { SetStateAction, useEffect, useState } from 'react';
import { CallViewButton } from '../components/CallViewButton';
import { EndCallButton } from '../components/EndCallButton';
import { VideoStreamer } from '../components/VideoStreamer';

import '../css/call.css';

import micOn from "../icons/microphone-solid-on.svg"
import micOff from "../icons/microphone-solid-off.svg"
import camOn from "../icons/camera-solid-on.svg"
import camOff from "../icons/camera-solid-off.svg"
import { default as WebRTC } from 'simple-peer';
import { Peer, PeerInfo } from '../Types';


interface Props {
    localStream: MediaStream,
    remoteStream: MediaStream,
    endCall: Function,
    peer: WebRTC.Instance,
    caller: Peer
}

export const CallView = (props: Props) => {
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);
    const [peerMicState, setPeerMicState] = useState(true);

    useEffect(() => {
        props.peer.on('data', (data: string) => {
            let parsedData: PeerInfo = JSON.parse(data);
            
            switch(parsedData.type) {
                case 'mic-state':
                    setPeerMicState(parsedData.content);   
                    console.log('Peer mic state: ' + peerMicState);       
                    break;
            }
        });
    },[]);

    const micClicked = () => {
        props.peer.send(JSON.stringify({
            type: 'mic-state',
            content: !micState
        }));

        setMicState(!micState);
    }

    const camClicked = () => {
        setCamState(!camState);
    }

    return (
        <div className="call-container">
            <div className="video-container">
                <VideoStreamer className="remote-video-container" stream={props.remoteStream} />

                {!peerMicState && 
                <p className="function-off-container mic-muted-text">
                    {props.caller.name.substr(0, props.caller.name.indexOf(' ')).slice(-1) === 's' ? 
                        props.caller.name.substr(0, props.caller.name.indexOf(' ')) + " mikrofon är avstängd" 
                    : 
                        props.caller.name.substr(0, props.caller.name.indexOf(' ')) + "s mikrofon är avstängd"}</p>
                }

                <div className="right-side-container">
                    <VideoStreamer className="local-video-container" stream={props.localStream} />

                    {micState === false ? <div className="function-off-container">
                        Din mikrofon är avstängd
                    </div> : <></>}

                    {camState === false ? <div className="function-off-container">
                        Din kamera är avstängd
                    </div> : <></>}
                </div>
            </div>

            <div className="function-bar-container">
                <ul>
                    <li> 
                        <CallViewButton functionDesc={micState ? "Stäng av din mikrofon" : "Sätt på din mikrofon"} icon={micState ? micOn : micOff} buttonFunction={micClicked} /> 
                    </li>
                    <li> 
                        <CallViewButton functionDesc={camState ? "Stäng av din kamera" : "Sätt på din kamera"} icon={camState ? camOn : camOff } buttonFunction={camClicked} />
                    </li>
                    <li>
                        <EndCallButton endCall={props.endCall} />
                    </li>
                </ul>
            </div>
        </div>
    );
};