import React from 'react';

interface Props {
    localVideoElement:any;
    remoteVideoElement:any;
}

export class CallButton extends React.Component<Props> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return(<button >
                Ring
            </button>)
    }
}

let pc1:any;
let pc2:any;
const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
};

// Currently does not use the startTime variable, add if necessary. How to can be found in:
// https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/pc1/js/main.js
const call = async (localVideoElement:any, remoteVideoElement:any) => {
    console.log("calling")
 
    const localStream = localVideoElement.srcObject;
    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();

    if (videoTracks.length > 0) {
        console.log(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
        console.log(`Using audio device: ${audioTracks[0].label}`);
    }

    const configuration = {};
    console.log('RTCPeerConnection configuration:', configuration);
    pc1 = new RTCPeerConnection(configuration);
    console.log('Created local peer connection object pc1');
    pc1.addEventListener('icecandidate', (e: any) => onIceCandidate(pc1, e));
    pc2 = new RTCPeerConnection(configuration);
    console.log('Created remote peer connection object pc2');

    pc2.addEventListener('icecandidate', (e: any) => onIceCandidate(pc2, e));
    pc1.addEventListener('iceconnectionstatechange', (e: any) => onIceStateChange(pc1, e));
    pc2.addEventListener('iceconnectionstatechange', (e: any) => onIceStateChange(pc2, e));
    pc2.addEventListener('track', gotRemoteStream);

    localStream!.getTracks().forEach((track:any) => pc1.addTrack(track, localStream));
    console.log('Added local stream to pc1');

    try {
        console.log('pc1 createOffer start');
        const offer = await pc1.createOffer(offerOptions);
        await onCreateOfferSuccess(offer);
    } catch (e) {
        onCreateSessionDescriptionError(e);
    }
}

async function onCreateOfferSuccess(desc:any) {
    console.log(`Offer from pc1\n${desc.sdp}`);
    console.log('pc1 setLocalDescription start');
    try {
        await pc1.setLocalDescription(desc);
        onSetLocalSuccess(pc1);
    } catch (e) {
        onSetSessionDescriptionError(e);
    }
  
    console.log('pc2 setRemoteDescription start');
    try {
      await pc2.setRemoteDescription(desc);
        onSetRemoteSuccess(pc2);
    } catch (e) {
        onSetSessionDescriptionError(e);
    }
  
    console.log('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await pc2.createAnswer();
      await onCreateAnswerSuccess(answer);
    } catch (e) {
        onCreateSessionDescriptionError(e);
    }
}

async function onCreateAnswerSuccess(desc:any) {
    console.log(`Answer from pc2:\n${desc.sdp}`);
    console.log('pc2 setLocalDescription start');
    try {
      await pc2.setLocalDescription(desc);
      onSetLocalSuccess(pc2);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
    console.log('pc1 setRemoteDescription start');
    try {
      await pc1.setRemoteDescription(desc);
      onSetRemoteSuccess(pc1);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
  }

async function onIceCandidate(pc:any, event:any) {
    try {
    await (getOtherPc(pc).addIceCandidate(event.candidate));
        onAddIceCandidateSuccess(pc);
    } catch (e) {
        onAddIceCandidateError(pc, e);
    }
    console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function getName(pc:any) {
    return (pc === pc1) ? 'pc1' : 'pc2';
}
  
function getOtherPc(pc:any) {
    return (pc === pc1) ? pc2 : pc1;
}

function gotRemoteStream(e:any, remoteVideo:any) {
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      console.log('pc2 received remote stream');
    }
}
    
// CONSOLE FUNCTIONS
function onIceStateChange(pc:any, event:any) {
    if (pc) {
      console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
}

function onAddIceCandidateSuccess(pc:any) {
    console.log(`${getName(pc)} addIceCandidate success`);
}
  
function onAddIceCandidateError(pc:any, error:any) {
    console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
}

function onSetLocalSuccess(pc:any) {
    console.log(`${getName(pc)} setLocalDescription complete`);
}
  
function onSetRemoteSuccess(pc:any) {
    console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(error:any) {
    console.log(`Failed to set session description: ${error.toString()}`);
}

function onCreateSessionDescriptionError(error:any) {
    console.log(`Failed to create session description: ${error.toString()}`);
}