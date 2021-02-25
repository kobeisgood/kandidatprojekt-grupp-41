import io from 'socket.io-client';
import { User } from './Types';


export const OpenConnection = () => {
    let socket = io.connect('http://localhost:4000');

    socket.on('joinResponse', (users?: User[]) => {
        if (users !== undefined) {
            console.log("Successfully joined!");
        } else {
            console.log("Error upon joining");
            return null;
        }

        socket.off('joinResponse'); // Stop listening
    });

    return socket;
};

export const RequestUserList = (socket: SocketIOClient.Socket) => {
    socket.emit('request-userList');

    socket.on('receive-userList', (userList: User[]) => {
        return userList;
    });
};