import React from 'react';
import logo from './logo.svg';
import './App.css';

import { VideoStreamer } from './components/VideoStreamer';
import { RTCButton } from './components/RTCButton';

function App() {


    return (
        <div>
            <VideoStreamer/>
            <div className='box'> 
                <RTCButton buttonFunction='Start'/> 
                <RTCButton buttonFunction='Call'/>
                <RTCButton buttonFunction='Hangup'/>
            </div>
            



        </div>
    );
}

export default App;
