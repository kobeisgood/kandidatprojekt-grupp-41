import io, { Socket } from 'socket.io-client';
import { User } from './Types';


export const OpenConnection = () => {
    let socket = io.connect('http://localhost:4000');

    socket.on('connect-response', (users?: User[]) => {
        if (users !== undefined) {
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

export const RequestUserList = (socket: SocketIOClient.Socket) => {
    socket.emit('request-userList');
    socket.on('receive-userList', (userList: User[]) => {
        return userList;
    });
};

export const JoinRoom = (socket: SocketIOClient.Socket, roomId: string) => {
    socket.emit('join-room', roomId);
    socket.on('join-response', (response: boolean) => {
        if (response) {
            console.log('Connected to room ' + roomId);
            ListenForUsers(socket);
        } else {
            console.log('Could not connect to room!');
        }
    })
};

const ListenForUsers = (socket: SocketIOClient.Socket) => {
    socket.on('user-connected', (userName: String) => {
        console.log(userName + ' joined the room.');
    });
};