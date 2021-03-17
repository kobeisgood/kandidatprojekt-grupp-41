import { Socket } from 'socket.io';
import { CallData } from './Types';
import { InitServer } from './Init';
import { connectToDb } from './Database';
import { connectedUsers, connectUser, disconnectUser, userIsConnected, getUserName } from './UserManagement';


/* INITIATION */
const io = InitServer(); // Init basic server requirements
connectToDb(); // Connect to database

console.log("Server up and running...");


/* SERVER RUNNING */
io.on('connection', (socket: Socket) => { // Begin listening to client connections
    socket.on('first-connection', userName => {
        let userId = socket.id;

        if (!userIsConnected(userId)) { // If not already connected
            connectUser(userId, userName);

            console.log("\nUser with ID " + userId + " connected.");

            socket.emit('connect-response', connectedUsers);
        } else {
            socket.emit('connect-response', undefined);
        }
    });

    socket.on('request-userList', () => {
        socket.emit('receive-userList', connectedUsers);
    });

    socket.on('join-room', (roomId: string) => {
        let userId = socket.id;
        let userName = getUserName(userId);
        socket.to(roomId).broadcast.emit('user-connected', userName, connectedUsers);
        socket.join(roomId);
        socket.emit('join-response', connectedUsers);
        console.log(userName + " joined room " + roomId);
    });

    socket.on('call-user', (data: CallData) => {
        socket.to(data.callee).emit('user-calling', { signalData: data.signalData, caller: data.caller, callerName: getUserName(data.caller) });
    });

    socket.on('accept-call', (data: CallData) => {
        socket.to(data.caller).emit('call-accepted', data.signalData);
    });

    socket.on('decline-call', (data: CallData) => {
        socket.to(data.caller).emit('call-declined');
    });

    socket.on('disconnecting', () => {
        let userId = socket.id;
        let userName = getUserName(userId);
        disconnectUser(userId); // Remove user from record

        // Announce that user left the room
        socket.rooms.forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', userName, connectedUsers);
        });
    });

    socket.on('disconnect', () => {
        let userId = socket.id;

        console.log("User with ID " + userId + " disconnected.");
    });
});