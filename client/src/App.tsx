import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { default as WebRTC } from 'simple-peer';
import FadeLoader from "react-spinners/FadeLoader";

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

import pic1 from './images/profilePics/1.svg';
import pic2 from './images/profilePics/2.svg';
import pic3 from './images/profilePics/3.svg';
import pic4 from './images/profilePics/4.svg';


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
        [peer, setPeer]: [Peer, Function] = useState({ number: "", name: "", profilePic: "" }),
        [peerSignal, setPeerSignal] = useState({}),
        [myNode, setMyNode] = useState(new WebRTC()),
        history = useHistory(), // For redirecting user
        [updatedCallEntries, setUpdatedCallEntries] = useState(null);

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

    useEffect(() => {
        if (me !== null) {
            setMe({
                id: me.id,
                firstName: me.firstName,
                lastName: me.lastName,
                phoneNbr: me.phoneNbr,
                contacts: me.contacts,
                profilePic: me.profilePic,
                callEntries: updatedCallEntries
            });
        }
    }, [updatedCallEntries]);

    const profilePic = (picStr: string) => {
        switch (picStr) {
            case "1":
                return pic1;
            case "2":
                return pic2;
            case "3":
                return pic3;
            case "4":
                return pic4;
            default:
                return pic1;
        }
    };

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
        if (me !== null)
            CallRespond(peer, peerSignal, me, setCallAccepted, setIncomingCall, setMyNode, localStream, setRemoteStream, () => redir("/call"), pickUp, hangUp);
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
        setPeer({ id: "", name: "", profilePic: "" });
        CallAbort(peer.number);
    };

    /* Shows loading icon when all react components are loaded in */
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    });

    return (
        <div className="App">
            {incomingCall && !callAccepted &&
                <CallPopup callerName={peer.name} callerPic={peer.profilePic} callRespond={callRespond} profilePic={profilePic} />
            }

            {outgoingCall &&
                <CallingPopup abortCall={abortCall} name={peer.name} pic={peer.profilePic} profilePic={profilePic} />
            }

            {
                loading ?
                    <div className="fade-loader-container">
                        <FadeLoader loading={loading} />
                    </div>
                    :
                    <Switch>
                        <Route path="/" exact render={() => <StartView />} />
                        <Route path="/login" exact render={() => <LoginView me={me} setMe={setMe} listenForCalls={() => ListenForCalls(setIncomingCall, setPeerSignal, setPeer, setUpdatedCallEntries)} />} />
                        <Route path="/dashboard" exact render={() => <Dashboard me={me} setMe={setMe} onCall={callUser} profilePic={profilePic} />} />
                        <Route path="/createaccount" exact render={() => <CreateAccountView setMe={setMe} listenForCalls={() => ListenForCalls(setIncomingCall, setPeerSignal, setPeer, setUpdatedCallEntries)} />} />
                        <Route path="/profile" exact render={() => <ProfileView user={me} profilePic={profilePic} />} />
                        <Route path="/profile/changepicture" exact component={() => <ChangePictureView user={me} profilePic={profilePic} />} />
                        <Route path="/profile/changepassword" exact render={() => <ChangePasswordView me={me} setMe={setMe} updatePassword={updatePassword} />} />
                        <Route path="/profile/changenumber" exact render={() => <ChangeNumberView me={me} setMe={setMe} updateNbr={updateNbr} profilePic={profilePic} />} />
                        <Route path="/profile/changename" exact render={() => <ChangeNameView me={me} setMe={setMe} updateName={updateName} profilePic={profilePic} />} />
                        <Route path="/phonebook" render={() => <PhoneBookView contactList={me === null ? [] : me.contacts} onCall={callUser} setPeer={setPeer} phoneNumber={me === null ? "" : me.phoneNbr} setContactList={setContactList} profilePic={profilePic} />} />
                        <Route path="/call" render={() => <CallView localStream={localStream} remoteStream={remoteStream} endCall={() => CallHangUp(myNode, setRemoteStream, setCallAccepted, setPeer, setPeerSignal, setOutgoingCall, setIncomingCall, () => redir("/dashboard"))} peer={myNode} caller={peer} />} />
                    </Switch>
            }
        </div>
    );
};