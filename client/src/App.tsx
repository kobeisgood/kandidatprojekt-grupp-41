import { OpenConnection, RequestUserList, JoinRoom } from './Connection';
import { User } from './Types';
import './App.css';
import { useState } from 'react';


let socket: SocketIOClient.Socket;

function App() {
    const [input, setInput] = useState("");

    const handleInput = (event: any) => {
        setInput(event.target.value);
    };

    var allUsers: User[] = [];

    const connectToServer = () => {
        if (socket === undefined) {
            socket = OpenConnection();
            RequestUserList(socket);
            console.log(allUsers);
        } else {
            console.log("Already connected to server!");
        }
    };

    const joinRoom = () => {
        JoinRoom(socket, input);
    };
 
    return (
        <div className="App">
            <button onClick={connectToServer}>Anslut</button>
            <button onClick={joinRoom}>Gå med i rum</button>
            <input type="text" onChange={handleInput}></input>
        </div>
    );
}

export default App;
