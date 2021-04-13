import React, { useEffect, useState } from 'react';
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
import backArrow from '../icons/back-arrow.svg';


interface Props {
    localStream: MediaStream,
    remoteStream: MediaStream,
    endCall: Function,
    peer: WebRTC.Instance,
    caller: Peer
}

let reactionHistory: string[] = [];
var timer: NodeJS.Timeout | null = null;

export const CallView = (props: Props) => {
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);
    const [peerMicState, setPeerMicState] = useState(true);
    const [dummyState, setDummyState] = useState(0); /** State that forces re-render */
    const [slider, setSlider] = useState(false);

    const availableReactions: Array<string> = ['Ja', 'Nej', 'Jag ser dig', 'Jag ser dig inte', 'Jag hör dig', 'Jag hör dig inte'];

    useEffect(() => {

        /* Peer recevies data */
        props.peer.on('data', (data: string) => {
            let parsedData: PeerInfo = JSON.parse(data);

            switch (parsedData.type) {
                case 'mic-state':
                    setPeerMicState(parsedData.content);
                    break;
                case 'reaction':
                    reactionHistory.push(props.caller.name.substr(0, props.caller.name.indexOf(' ')) + " sa: " + '"' + parsedData.content + '"');
                    setDummyState(Math.random()); /** Forces re-render */
                    setTimer();

                    break;
            }
        });

    }, [props.peer, props.caller.name]);

    const setTimer = () => {

        if (timer === null) {
            timer = setInterval(() => {
                reactionHistory.shift(); /** Removes first element */

                if (timer !== null && reactionHistory.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }

                setDummyState(Math.random());
            }, 4000);
        }

    }

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

        // turns off or on mic
        props.localStream.getAudioTracks()[0].enabled = !micState;
    }

    const camClicked = () => {
        setCamState(!camState);

        // turns off or on cam
        props.localStream.getVideoTracks()[0].enabled = !camState;
    }

    const openReactions = () => {
        setSlider(!slider);
    }

    const sendReaction = (data: string) => {
        props.peer.send(JSON.stringify({
            type: 'reaction',
            content: data
        }));

        reactionHistory.push("Du sa: " + '"' + data + '"')
        setDummyState(Math.random());   /** Forces re-render */
        setTimer();

    }

    return (
        <div className="call-container">
            <div className={slider ? "reaction-buttons-container active" : "reaction-buttons-container"}>
                <div className='slider'>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[0])}>{availableReactions[0]}</button>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[1])}>{availableReactions[1]}</button>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[2])}>{availableReactions[2]}</button>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[3])}>{availableReactions[3]}</button>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[4])}>{availableReactions[4]}</button>
                    <button disabled={slider ? false : true} className={slider ? "reaction-button" : "reaction-button active"} onClick={() => sendReaction(availableReactions[5])}>{availableReactions[5]}</button>
                </div>
                <button className={slider ? "opened-reactions-button" : "open-reactions-button"} onClick={openReactions}>
                    <img src={backArrow} className={slider ? 'rotate-back-arrow-image' : 'rotate-arrow-image'} alt="Slider"></img>
                </button>
            </div>
            <div className="video-container">
                <VideoStreamer className="remote-video-container" stream={props.remoteStream} />

                {!peerMicState &&
                    <p className="function-off-container mic-muted-text">
                        {/* Checks if first name ends with 's', 'x' or 'z' */}
                        {props.caller.name.substr(0, props.caller.name.indexOf(' ')).slice(-1) === 's' ||
                            props.caller.name.substr(0, props.caller.name.indexOf(' ')).slice(-1) === 'x' ||
                            props.caller.name.substr(0, props.caller.name.indexOf(' ')).slice(-1) === 'z' ?
                            props.caller.name.substr(0, props.caller.name.indexOf(' ')) + " mikrofon är avstängd"
                            :
                            props.caller.name.substr(0, props.caller.name.indexOf(' ')) + "s mikrofon är avstängd"}</p>
                }
                <div className="reaction-container">
                    {reactionHistory.map((reaction: string, index) => {
                        return (
                            <p className="reaction" key={index}>{reaction}</p>
                        );
                    })}
                </div>

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
                        <CallViewButton functionDesc={camState ? "Stäng av din kamera" : "Sätt på din kamera"} icon={camState ? camOn : camOff} buttonFunction={camClicked} />
                    </li>
                    <li>
                        <EndCallButton endCall={props.endCall} />
                    </li>
                </ul>
            </div>
        </div>
    );
};