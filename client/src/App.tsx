import { useState } from 'react';
import { OpenConnection, JoinRoom, CallRespond, CallUser } from './Connection';
import { User } from './Types';
import { VideoStreamer } from './components/VideoStreamer';
import { CallButton } from './components/CallButton';
import { StartVideoButton } from './components/StartVideoButton';
import { HangUpButton } from './components/HangUpButton';

import './App.css';


let socket: SocketIOClient.Socket;

export const App = () => {
    const [nameInput, setNameInput] = useState("");
    const [roomIdInput, setIdInput] = useState("");
    const [allUsers, setUsers] = useState([]);
    const [remoteStream, setRemoteStream] = useState(null);
    const [outgoingCall, setOutgoingCall] = useState(false);
    const [calleeName, setCalleeName] = useState("");
    const [callAccepted, setCallAccepted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [caller, setCaller]: [User, Function] = useState({ id: "", name: "" });
    const [callerSignal, setCallerSignal] = useState({});

    const handleNameInput = (event: any) => {
        setNameInput(event.target.value);
    };

    const handleIdInput = (event: any) => {
        setIdInput(event.target.value);
    };

    const joinLobby = () => {
        if (socket === undefined) {
            socket = OpenConnection(nameInput);
            JoinRoom(socket, "lobby", setUsers, setIncomingCall, setCallerSignal, setCaller);
            console.log(allUsers);
        } else {
            console.log("Already connected to server!");
        }
    };

    const joinRoom = () => {
        JoinRoom(socket, roomIdInput, setUsers, setIncomingCall, setCallerSignal, setCaller);
    };

    return (
        <div className="App">
            <input type="text" onChange={handleNameInput} placeholder="Ditt namn..." />
            <button onClick={joinLobby}>Logga in</button>

            {/*
            <input type="text" onChange={handleIdInput} placeholder="Rum-ID..." />
            <button onClick={joinRoom}>Gå med i rum</button>*/
            }

            <h3>Inloggade användare:</h3>
            <ul>
                {allUsers.map((user: User) =>
                    <li key={user.id}>
                        {user.name}
                        {user.id !== socket.id &&
                            <button onClick={() => {
                                CallUser(socket, user.id, setOutgoingCall);
                                setCalleeName(user.name);
                            }}>Ring</button>
                        }
                    </li>
                )}
            </ul>

            {outgoingCall &&
                <h3>{"Ringer " + calleeName + "..."}</h3>
            }

            {incomingCall && !callAccepted &&
                <div>
                    <h3>{caller.name + " ringer dig!"}</h3>
                    <button onClick={() => CallRespond(socket, true, caller, callerSignal, setCallAccepted, setIncomingCall)}>Svara</button>
                    <button onClick={() => CallRespond(socket, false, caller, callerSignal, setCallAccepted, setIncomingCall)}>Avböj</button>
                </div>
            }

            {callAccepted &&
                <h3>Svarade på samtalet!</h3>
            }

            <VideoStreamer remoteStream={new MediaStream()} />
        </div>
    );
};