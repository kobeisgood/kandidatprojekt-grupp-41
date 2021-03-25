import { useEffect, useState, useRef, Component } from 'react';
import Peer from 'simple-peer';

import { User } from './Types';
import { Login, JoinRoom, CallRespond, CallUser, CallAbort, CallHangUp, Register } from './Connection';
import { OpenLocalStream } from './StreamCamVideo';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { CallView } from './pages/CallView';
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

import './App.css';
import './css/fonts.css'


export const App = () => {
    const prevLoginInfo = () => {
        const info = localStorage.getItem("me");

        if (info !== null)
            return JSON.parse(info);
        else
            return null;
    };

    const
        [socket, setSocket] = useState(null),
        [me, setMe]: [User | null, Function] = useState(prevLoginInfo());

    useEffect(() => {
        setMe(prevLoginInfo());
    }, []);

    useEffect(() => {
        localStorage.setItem("me", JSON.stringify(me));
    }, [me]);

    return (
        <div className="App">
            <Router>
                <Switch>
                     <Route path="/login" exact component={() => {
                        if (prevLoginInfo() === null)
                            return <LoginView socket={socket} setSocket={setSocket} me={me} setMe={setMe} />
                        else
                            return <Redirect push to="/dashboard" />
                    }} /> 
                    <Route path="/" exact component={() => <StartView/>} />
                    <Route path="/dashboard" exact component={() => <Dahsboard setMe={setMe} />} />
                    <Route path="/profile" exact component={() => <ProfileView user={me} />} />
                    <Route path="/profile/changename" exact component={ChangeNameView} />
                    <Route path="/profile/changenumber" exact component={ChangeNumberView} />
                    <Route path="/profile/changepassword" exact component={ChangePasswordView} />
                    <Route path="/phonebook" component={() => <PhoneBookView contactList={me === null ? [] : me.contacts} />} />

                    {prevLoginInfo() === null &&
                        <Redirect push to="/dashboard" />
                    }
                </Switch>
            </Router>
        </div>
    );
};

/*
    useEffect(() => {
        OpenLocalStream(setLocalStream); // Access browser web cam
    }, []);


    /* APP STATES
    const [allUsers, setUsers] = useState([]);
    const [localStream, setLocalStream] = useState(new MediaStream());
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [outgoingCall, setOutgoingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [peer, setPeer]: [User, Function] = useState({ id: "", firstName: "", lastName: "", phoneNbr: 0 });
    const [myNode, setMyNode] = useState(new Peer());
    const [peerSignal, setPeerSignal] = useState({});
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