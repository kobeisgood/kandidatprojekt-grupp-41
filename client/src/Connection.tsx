import { io } from "socket.io-client";
import { default as WebRTC } from 'simple-peer';
import { User, Contact, Peer, PhoneNbr } from './Types';

export let socket: any; // The socket representing the connection between the client and the server
const
    useHTTPS = false,
    serverUrl = "localhost",
    serverPort = 4000;

/**
 * Makes an attempt to login. 
 * 
 * @param phone The specified user phone number
 * @param psw The specified user password
 * @returns The socket representing the connection between client and server
 */
export const Login = (
    phone: string,
    psw: string,
    setMe: Function,
    setLoading: Function,
    listenForCalls: Function
) => {
    if (socket === undefined) // If socket not already set by register
        if (useHTTPS)
            socket = io('https://' + serverUrl + ':' + serverPort);
        else
            socket = io('http://' + serverUrl + ':' + serverPort);

    socket.emit('login-user', phone, psw); // Send login request to server

    setLoading(true);

    socket.once('login-response', (user: User) => { // Begin listening for server response
        if (user !== null) {
            console.log("Logged in successfully!");
            setMe(user);
            listenForCalls(); // Register call listeners
            setLoading(false);
        } else {
            console.log("Failed to log in!");
            setLoading(false);
        }
    });
};

export const Reconnect = (
    phoneNbr: PhoneNbr,
    listenForCalls: Function,
    callback: Function
) => {
    if (socket === undefined) // If socket not already set by register
        if (useHTTPS)
            socket = io('https://' + serverUrl + ':' + serverPort);
        else
            socket = io('http://' + serverUrl + ':' + serverPort);

    socket.emit('reconnect-user', phoneNbr);
    socket.once('reconnect-response', (result: boolean) => {
        callback(result);
        listenForCalls(); // Re-register call listeners
    });
};

export const Logout = (
    phone: PhoneNbr,
    andThen: Function
) => {
    socket.emit('logout-user', phone); // Send logout request to server
    socket.once('logout-response', (result: boolean) => {
        if (result)
            console.log("Logout successful!");
        else
            console.log("Logout failed!");

        andThen();
    });
};

export const Register = (
    user: User,
    psw: string,
    callback: Function
) => {
    if (socket === undefined) // If socket not already set by login
        if (useHTTPS)
            socket = io('https://' + serverUrl + ':' + serverPort);
        else
            socket = io('http://' + serverUrl + ':' + serverPort);

    socket.emit('register-user', user, psw);
    socket.on('registration-result', (result: boolean) => {
        if (result) {
            console.log("User was added!");
            callback();
        } else
            console.error("User could not be added!");
    });
};

/**
 * OBS: NOT USED ATM
 * 
 * Searches for the existence of a user in the db given a phone number
 * 
 * @param phoneNumber The specified user phone number
 * @param setContactExists Function that sets the boolean result 
 */
export const FindContactNumber = (
    phoneNumber: string,
    setContactExists: Function
) => {
    socket.emit('find-contact-number', phoneNumber);
    socket.on('number-found', () => {
        setContactExists(true);
    });

    socket.on('number-not-found', () => {
        setContactExists(false);
    })
};

/**
 * Retrieves information that the update of name is successful or not. 
 * 
 * @param phoneNbr 
 * @param firstName 
 * @param lastName 
 * @param setName 
 */
export const UpdateName = (
    phoneNbr: string,
    firstName: string,
    lastName: string,
    setName: Function,
    setNameChanged: Function
) => {
    socket.emit('update-name', { phoneNbr: phoneNbr, firstName: firstName, lastName: lastName });
    socket.on('update-name-result', (result: boolean) => {
        if (result) {
            setName(firstName, lastName);
            setNameChanged(true);
        } else
            console.error("Name update unsuccessful");
    });
};
/**
 * Retrieves information that the update of number is successful or not. 
 * 
 * @param oldNbr 
 * @param newNbr 
 * @param setNbr 
 */
export const UpdateNbr = (
    oldNbr: string,
    newNbr: string,
    setNbr: Function,
    setNumberChanged: Function
) => {
    socket.emit('update-nbr', { phoneNbr: oldNbr, newNbr: newNbr });
    socket.on('update-nbr-result', (result: boolean) => {
        if (result) {
            setNbr(newNbr);
            setNumberChanged(true);
        } else
            console.error("Number update unsuccessful");
    });
};

