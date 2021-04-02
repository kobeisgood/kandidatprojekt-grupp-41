import io from 'socket.io-client';
import { default as WebRTC } from 'simple-peer';
import { User, Contact, Peer } from './Types';


const useHTTPS = false; // Only enable this if you know what it means

/**
 * Makes an attempt to login. 
 * 
 * @param phone The specified user phone number
 * @param psw The specified user password
 * @returns The socket representing the connection between client and server
 */
export const Login = (phone: string, psw: string, setMe: Function, redir: Function, listenForCalls: Function) => {
    let socket: SocketIOClient.Socket;

    if (useHTTPS)
        socket = io.connect('https://localhost:4000');
    else
        socket = io.connect('http://localhost:4000');

    socket.emit('login-user', phone, psw); // Send login request to server

    socket.once('login-response', (user: User) => { // Begin listening for server response
        if (user !== null) {
            console.log("Logged in successfully!");
            setMe(user);
            redir(); // Redirect to dashboard and listen for calls
            listenForCalls(socket);
        } else
            console.log("Failed to log in!");
    });

    return socket;
};

export const Logout = (socket: SocketIOClient.Socket) => {
    socket.off('user-connected');
};

export const Register = (socket: SocketIOClient.Socket, user: User, psw: string, callback: (result: boolean) => void) => {
    socket.emit('register-user', user, psw);
    socket.on('registration-result', (result: boolean) => {
        if (result)
            console.log("User was added!");
        else
            console.error("User could not be added!");

        callback(result);
    });
};

/**
 * OBS: NOT USED ATM
 * 
 * Searches for the existence of a user in the db given a phone number
 * 
 * @param socket From SocketIOClient.Socket
 * @param phoneNumber The specified user phone number
 * @param setContactExists Function that sets the boolean result 
 */
export const FindContactNumber = (
    socket: SocketIOClient.Socket,
    phoneNumber: string,
    setContactExists: Function
) => {
    socket.emit('find-contact-number', phoneNumber);
    socket.on('number-found', () => {
        setContactExists(true);
    })
    socket.on('number-not-found', () => {
        setContactExists(false);
    })
}

/**
 * Retrieves a user from the db given a phone number 
 * 
 * @param socket From SocketIOClient.Socket
 * @param phoneNumber The specified user phone number 
 * @param setFoundContact Function that sets the contact found 
 */
export const GetSearchedContact = (socket: SocketIOClient.Socket, phoneNumber: string, setFoundContact: Function) => {
    socket.emit('get-searched-contact', phoneNumber);
    socket.on('got-contact', (contact: Contact) => {
        setFoundContact(contact)
        console.log(contact)
    } )
}

/**
 * Adds a contact to a specified user in db
 * 
 * @param socket From SocketIOClient.Socket
 * @param contact Contact that has been searched for
 * @param contactList The current list of the logged in users contacts
 * @param loggedInUserNumber The number of the logged in user 
 */
export const AddFoundContact = 
    (
    socket:SocketIOClient.Socket, 
    contact:Contact, 
    contactList:Contact[], 
    loggedInUserNumber:string,
    setContactList:Function
    ) => 
    {
    socket.emit('add-searched-contact', contact, loggedInUserNumber);
    socket.once('contact-added', () => {
        contactList.push(contact) // TODO contact added on frontend even though its not added in db
        setContactList(contactList)
        console.log(contactList)
    })
}

export const RemoveFoundContact = 
    (
    socket:SocketIOClient.Socket, 
    contact:Contact, 
    contactList:Contact[], 
    loggedInUserNumber:string,
    setContactList:Function
    ) => 
    {
    socket.emit('remove-searched-contact', contact, loggedInUserNumber);
    socket.once('contact-removed', () => {
        var indexToRemove = contactList.indexOf(contact)
        if (indexToRemove > -1) {
            contactList.splice(indexToRemove, 1);
        } else {
            console.log("Tried to remove who does not exist?!");
        }
        setContactList(contactList)
        console.log(contactList)
    })
}

export const RequestUserList = (socket: SocketIOClient.Socket, update: Function) => {
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
 * @param socket This client's socket
 * @param setIncomingCall A setter for the incomingCall state
 * @param setCallerSignal A setter for the callAccepted state
 * @param setPeer A setter for the peer state
 */
export const ListenForCalls = (
    socket: SocketIOClient.Socket,
    setIncomingCall: Function,
    setCallerSignal: Function,
    setPeer: Function
) => {
    socket.on('user-calling', (data: any) => {
        setIncomingCall(true);
        setCallerSignal(data.signalData);
        setPeer({ number: data.caller, name: data.callerName });
    });

    socket.on('call-aborted', () => {
        console.log("Samtal avbrutet");
        setIncomingCall(false);
        setCallerSignal({});
        setPeer({ number: "", name: "" });
    });
};

/**
 * Responds to an incoming call.
 * 
 * @param socket This client's socket
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
    socket: SocketIOClient.Socket,
    caller: Peer,
    callerSignal: WebRTC.SignalData,
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
            socket.emit('accept-call', { signalData: signal, caller: caller.number });
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
 * @param socket This client's socket
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
    socket: SocketIOClient.Socket,
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
        socket.emit('call-user', { callee: calleeNbr, signalData: signal, caller: me.phoneNbr, callerName: me.firstName + " " + me.lastName });
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
 * @param socket This client's socket
 * @param callee The callee's name
 */
export const CallAbort = (
    socket: SocketIOClient.Socket,
    calleeNbr: string
) => {
    console.log("Call abort (client side)");
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
    setPeer({ number: "", name: ""});
    setPeerSignal({});
    setOutgoingCall(false);
    setIncomingCall(false);
    setRemoteStream(new MediaStream());
    myNode.destroy();
    redir();
};