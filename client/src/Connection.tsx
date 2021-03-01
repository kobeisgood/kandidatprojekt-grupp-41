import io from 'socket.io-client';
import { User } from './Types';


export const OpenConnection = (userName: string) => {
    let socket = io.connect('http://localhost:4000');

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

export const JoinRoom = (socket: SocketIOClient.Socket, roomId: string, setUserList: Function) => {
    socket.emit('join-room', roomId);
    socket.on('join-response', (userList?: User[]) => {
        if (userList !== undefined) {
            console.log('Connected to room ' + roomId);
            setUserList(userList);
            LookForUsers(socket, setUserList); // Notify user when others connect
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
            console.log(userList);
            update(userList);
        } else {
            console.log("Could not receive user list!");
        }
    });
};

const LookForUsers = (socket: SocketIOClient.Socket, setUserList: Function) => {
    socket.on('user-connected', (userName: String, userList: User[]) => {
        console.log(userName + ' joined the room.');
        setUserList(userList);
    });

    socket.on('user-disconnected', (userName: String, userList: User[]) => {
        console.log(userName + ' left the room.');
        setUserList(userList);
    });
};