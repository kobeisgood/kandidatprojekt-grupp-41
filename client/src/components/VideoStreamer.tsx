import { useEffect, useRef } from 'react';


interface Props {
    localStream: MediaStream,
    remoteStream: MediaStream
}

export const VideoStreamer = (props: Props) => {
    useEffect(() => {
        console.log("rendering video");
         
        let localVideoElem = localVideoStreamRef.current;
        let remoteVideoElem = remoteVideoStreamRef.current;
        
        if (localVideoElem !== null)
            localVideoElem.srcObject = props.localStream;

        if (remoteVideoElem !== null)
            remoteVideoElem.srcObject = props.remoteStream;
    });

    const localVideoStreamRef = useRef<HTMLVideoElement>(null);
    const remoteVideoStreamRef = useRef<HTMLVideoElement>(null);

    return (
        <div>
            <div>
                <video autoPlay={true} ref={localVideoStreamRef} />
                <video autoPlay={true} ref={remoteVideoStreamRef} />
            </div>
        </div>
    );
}