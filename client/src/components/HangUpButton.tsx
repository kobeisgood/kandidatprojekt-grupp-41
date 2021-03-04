import React from 'react';

export class HangUpButton extends React.Component {
    render() {
        return (<button onClick={streamCamVideo}>
            Avsluta samtal
        </button>)
    }
}

const streamCamVideo = () => {
    console.log("streaming video")
    var constraints = { audio: true, video: true };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
            var video = document.querySelector("video");

            if (video != null) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    if (video != null) {
                        video.play();
                    }
                };
            }
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.
}
