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
import { Dashboard } from './pages/Dashboard';
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
        [peer, setPeer]: [Peer, Function] = useState({ number: "", name: "" }),
        [peerSignal, setPeerSignal] = useState({}),
        [myNode, setMyNode] = useState(new WebRTC());

    useEffect(() => {
        OpenLocalStream()
            .then((stream: MediaStream) => {
                setLocalStream(stream)
            }); // Access browser web cam
    }, []);

    useEffect(() => {
        setMe(prevLoginInfo());
    }, []);

    useEffect(() => {
        localStorage.setItem("me", JSON.stringify(me));
    }, [me]);

    const listenForCalls = (socket: SocketIOClient.Socket) => {
        if (socket !== null)
            ListenForCalls(socket, setIncomingCall, setPeerSignal, setPeer); // Display incoming calls to user
    };

    const history = useHistory(); // For redirecting user
    const redir = (path: string) => {
        if (history !== undefined)
            history.push(path);
    };

    const hangUp = (peer: WebRTC.Instance) => {
        CallHangUp(peer, setRemoteStream, setCallAccepted, setPeer, setPeerSignal, setOutgoingCall, setIncomingCall, () => redir("/dashboard"));
    };

    const callRespond = (pickUp: boolean) => {
        if (socket !== null)
            CallRespond(socket, peer, peerSignal, setCallAccepted, setIncomingCall, setMyNode, localStream, setRemoteStream, () => redir("/call"), pickUp, hangUp);
    };

    const callUser = (phoneNbr: string) => {
        if (socket !== null && me !== null) {               
            return CallUser(socket, setOutgoingCall, setCallAccepted, setMyNode, localStream, setRemoteStream, phoneNbr, me, () => redir("/call"), hangUp);
        } else
            return null;
    }   

    const abortCall = () => {
        setOutgoingCall(false);
        setCallAccepted(false);
        setPeer({ id: "", name: "" });

        if (socket !== null)
            CallAbort(socket, peer.number);
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
                <Route path="/dashboard" exact component={() => <Dashboard setMe={setMe} user={me} />} />
                <Route path="/profile" exact component={() => <ProfileView user={me} />} />
                <Route path="/profile/changename" exact component={() => <ChangeNameView user={me} />} />
                <Route path="/profile/changenumber" exact component={() => <ChangeNumberView user={me} />} />
                <Route path="/profile/changepassword" exact component={ChangePasswordView} />
                <Route path="/profile/changepicture" exact component={ChangePictureView} />
                <Route path="/phonebook" component={() => <PhoneBookView socket={socket} contactList={me === null ? [] : me.contacts} onCall={callUser} setPeer={setPeer} />} />
                <Route path="/call" component={() => <CallView localStream={localStream} remoteStream={remoteStream} endCall={() => CallHangUp(myNode, setRemoteStream, setCallAccepted, setPeer, setPeerSignal, setOutgoingCall, setIncomingCall, () => redir("/dashboard"))} />} />

                {/* REDIRECTS */}
                {prevLoginInfo() === null && <Redirect push to="/dashboard" />}
            </Switch>
        </div>
    );
};