import { useEffect, useState } from 'react';
import Peer from 'simple-peer';

import './App.css';

import { User } from './Types';
import { OpenConnection, JoinRoom, CallRespond, CallUser, CallAbort, CallHangUp } from './Connection';
import { OpenLocalStream } from './StreamCamVideo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import './css/fonts.css'
import { CallView } from './pages/CallView';
import { ProfileView } from './pages/ProfileView';
import { CallPopup } from './components/CallPopup';
import { CallingPopup } from './components/CallingPopup';
import { StartView } from './pages/StartView';
import { PhoneBookView } from './pages/PhoneBookView';


let socket: SocketIOClient.Socket;

export const App = () => {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={StartView} />
                    <Route path="/profile" exact component={() => <ProfileView user={{ id: "", firstName: "", lastName: ""}} />} />
                    <Route path="/phonebook" component={PhoneBookView}/>
                </Switch>
            </Router>
        </div>
    );
};

/*

    useEffect(() => {
        OpenLocalStream(setLocalStream); // Access browser web cam
    }, []);

    const [nameInput, setNameInput] = useState("");
    const [roomIdInput, setIdInput] = useState("");
    const [allUsers, setUsers] = useState([]);
    const [localStream, setLocalStream] = useState(new MediaStream());
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [outgoingCall, setOutgoingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [peer, setPeer]: [User, Function] = useState({ id: "", firstName: "", lastName: "" });
    const [myNode, setMyNode] = useState(new Peer());
    const [peerSignal, setPeerSignal] = useState({});
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
            JoinRoom(socket, "lobby", setUsers, setIncomingCall, setPeerSignal, setPeer);
            setUserName(nameInput);
        } else {
            console.log("Already connected to server!");
        }
    };

    const joinRoom = () => {
        JoinRoom(socket, roomIdInput, setUsers, setIncomingCall, setPeerSignal, setPeer);
    };

    const abortCall = () => {
        setOutgoingCall(false);
        setCallAccepted(false);
        setPeer({ id: "", name: "" });

        CallAbort(socket, peer);
    };

    const endCall = () => {
        CallHangUp(myNode);
    };

    return (
        <div className="App">
            <PhoneBookView />
            {socket === undefined &&
                <>
                    <input type="text" onChange={handleNameInput} placeholder="Ditt namn..." />
                    <button onClick={joinLobby}>Logga in</button>
                </>
            }

            {/*
            <input type="text" onChange={handleIdInput} placeholder="Rum-ID..." />
            <button onClick={joinRoom}>Gå med i rum</button>
        }

            {!callAccepted &&
                <>
                    <h3>Inloggade användare:</h3>
                    <ul>
                        {allUsers.map((user: User) =>
                            <li key={user.id}>
                                {user.firstName + " " + user.lastName}
                                {user.id !== socket.id &&
                                    <button onClick={() => {
                                        CallUser(socket, user.id, setOutgoingCall, setCallAccepted, setMyNode, localStream, setRemoteStream);
                                        setPeer(user);
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
                <CallingPopup abortCall={abortCall} />
            }

            {incomingCall && !callAccepted &&
                <CallPopup
                    callerName={peer.firstName + " " + peer.lastName}
                    callRespond={(answer: boolean) => CallRespond(socket, peer, peerSignal, setCallAccepted, setIncomingCall, setMyNode, localStream, setRemoteStream, answer)}
                />
            }

            {callAccepted &&
                <CallView localStream={localStream} remoteStream={remoteStream} endCall={endCall} />
            }

            {goToProfile &&
                <ProfileView 
                    userName={userName}
                />
            }
        </div>
    );
};*/