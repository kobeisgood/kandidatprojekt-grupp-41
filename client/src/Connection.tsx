import io from 'socket.io-client';
import Peer from 'simple-peer';
import { UserID, UserName, User } from './Types';

const useHTTPS = false; // Only enable this if you know what it means

export const OpenConnection = (userName: string) => {
    let socket: SocketIOClient.Socket;

    if (useHTTPS)
        socket = io.connect('https://localhost:4000');
    else
        socket = io.connect('http://localhost:4000');

    socket.emit('first-connection', userName);
    socket.on('connect-response', (response: boolean) => {
        if (response) {
            console.log("Conected to server!");
        } else {
            console.log("Could not connect to server!");
            return null;
        }

        socket.off('connect-response'); // Stop listening
    });

    return socket;
};

export const CloseConnection = (socket: SocketIOClient.Socket) => {
    socket.off('user-connected');
};

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
    socket.on('user-connected', (user: UserName, userList: User[]) => {
        console.log(user + ' joined the room.');
        setUserList(userList);
    });

    socket.on('user-disconnected', (user: UserName, userList: User[]) => {
        console.log(user + ' left the room.');
        setUserList(userList);
    });
};

const ListenForCalls = (
    socket: SocketIOClient.Socket,
    setIncomingCall: Function,
    setCallerSignal: Function,
    setCaller: Function
) => {
    socket.on('user-calling', (data: any) => {
        setIncomingCall(true);
        setCallerSignal(data.signalData);
        setCaller({ id: data.caller, name: data.callerName });
    });
};

export const CallRespond = (
    socket: SocketIOClient.Socket,
    caller: User,
    callerSignal: Peer.SignalData,
    setCallAccepted: Function,
    setIncomingCall: Function,
    localStream: MediaStream,
    setRemoteVideoStream: Function,
    answer: boolean
) => {
    setCallAccepted(answer);
    setIncomingCall(false);

    const peer = new Peer({
        initiator: false, // User is receiver of call
        trickle: false,
        stream: localStream,
    });

    peer.on('signal', signal => { // Everytime we create a peer, it signals, meaning this triggers immediately
        if (answer) {
            socket.emit('accept-call', { signalData: signal, caller: caller.id });
        } else {
            socket.emit('decline-call', { caller: caller.id });
        }
    });

    peer.on('stream', stream => {
        console.log("Received stream!");
        setRemoteVideoStream(stream);
    });

    peer.signal(callerSignal); // Accept caller's signal
};

export const CallUser = (
    socket: SocketIOClient.Socket,
    callee: UserID,
    setOutgoingCall: Function,
    setCallAccepted: Function,
    localStream: MediaStream,
    setRemoteStream: Function
) => {
    const peer = new Peer({
        initiator: true, // User is initiator of the call
        trickle: false,
        stream: localStream
    });

    // Beginning of handshake roundtrip
    peer.on('signal', signal => { // Everytime we create a peer, it signals, meaning this triggers immediately
        setOutgoingCall(true);
        socket.emit('call-user', { callee: callee, signalData: signal, caller: socket.id });
    });

    peer.on('stream', stream => {
        console.log("Received stream!");
        setRemoteStream(stream);
    });

    socket.on('call-accepted', (signalData: Peer.SignalData) => {
        setOutgoingCall(false);
        setCallAccepted(true);
        peer.signal(signalData); // Accept returnning callee signal

        //socket.off('call-accepted');
        //socket.off('call-declined');
    });

    socket.on('call-declined', () => {
        setOutgoingCall(false);
        console.log("User declined your call!");
        //socket.off('call-accepted');
        //socket.off('call-declined');
    });
};