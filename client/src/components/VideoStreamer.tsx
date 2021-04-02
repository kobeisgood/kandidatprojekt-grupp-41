import { useEffect, useRef } from 'react';


interface Props {
    className?: string, 
    stream: MediaStream
}

export const VideoStreamer = (props: Props) => {
    useEffect(() => {
        let videoElem = videoStreamRef.current;
        
        if (videoElem !== null)
            videoElem.srcObject = props.stream;
    }, []);

    const videoStreamRef = useRef<HTMLVideoElement>(null);

    return (
        <video autoPlay={true} ref={videoStreamRef} className={props.className} />
    );
}