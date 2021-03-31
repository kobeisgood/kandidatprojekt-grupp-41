import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { default as WebRTC } from 'simple-peer';

import { User, Peer } from './Types';
import { CallRespond, CallUser, CallAbort, CallHangUp, ListenForCalls } from './Connection';
import { OpenLocalStream } from './StreamCamVideo';
import { ProfileView } from './pages/ProfileView';
import { CallPopup } from './components/CallPopup';
import { CallingPopup } from './components/CallingPopup';
import { LoginView } from './pages/LoginView';
import { StartView } from './pages/StartView';
import { Dahsboard } from './pages/Dashboard';
import { PhoneBookView } from './pages/PhoneBookView';
import { ChangeNameView } from './pages/ChangeNameView';
import { ChangeNumberView } from './pages/ChangeNumberView';
import { ChangePasswordView } from './pages/ChangePasswordView';
import { ChangePictureView } from './pages/ChangePictureView';
import { CallView } from './pages/CallView';

import './App.css';
import './css/fonts.css'
import './css/buttons.css';
import './css/colors.css';


export const App = () => {
    const prevLoginInfo = () => {
        const info = localStorage.getItem("me");

        if (info !== null)
            return JSON.parse(info);
        else
            return null;
    };

    const
        [socket, setSocket]: [SocketIOClient.Socket | null, Function] = useState(null),
        [me, setMe]: [User | null, Function] = useState(prevLoginInfo()),
        [localStream, setLocalStream] = useState(new MediaStream()),
        [remoteStream, setRemoteStream] = useState(new MediaStream()),
        [incomingCall, setIncomingCall] = useState(false),
        [outgoingCall, setOutgoingCall] = useState(false),
        [callAccepted, setCallAccepted] = useState(false),
        [peer, setPeer]: [Peer, Function] = useState({ id: "", name: "" }),
        [peerSignal, setPeerSignal] = useState({}),
        [myNode, setMyNode] = useState(new WebRTC());

    useEffect(() => {
        setMe(prevLoginInfo());
    }, []);

    useEffect(() => {
        localStorage.setItem("me", JSON.stringify(me));
    }, [me]);

    const listenForCalls = (socket: SocketIOClient.Socket) => {
        if (socket !== null) {
            ListenForCalls(socket, setIncomingCall, setPeerSignal, setPeer); // Display incoming calls to user
        }
        else
            void 0;
    };

    const history = useHistory(); // For redirecting user
    const redirToCallView = () => {
        if (history !== undefined)
            history.push("/call");
    };

    const callRespond = (pickUp: boolean) => {
        if (socket !== null) {
            OpenLocalStream(setLocalStream); // Access browser web cam
            CallRespond(socket, peer, peerSignal, setCallAccepted, setIncomingCall, setMyNode, localStream, setRemoteStream, redirToCallView, pickUp);
        } else
            void 0;
    };

    const callUser = (phoneNbr: string) => {
        if (socket !== null && me !== null) {
            OpenLocalStream(setLocalStream); // Access browser web cam
            return CallUser(socket, setOutgoingCall, setCallAccepted, setMyNode, localStream, setRemoteStream, phoneNbr, me.firstName + " " + me.lastName, redirToCallView);
        } else
            return null;
    }

    const abortCall = () => {
        setOutgoingCall(false);
        setCallAccepted(false);
        setPeer({ id: "", name: "" });

        if (socket !== null)
            CallAbort(socket, peer);
    };

    const setPeerName = (newName: string) => {
        setPeer({
            id: peer.id,
            name: newName
        });
    };

    return (
        <div className="App">
            {incomingCall && !callAccepted &&
                <CallPopup callerName={peer.name} callRespond={callRespond} />
            }

            {outgoingCall &&
                <CallingPopup abortCall={abortCall} name={peer.name} />
            }

            <Switch>
                <Route path="/login" exact component={() => {
                    if (prevLoginInfo() === null)
                        return <LoginView socket={socket} setSocket={setSocket} me={me} setMe={setMe} listenForCalls={listenForCalls} />
                    else
                        return <Redirect push to="/dashboard" />
                }} />
                <Route path="/" exact component={() => <StartView />} />
                <Route path="/dashboard" exact component={() => <Dahsboard setMe={setMe} />} />
                <Route path="/profile" exact component={() => <ProfileView user={me} />} />
                <Route path="/profile/changename" exact component={ChangeNameView} />
                <Route path="/profile/changenumber" exact component={ChangeNumberView} />
                <Route path="/profile/changepassword" exact component={ChangePasswordView} />
                <Route path="/profile/changepicture" exact component={ChangePictureView} />
                <Route path="/phonebook" component={() => <PhoneBookView socket={socket} contactList={me === null ? [] : me.contacts} onCall={callUser} setPeerName={setPeerName} />} />
                <Route path="/call" component={() => <CallView localStream={localStream} remoteStream={remoteStream} endCall={() => CallHangUp(myNode)} />} />

                {/* REDIRECTS */}
                {prevLoginInfo() === null && <Redirect push to="/dashboard" />}
            </Switch>
        </div>
    );
};

/*
    useEffect(() => {
        OpenLocalStream(setLocalStream); // Access browser web cam
    }, []);


    /* APP STATES
    const [allUsers, setUsers] = useState([]);

    const [goToProfile, setGoToProfile] = useState(false);
    const [registrationSuccess, setRegistrationSuccess]: [boolean | undefined, (val: boolean) => void] = useState(); */


/* INPUT HANDLERS
const [nameInput, setNameInput] = useState("");
const [roomIdInput, setIdInput] = useState("");
const [firstNameInp, setFirstNameInp] = useState("");
const [lastNameInp, setLastNameInp] = useState("");
const [phoneInp, setPhoneInp] = useState("");
const [passwordInp, setPasswordInp] = useState("");

const handleNameInput = (event: any) => { setNameInput(event.target.value); };
const handleIdInput = (event: any) => { setIdInput(event.target.value); };

const handleFirstNameInp = (event: any) => { setFirstNameInp(event.target.value); };
const handleLastNameInp = (event: any) => { setLastNameInp(event.target.value); };
const handlePhoneInp = (event: any) => { setPhoneInp(event.target.value); };
const handlePasswordInp = (event: any) => { setPasswordInp(event.target.value); }; */


/* HELPER FUNCTIONS
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

const register = () => {
    if (socket === undefined) {
        console.error("Socket is not initialized");
        return;
    }

    const
        parsedNbr = parseInt(phoneInp),
        userId = socket.id;

    Register(
        socket,
        {
            id: userId,
            firstName: firstNameInp,
            lastName: lastNameInp,
            phoneNbr: parsedNbr
        },
        passwordInp,
        setRegistrationSuccess
    );
}; */


/* APP RENDERING
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
            <button onClick={joinLobby}>Anslut till server</button>
        }

        {socket !== undefined &&
            <form onSubmit={(event) => event.preventDefault()}>
                <label>Förnamn:</label><br />
                <input type="text" onChange={handleFirstNameInp} /><br />
                <label>Efternamn:</label><br />
                <input type="text" onChange={handleLastNameInp} /><br />
                <label>Mobilnummer:</label><br />
                <input type="number" onChange={handlePhoneInp} /><br />
                <label>Lösenord:</label><br />
                <input type="password" onChange={handlePasswordInp} /><br />
                <button onClick={() => register()}>Gå vidare</button>
            </form>
        }

        {registrationSuccess &&
            <h3>Användare registrerad!</h3>
        }

        {goToProfile &&
            <ProfileView
                userName={userName}
            />
        }
    </div>
);
}; */