/**
 * Retrieves information that the update of password is successful or not. 
 * 
 * @param phoneNbr 
 * @param oldPassword 
 * @param newPassword 
 * @param setPasswordChanged 
 */
export const UpdatePassword = (
    phoneNbr: string,
    oldPassword: string,
    newPassword: string,
    setPasswordChanged: Function
) => {
    socket.emit('update-password', { phoneNbr: phoneNbr, oldPassword: oldPassword, newPassword: newPassword });
    socket.on('update-password-result', (result: boolean) => {
        if (result)
            setPasswordChanged(true);
        else
            console.error("Password update unsuccessful");
    });
};

/**
 * Retrieves a user from the db given a phone number 
 * 
 * @param phoneNumber The specified user phone number 
 * @param setFoundContact Function that sets the contact found 
 */
export const GetSearchedContact = (
    phoneNumber: string,
    setFoundContact: Function
) => {
    socket.emit('get-searched-contact', phoneNumber);
    socket.on('got-contact', (contact: Contact) => {
        setFoundContact(contact)
    })
}

/**
 * Adds a contact to a specified user in db
 * 
 * @param contact Contact that has been searched for
 * @param loggedInUserNumber The number of the logged in user
 * @param setContactList Function that sets the contact list from the db to frontend 
 */
export const AddFoundContact = (
    contact: Contact,
    loggedInUserNumber: string,
    setContactList: Function
) => {
    socket.emit('add-searched-contact', contact, loggedInUserNumber);
    socket.once('contact-added', (realUpdatedContactList: Contact[]) => {
        setContactList(realUpdatedContactList)
    })
}

/**
 * 
 * @param contact Contact to be removed
 * @param loggedInUserNumber The number of the logged in user
 * @param setContactList Function that sets the contact list from the db to frontend 
 */
export const RemoveFoundContact = (
    contact: Contact,
    loggedInUserNumber: string,
    setContactList: Function
) => {
    socket.emit('remove-searched-contact', contact, loggedInUserNumber);
    socket.once('contact-removed', (realUpdatedContactList: Contact[]) => {
        setContactList(realUpdatedContactList)
    })
};

export const RequestUserList = (
    update: Function
) => {
    socket.emit('request-userList');
    socket.on('receive-userList', (userList?: User[]) => {
        if (userList !== undefined) {
            console.log("Received user list:");
            update(userList);
        } else {
            console.log("Could not receive user list!");
        }
    });
};

/**
 * 
 * @param setIncomingCall A setter for the incomingCall state
 * @param setCallerSignal A setter for the callAccepted state
 * @param setPeer A setter for the peer state
 */
export const ListenForCalls = (
    setIncomingCall: Function,
    setCallerSignal: Function,
    setPeer: Function,
    setCallEntries: Function
) => {
    socket.on('user-calling', (data: any) => {
        console.log("Receiving call!");
        setIncomingCall(true);
        setCallerSignal(data.signalData);
        setPeer({ number: data.caller, name: data.callerName, profilePic: data.profilePic });
    });

    socket.on('call-aborted', () => {
        setIncomingCall(false);
        setCallerSignal({});
        setPeer({ number: "", name: "", profilePic: "" });
    });

    socket.on('updated-call-entries', (callEntries: any) => {
        setCallEntries(callEntries);
    });
};

/**
 * Responds to an incoming call.
 * 
 * @param caller The user calling us
 * @param callerSignal The signal of the user calling us
 * @param setCallAccepted A setter for the callAccepted state
 * @param setIncomingCall A setter for the incomingCall state
 * @param setMyNode A setter for the myNode state
 * @param localStream This client's video and audio stream
 * @param setRemoteVideoStream A setter for the remoteStream state
 * @param redir A function for redirecting the user to the correct view
 * @param answer A boolean indicating if we accept the call
 * @param hangUp A function for ending the call
 */
