interface Props {
    localVideoElement: any
}

export const StartVideoButton = (props: Props) => {
    const streamCamVideo = (localVideoElement: any) => {
        let constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                let video = localVideoElement.current;

                if (video != null) {
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = (e: any) => {
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

    return (<button onClick={() => streamCamVideo(props.localVideoElement)}>
        Starta video
    </button>)
}