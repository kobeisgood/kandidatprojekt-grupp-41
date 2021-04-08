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
    const [reactionHistoryState, setReactionHistoryState]: [string[], Function]= useState([]);
    var timer: NodeJS.Timeout;

    const availableReactions: Array<string> = ['Hej', 'Hejdå', 'test'];

    useEffect(() => {

        /* Peer recevies data */
        props.peer.on('data', (data: string) => {
            let parsedData: PeerInfo = JSON.parse(data);
            
            switch(parsedData.type) {
                case 'mic-state':
                    setPeerMicState(parsedData.content);        
                    break;
                case 'reaction':
                    console.log(parsedData);
                    setReactionHistoryState((oldArray: string[]) => [...oldArray, parsedData.content]);  
                    break;
            }
        });  

    },[]);

     useEffect(() => {

        console.log(reactionHistoryState);
        
        if (reactionHistoryState.length > 0)
            setTimer();

    },[reactionHistoryState])
 
    const setTimer = () => {
        timer = setInterval(clearChatEntry, 4000);
    }

    const clearChatEntry = () => {
        
        clearInterval(timer);

        setReactionHistoryState(
            //reactionHistoryState.filter(reaction => reactionHistoryState.indexOf(reaction) !== 0)
            reactionHistoryState.slice(1)
        );
    }; 

    /**
     * Handler for mic button
     */

    const micClicked = () => {

        /* Sends the current state of mic to peer */
        props.peer.send(JSON.stringify({
            type: 'mic-state',
            content: !micState
        }));

        setMicState(!micState);
    }

    const camClicked = () => {
        setCamState(!camState);
    }

    const sendReaction = (data: string) => {
        props.peer.send(JSON.stringify({
            type: 'reaction',
            content: data
        }));

        setReactionHistoryState((oldArray: string[]) => [...oldArray, data]); 
        
        //timer = setInterval(clearChatEntry, 3000);
    }

    return (
        <div className="call-container">
            <div className="video-container">
                <VideoStreamer className="remote-video-container" stream={props.remoteStream} />

                {!peerMicState && 
                <p className="function-off-container mic-muted-text">
                     {/* Checks if first name ends with 's' */}
                    {props.caller.name.substr(0, props.caller.name.indexOf(' ')).slice(-1) === 's' ? 
                        props.caller.name.substr(0, props.caller.name.indexOf(' ')) + " mikrofon är avstängd" 
                    : 
                        props.caller.name.substr(0, props.caller.name.indexOf(' ')) + "s mikrofon är avstängd"}</p>
                }

                <div className="right-side-container">
                    <VideoStreamer className="local-video-container" stream={props.localStream} />
                <div className="available-reactions-container">
                    <button onClick={() => sendReaction("Hej")}>Send: {availableReactions[0]}</button>
                    <button onClick={() => sendReaction("Hejdå")}>Send: {availableReactions[1]}</button>
                </div>
                <div className="reactions-container">  
                {reactionHistoryState.map((reactionTest: string) => {
                       return (
                            <p>{reactionTest}</p>
                       );
                   })} 
                </div>

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