export const CallRespond = (
    caller: Peer,
    callerSignal: WebRTC.SignalData,
    me: User,
    setCallAccepted: Function,
    setIncomingCall: Function,
    setMyNode: Function,
    localStream: MediaStream,
    setRemoteVideoStream: Function,
    redir: Function,
    answer: boolean,
    hangUp: Function
) => {
    setCallAccepted(answer);
    setIncomingCall(false);

    const peer = new WebRTC({
        initiator: false, // User is receiver of call
        trickle: false,
        stream: localStream,
    });
    setMyNode(peer);

    peer.on('signal', signal => { // Everytime we create a peer, it signals, meaning this triggers immediately
        if (answer) {
            console.log("Accepting call");
            socket.emit('accept-call', { signalData: signal, caller: caller.number, callee: me.phoneNbr });
            redir(); // Redirect to call view
        } else {
            console.log("Declining");
            socket.emit('decline-call', { caller: caller.number });
            return;
        }
    });

    peer.on('stream', stream => {
        setRemoteVideoStream(stream);
    });

    peer.on('close', () => {
        console.log("You closed the connection!");
        setCallAccepted(false);
        peer.destroy();
        hangUp(peer);
    });

    peer.signal(callerSignal); // Accept caller's signal
};

/**
 * Calls another user.
 * 
 * @param setOutgoingCall A setter for the outgoingCall state
 * @param setCallAccepted A setter for the callAccepted state
 * @param setMyNode A setter for the myNode state
 * @param localStream This client's video and audio stream
 * @param setRemoteStream A setter for the remoteStream state
 * @param calleeNbr The number of the user we are calling
 * @param me This client's user object
 * @param redir A function for redirecting the user to the correct view
 * @param hangUp A function for ending the call
 */
export const CallUser = (
    setOutgoingCall: Function,
    setCallAccepted: Function,
    setMyNode: Function,
    localStream: MediaStream,
    setRemoteStream: Function,
    calleeNbr: string,
    me: User,
    redir: Function,
    hangUp: Function
) => {
    const peer = new WebRTC({
        initiator: true, // User is initiator of the call
        trickle: false,
        stream: localStream
    });
    setMyNode(peer);

    // Beginning of handshake roundtrip
    peer.on('signal', signal => { // Everytime we create a peer, it signals, meaning this triggers immediately
        setOutgoingCall(true);
        socket.emit('call-user', { callee: calleeNbr, signalData: signal, caller: me.phoneNbr, callerName: me.firstName + " " + me.lastName, profilePic: me.profilePic });
        console.log("Initiating call to other user...");
    });

    peer.on('stream', stream => {
        console.log("Received stream!");
        setRemoteStream(stream);
    });

    peer.on('close', () => {
        console.log("Peer closed the connection!");
        setCallAccepted(false);
        peer.destroy();
        hangUp(peer);
    });

    socket.once('call-accepted', (signalData: WebRTC.SignalData) => {
        setOutgoingCall(false);
        setCallAccepted(true);

        peer.signal(signalData); // Accept returnning callee signal

        redir(); // Redirect to call view
    });

    socket.once('call-declined', () => {
        setOutgoingCall(false);
        console.log("User declined your call!");
    });
};

/**
 * Aborts an outgoing call (before it's accepted by the peer).
 * 
 * @param callee The callee's name
 */
export const CallAbort = (
    calleeNbr: string
) => {
    socket.emit('abort-call', calleeNbr);
};

/**
 * Ends and ongoing call by destroying the node (the SimplePeer instance).
 * 
 * @param myNode The SimplePeer instance create in prior
 * @param setRemoteStream A setter for the remoteStream state
 * @param setCallAccepted A setter for the callAccepted state
 * @param setPeer A setter for the peer state
 * @param setPeerSignal A setter for the peerSignal state
 * @param setOutgoingCall A setter for the outgoingCall state
 * @param setIncomingCall A setter for the incomingCall state
 * @param redir A function for redirecting the user to the correct view
 */
export const CallHangUp = (
    myNode: WebRTC.Instance,
    setRemoteStream: Function,
    setCallAccepted: Function,
    setPeer: Function,
    setPeerSignal: Function,
    setOutgoingCall: Function,
    setIncomingCall: Function,
    redir: Function
) => {
    setCallAccepted(false);
    setPeer({ number: "", name: "", profilePic: "" });
    setPeerSignal({});
    setOutgoingCall(false);
    setIncomingCall(false);
    setRemoteStream(new MediaStream());
    myNode.destroy();
    redir();
};