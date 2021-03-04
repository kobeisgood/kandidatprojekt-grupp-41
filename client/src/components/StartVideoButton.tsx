import React from 'react';

interface Props {
    localVideoElement: any;
}

export class StartVideoButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    streamCamVideo = (localVideoElement: any) => {
        console.log("streaming video")
        var constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                var video = localVideoElement.current;

                if (video != null) {
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = function (e: any) {
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

    render() {
        return (<button onClick={() => this.streamCamVideo(this.props.localVideoElement)}>
            Starta video
        </button>)
    }
}