import React from 'react';
import { CallButton } from './CallButton';
import { StartVideoButton } from './StartVideoButton';
import { HangUpButton } from './HangUpButton';



 export class VideoStreamer extends React.Component {
   localVideoStreamRef: any;
   remoteVideoStreamRef:any;

    constructor(props:any) {
        super(props);
        this.localVideoStreamRef = React.createRef();
        this.remoteVideoStreamRef = React.createRef();
    }

      render() {
        return (
          <div>
            <div id="container">
              <video autoPlay={true} id="localVideo" ref={this.localVideoStreamRef}></video>
              <video autoPlay={true} id="remoteVideo" ref={this.remoteVideoStreamRef}></video>
            </div>

                <StartVideoButton localVideoElement={this.localVideoStreamRef} />
                <CallButton localVideoElement={this.localVideoStreamRef} remoteVideoElement={this.remoteVideoStreamRef}/>
                <HangUpButton />

            <br/>
          </div>
        );
      }
}