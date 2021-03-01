import { OpenConnection, JoinRoom } from './Connection';
import { User } from './Types';
import './App.css';
import { useState } from 'react';


let socket: SocketIOClient.Socket;

function App() {
    const [nameInput, setNameInput] = useState("");
    const [idInput, setIdInput] = useState("");
    const [allUsers, setUsers] = useState([]);

    const handleNameInput = (event: any) => {
        setNameInput(event.target.value);
    };

    const handleIdInput = (event: any) => {
        setIdInput(event.target.value);
    };

    const joinLobby = () => {
        if (socket === undefined) {
            socket = OpenConnection(nameInput);
            JoinRoom(socket, "lobby", setUsers);
            console.log(allUsers);
        } else {
            console.log("Already connected to server!");
        }
    };

    const joinRoom = () => {
        JoinRoom(socket, idInput, setUsers);
    };

    return (
        <div className="App">
            <input type="text" onChange={handleNameInput} placeholder="Ditt namn..."/>
            <button onClick={joinLobby}>Logga in</button>
            <br/>
            <br/>
            <input type="text" onChange={handleIdInput} placeholder="Rum-ID..."/>
            <button onClick={joinRoom}>Gå med i rum</button>

            <h3>Inloggade användare:</h3>
            <ul>
                {allUsers.map((user: User) =>
                    <li key={user.id}>{user.name}</li>
                )}
            </ul>
        </div>
    );
}

export default App;
