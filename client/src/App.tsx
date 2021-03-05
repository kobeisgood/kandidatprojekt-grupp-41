import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CallView } from './pages/CallView';
import { CallPopup } from './components/CallPopup';
import { CallingPopup } from './components/CallingPopup';

function App() {
    return (
        <div>
            <CallingPopup />
        </div>

    );
}

export default App;
