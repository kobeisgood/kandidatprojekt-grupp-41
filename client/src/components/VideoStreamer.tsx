import { useRef } from 'react';
import { CallButton } from './CallButton';
import { StartVideoButton } from './StartVideoButton';
import { HangUpButton } from './HangUpButton';


interface Props {
    remoteStream: MediaStream
}

export const VideoStreamer = (props: Props) => {
    const localVideoStreamRef = useRef<HTMLVideoElement>(null);
    const remoteVideoStreamRef = useRef<HTMLVideoElement>(null);

    return (
        <div>
            <div>
                <video autoPlay={true} ref={localVideoStreamRef} />
                <video autoPlay={true} ref={remoteVideoStreamRef} />
            </div>

            <StartVideoButton localVideoElement={localVideoStreamRef} />
            <CallButton localVideoElement={localVideoStreamRef} remoteVideoElement={remoteVideoStreamRef} />
            <HangUpButton />
        </div>
    );
}