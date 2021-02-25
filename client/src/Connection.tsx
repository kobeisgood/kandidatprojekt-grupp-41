import io from 'socket.io-client';
<<<<<<< HEAD


export const OpenConnection = () => {
    return io.connect('http://192.168.1.154:4000');
};

export const JoinWithId = (socket: SocketIOClient.Socket, id: number, andThen?: Function) => {
    console.log("Tried to join with ID " + id);
    socket.emit('player-joinWithId', id);

    // Upon ID reception, update app state
    socket.on('joinResponse', function (success: boolean) {
        if (success)
            console.log("Successfully joined!");
        else
            console.log("Error upon joining.");

        if (andThen !== undefined)
            andThen();
        
        socket.off('joinResponse');
=======
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
>>>>>>> server-main
    });
};