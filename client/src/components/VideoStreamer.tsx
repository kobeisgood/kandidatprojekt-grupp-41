import React, { useEffect } from 'react';
import { CallButton } from './CallButton';
import { StartVideoButton } from './StartVideoButton';
import { HangUpButton } from './HangUpButton';


interface Props {
    remoteStream: MediaStream
}

export class VideoStreamer extends React.Component<Props> {
    localVideoStreamRef: React.RefObject<HTMLVideoElement>;
    remoteVideoStreamRef: React.RefObject<HTMLVideoElement>;

    constructor(props: Props) {
        super(props);
        this.localVideoStreamRef = React.createRef();
        this.remoteVideoStreamRef = React.createRef();
    }

    render() {
        return (
            <div>
                <div>
                    <video autoPlay={true} ref={this.localVideoStreamRef} />
                    <video autoPlay={true} ref={this.remoteVideoStreamRef} />
                </div>

                <StartVideoButton localVideoElement={this.localVideoStreamRef} />
                <CallButton localVideoElement={this.localVideoStreamRef} remoteVideoElement={this.remoteVideoStreamRef} />
                <HangUpButton />
            </div>
        );
    }
}