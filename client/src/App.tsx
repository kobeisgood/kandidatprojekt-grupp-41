<<<<<<< HEAD
import React from 'react';
=======
import { OpenConnection, RequestUserList } from './Connection';
import { User } from './Types';
>>>>>>> server-main
import './App.css';

var socket: SocketIOClient.Socket;
var allUsers: User[] = [];

function connectToServer() {
    socket = OpenConnection();
    RequestUserList(socket);
    console.log(allUsers);
}

function App() {
    return (
        <div className="App">
<<<<<<< HEAD
            <button>Anslut</button>
=======
            <button onClick={connectToServer}>Anslut</button>
>>>>>>> server-main
        </div>
    );
}

export default App;
