export const OpenLocalStream = (setLocalStream: Function) => {
    let constraints = { audio: true, video: { width: 1280, height: 720 } };

    let mediaDevices = navigator.mediaDevices;
    
    mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
            setLocalStream(mediaStream);
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        }); // always check for errors at the end
}