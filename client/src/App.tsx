import { useEffect, useState } from 'react';
import { User } from './Types';
import { OpenConnection, JoinRoom, CallRespond, CallUser } from './Connection';
import { OpenLocalStream } from './StreamCamVideo';

import './App.css';
import { CallView } from './pages/CallView';
import { ProfilePage } from './pages/ProfilePage';
import { CallPopup } from './components/CallPopup';
import { CallingPopup } from './components/CallingPopup';


let socket: SocketIOClient.Socket;

export const App = () => {
    useEffect(() => {
        OpenLocalStream(setLocalStream); // Access browser web cam
    }, []);

    const [nameInput, setNameInput] = useState("");
    const [roomIdInput, setIdInput] = useState("");
    const [allUsers, setUsers] = useState([]);
    const [localStream, setLocalStream] = useState(new MediaStream());
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [outgoingCall, setOutgoingCall] = useState(false);
    const [calleeName, setCalleeName] = useState("");
    const [callAccepted, setCallAccepted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [caller, setCaller]: [User, Function] = useState({ id: "", name: "" });
    const [callerSignal, setCallerSignal] = useState({});
    const [goToProfile, setGoToProfile] = useState(false);

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
        } else {
            console.log("Already connected to server!");
        }
    };

    const joinRoom = () => {
        JoinRoom(socket, roomIdInput, setUsers, setIncomingCall, setCallerSignal, setCaller);
    };

    return (
        <div className="App">
            {socket === undefined &&
                <>
                    <input type="text" onChange={handleNameInput} placeholder="Ditt namn..." />
                    <button onClick={joinLobby}>Logga in</button>
                </>
            }

            {/*
            <input type="text" onChange={handleIdInput} placeholder="Rum-ID..." />
            <button onClick={joinRoom}>Gå med i rum</button>*/
            }

            {!callAccepted &&
                <>
                    <h3>Inloggade användare:</h3>
                    <ul>
                        {allUsers.map((user: User) =>
                            <li key={user.id}>
                                {user.name}
                                {user.id !== socket.id &&
                                    <button onClick={() => {
                                        CallUser(socket, user.id, setOutgoingCall, setCallAccepted, localStream, setRemoteStream);
                                        setCalleeName(user.name);
                                    }}>Ring</button>
                                }
                                {user.id == socket.id &&
                                <button onClick={() => {
                                    setGoToProfile(true);
                                }}>Profil</button>
                            }
                            </li>
                        )}
                    </ul>
                </>
            }

            {outgoingCall &&
                <h3>{"Ringer " + calleeName + "..."}</h3>
            }

            {incomingCall && !callAccepted &&
                <CallPopup
                    callerName={caller.name}
                    callRespond={(answer: boolean) => CallRespond(socket, caller, callerSignal, setCallAccepted, setIncomingCall, localStream, setRemoteStream, answer)}
                />
            }

            {callAccepted &&
                <CallView localStream={localStream} remoteStream={remoteStream} />
            }

            {goToProfile &&
                <ProfilePage/>}
        </div>
    );
};