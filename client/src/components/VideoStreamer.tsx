import React from 'react';

export class VideoStreamer extends React.Component {
    constructor(props:any) {
        super(props);
        this.streamCamVideo = this.streamCamVideo.bind(this)
    }

    streamCamVideo() {
        var constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            var video = document.querySelector("video");

            if (video != null) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                if (video != null) {
                    video.play();
                }
                };
            }
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          }); // always check for errors at the end.
      }
      render() {
        return (
          <div>
            <div id="container">
              <video autoPlay={true} id="videoElement" ></video>
            </div>
            <br/>
            <button onClick={this.streamCamVideo}>Start streaming</button>
          </div>
        );
      }
}