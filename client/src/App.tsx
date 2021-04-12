import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { default as WebRTC } from 'simple-peer';

import { socket } from './Connection';
import { User, Peer, Contact } from './Types';
import { CallRespond, CallUser, CallAbort, CallHangUp, ListenForCalls, UpdateName, UpdateNbr, UpdatePassword } from './Connection';
import { OpenLocalStream } from './StreamCamVideo';
import { CallPopup } from './components/CallPopup';
import { CallingPopup } from './components/CallingPopup';
import { LoginView } from './pages/LoginView';
import { StartView } from './pages/StartView';
import { CreateAccountView } from './pages/CreateAccountView';
import { Dashboard } from './pages/Dashboard';
import { PhoneBookView } from './pages/PhoneBookView';
import { ProfileView } from './pages/ProfileView';
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
        [me, setMe]: [User | null, Function] = useState(prevLoginInfo()),
        [localStream, setLocalStream] = useState(new MediaStream()),
        [remoteStream, setRemoteStream] = useState(new MediaStream()),
        [incomingCall, setIncomingCall] = useState(false),
        [outgoingCall, setOutgoingCall] = useState(false),
        [callAccepted, setCallAccepted] = useState(false),
        [peer, setPeer]: [Peer, Function] = useState({ number: "", name: "" }),
        [peerSignal, setPeerSignal] = useState({}),
        [myNode, setMyNode] = useState(new WebRTC()),
        history = useHistory(); // For redirecting user

    useEffect(() => {
        OpenLocalStream()
            .then((stream: MediaStream) => {
                setLocalStream(stream)
            }); // Access browser web cam

        window.onbeforeunload = (event: any) => {
            const e = event || window.event;
            // Cancel the event
            e.preventDefault();
            if (e)
                e.returnValue = ''; // Legacy method for cross browser support

            return ''; // Legacy method for cross browser support
        };

        setMe(prevLoginInfo());
    }, []);

    useEffect(() => {
        localStorage.setItem("me", JSON.stringify(me));
    }, [me]);

    const updateName = (firstName: string, lastName: string, setName: Function, setNameChanged: Function) => {
        if (socket !== null && me !== null)
            UpdateName(me.phoneNbr, firstName, lastName, setName, setNameChanged);
    };
    const updateNbr = (number: string, setNbr: Function, setNumberChanged: Function) => {
        if (socket !== null && me !== null)
            UpdateNbr(me.phoneNbr, number, setNbr, setNumberChanged);
    };

    const updatePassword = (oldPassword: string, newPassword: string, setPasswordChanged: Function) => {
        if (socket !== null && me !== null)
            UpdatePassword(me.phoneNbr, oldPassword, newPassword, setPasswordChanged);
    };

    const setContactList = (contactList: Contact[]) => {
        if (me !== null)
            setMe({
                id: me.id,
                firstName: me.firstName,
                lastName: me.lastName,
                phoneNbr: me.phoneNbr,
                contacts: contactList,
                profilePic: me.profilePic,
                callEntries: me.callEntries
            })
    };

    const redir = (path: string) => {
        if (history !== undefined)
            history.push(path);
    };

    const hangUp = (peer: WebRTC.Instance) => {
        CallHangUp(peer, setRemoteStream, setCallAccepted, setPeer, setPeerSignal, setOutgoingCall, setIncomingCall, () => redir("/dashboard"));
    };

    const callRespond = (pickUp: boolean) => {
        CallRespond(peer, peerSignal, setCallAccepted, setIncomingCall, setMyNode, localStream, setRemoteStream, () => redir("/call"), pickUp, hangUp);
    };

    const callUser = (phoneNbr: string) => {
        if (me !== null)
            return CallUser(setOutgoingCall, setCallAccepted, setMyNode, localStream, setRemoteStream, phoneNbr, me, () => redir("/call"), hangUp);
        else
            return null;
    };

    const abortCall = () => {
        setOutgoingCall(false);
        setCallAccepted(false);
        setPeer({ id: "", name: "" });
        CallAbort(peer.number);
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
                <Route path="/login" exact render={() => {
                    if (prevLoginInfo() === null)
                        return <LoginView me={me} setMe={setMe} listenForCalls={() => ListenForCalls(setIncomingCall, setPeerSignal, setPeer)} />
                    else
                        return <Redirect push to="/dashboard" />
                }} />
                <Route path="/" exact render={() => <StartView />} />
                <Route path="/dashboard" exact render={() => <Dashboard me={me} setMe={setMe} onCall={callUser} />} />
                <Route path="/createaccount" exact render={() => <CreateAccountView/>} />
                <Route path="/profile" exact render={() => <ProfileView user={me} />} />
                <Route path="/profile/changepicture" exact component={ChangePictureView} />
                <Route path="/profile/changepassword" exact render={() => <ChangePasswordView me={me} setMe={setMe} updatePassword={updatePassword} />} />
                <Route path="/profile/changenumber" exact render={() => <ChangeNumberView me={me} setMe={setMe} updateNbr={updateNbr} />} />
                <Route path="/profile/changename" exact render={() => <ChangeNameView me={me} setMe={setMe} updateName={updateName} />} />
                <Route path="/phonebook" render={() => <PhoneBookView contactList={me === null ? [] : me.contacts} onCall={callUser} setPeer={setPeer} phoneNumber={me === null ? "" : me.phoneNbr} setContactList={setContactList} />} />
                <Route path="/call" render={() => <CallView localStream={localStream} remoteStream={remoteStream} endCall={() => CallHangUp(myNode, setRemoteStream, setCallAccepted, setPeer, setPeerSignal, setOutgoingCall, setIncomingCall, () => redir("/dashboard"))} peer={myNode} caller={peer}/>} />

                {/* REDIRECTS */}
                {prevLoginInfo() === null && <Redirect push to="/dashboard" />}
            </Switch>
        </div>
    );
};