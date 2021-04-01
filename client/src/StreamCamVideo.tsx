export const OpenLocalStream = async () => {
    let constraints = { audio: true, video: { width: 1280, height: 720 } };
    let mediaDevices = navigator.mediaDevices;
    
    try {
        const devices = await mediaDevices.getUserMedia(constraints);
        return devices;
    } catch (err) {
        console.error(err);
        return new MediaStream();
    }
}