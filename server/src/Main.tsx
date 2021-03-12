import { Server, Socket } from 'socket.io';
import { User, UserID, CallData } from './Types';
import { initDbConnection, getUsers, createUser, numberExists } from './Database';


/* SERVER INITIATION BEGIN */
const
    dotenv = require('dotenv'),
    express = require('express'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    cors = require('cors'),
    useHTTPS = false; // Only enable this if you know what it means

const app = express();
app.use(cors()); // For avoiding CORS errors

dotenv.config(); // For reading .env file


let server: any;
if (useHTTPS)
    server = https.createServer({
        key: fs.readFileSync('src/certs/key.key'),
        cert: fs.readFileSync('src/certs/cert.crt')
    }, app).listen(4000);
else
    server = http.createServer(app).listen(4000);

const io = new Server(server, { cors: { origin: '*' } });
/* SERVER INITIATION END */


/* DATABASE INIT BEGIN */
initDbConnection(); // Connect to database

/*
getUsers().then((users) => {
    console.log(users);
});
*/

/*
numberExists("1234567890").then((exists) => {
    console.log(exists);
});
*/

/*
createUser(
    {
        id: "test",
        firstName: "Bob",
        lastName: "Andersson"
    },
    "123",
    "",
    123
).then(() => {
    console.log("User was added!");
});
*/
/* DATABASE INIT END */


/* RUN SERVER */
console.log("Server up and running...");

let users: User[] = []; // Local copy of all connected users

const addUser = (id: UserID, name: string) => {
    users.push({
        id: id,
        firstName: name,
        lastName: ""
    });
};

const removeUser = (id: UserID) => {
    users.forEach((u: User) => {
        if (u.id === id) {
            let index = users.indexOf(u);
            users.splice(index, 1);
            return;
        }
    });
};

const userIsConnected = (id: UserID) => {
    return users.some((p) => {
        return p.id === id;
    });
};

const getUserName = (id: UserID) => {
    let user = users.find((user: User) => {
        return user.id === id
    });

    if (user !== undefined)
        return user.firstName;
    else
        return null;
};

const logUsers = () => {
    console.log("Connected ids are:");
    users.forEach((p) => { console.log(p.id); });
};

io.on('connection', (socket: Socket) => {
    socket.on('first-connection', userName => {
        let userId = socket.id;

        if (!userIsConnected(userId)) { // If not already connected
            addUser(userId, userName);

            console.log("\nUser with ID " + userId + " connected.");

            socket.emit('connect-response', users);
        } else {
            socket.emit('connect-response', undefined);
        }
    });

    socket.on('request-userList', () => {
        socket.emit('receive-userList', users);
    });

    socket.on('join-room', (roomId: string) => {
        let userId = socket.id;
        let userName = getUserName(userId);
        socket.to(roomId).broadcast.emit('user-connected', userName, users);
        socket.join(roomId);
        socket.emit('join-response', users);
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
        removeUser(userId); // Remove user from record

        // Announce that user left the room
        socket.rooms.forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', userName, users);
        });
    });

    socket.on('disconnect', () => {
        let userId = socket.id;

        console.log("User with ID " + userId + " disconnected.");
    });
});