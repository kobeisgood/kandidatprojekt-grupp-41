import io from 'socket.io-client';
import { default as WebRTC } from 'simple-peer';
import { User, Contact, Peer } from './Types';
import { OpenLocalStream } from './StreamCamVideo';


const useHTTPS = false; // Only enable this if you know what it means

/**
 * Makes an attempt to login. 
 * 
 * @param phone The specified user phone number
 * @param psw The specified user password
 * @returns The socket representing the connection between client and server
 */
export const Login = (phone: string, psw: string, setMe: Function, redirect: Function, listenForCalls: Function) => {
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
            redirect(); // Redirect to dashboard and listen for calls
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
 * NOT USED ATM
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
    })
}

/*
export const JoinRoom = (
    socket: SocketIOClient.Socket,
    roomId: string,
    setUserList: Function,
    setIncomingCall: Function,
    setCallerSignal: Function,
    setCallerName: Function
) => {
    socket.emit('join-room', roomId);
    socket.on('join-response', (userList?: User[]) => {
        if (userList !== undefined) {
            console.log('Connected to room ' + roomId);
            setUserList(userList);
            LookForUsers(socket, setUserList); // Notify user when others connect
            ListenForCalls(socket, setIncomingCall, setCallerSignal, setCallerName); // Display ncoming calls to user
        } else {
            console.log('Could not connect to room!');
        }
    })
};
*/

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

const LookForUsers = (socket: SocketIOClient.Socket, setUserList: Function) => {
    socket.on('user-connected', (userName: string, userList: User[]) => {
        console.log(userName + ' joined the room.');
        setUserList(userList);
    });

    socket.on('user-disconnected', (userName: string, userList: User[]) => {
        console.log(userName + ' left the room.');
        setUserList(userList);
    });
};

export const ListenForCalls = (
    socket: SocketIOClient.Socket,
    setIncomingCall: Function,
    setCallerSignal: Function,
    setPeer: Function,
    setLocalStream: Function
) => {
    socket.on('user-calling', (data: any) => {
        /*OpenLocalStream() // Access browser web cam
            .then((stream: MediaStream) => {
                setLocalStream(stream);
                setIncomingCall(true);
                setCallerSignal(data.signalData);
                setPeer({ id: data.caller, name: data.callerName });
            });*/

        setIncomingCall(true);
        setCallerSignal(data.signalData);
        setPeer({ id: data.caller, name: data.callerName });
    });

    socket.on('call-aborted', () => {
        console.log("Samtal avbrutet");

        setIncomingCall(false);
        setCallerSignal({});
        setPeer({ id: "", name: "" });
    });
};

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
    answer: boolean
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
            socket.emit('accept-call', { signalData: signal, caller: caller.id });
            redir(); // Redirect to call view
        } else {
            socket.emit('decline-call', { caller: caller.id });
            return;
        }
    });

    peer.on('stream', stream => {
        console.log("Received stream!");
        console.log(stream);
        
        setRemoteVideoStream(stream);
    });

    peer.on('close', () => {
        console.log("You closed the connection!");
        setCallAccepted(false);
        peer.destroy();
    });

    peer.signal(callerSignal); // Accept caller's signal
};

export const CallUser = (
    socket: SocketIOClient.Socket,
    setOutgoingCall: Function,
    setCallAccepted: Function,
    setMyNode: Function,
    localStream: MediaStream,
    setRemoteStream: Function,
    calleeNbr: string,
    callerName: string,
    redir: Function
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
        socket.emit('call-user', { calleeNbr: calleeNbr, signalData: signal, caller: socket.id, callerName: callerName });
    });

    peer.on('stream', stream => {
        console.log("Received stream!");
        setRemoteStream(stream);
    });

    peer.on('close', () => {
        console.log("Peer closed the connection!");
        setCallAccepted(false);
        peer.destroy();
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
export const CallAbort = (socket: SocketIOClient.Socket, callee: Peer) => {
    console.log("Aborting call");

    socket.emit('abort-call', callee);
};

/**
 * Ends and ongoing call by destroying the node (the SimplePeer instance).
 * 
 * @param myNode The SimplePeer instance create in prior
 */
export const CallHangUp = (myNode: WebRTC.Instance) => {
    myNode.destroy();
};