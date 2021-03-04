import './App.css';

import { VideoStreamer } from './components/VideoStreamer';
import { CallButton } from './components/CallButton';
import { StartVideoButton } from './components/StartVideoButton';
import { HangUpButton } from './components/HangUpButton';

function App() {
    return (
        <div>
            <VideoStreamer />
        </div>
    );
}

export default App;
