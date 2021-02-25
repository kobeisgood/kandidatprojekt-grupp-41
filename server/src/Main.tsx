import { Server, Socket } from 'socket.io';

const express = require('express');
const app = express();
const server = app.listen(4000);
const io = new Server(server, { cors: { origin: '*' } });

console.log("Server up and running...");


interface User {
    id: string,
    name: string
}

let users: User[] = []; // Stores all connected users

const addUser = (id: string, name: string) => {
    users.push({
        id: id,
        name: name
    });
};

const removeUser = (id: string) => {
    users.forEach((u: User) => {
        if (u.id === id) {
            let index = users.indexOf(u);
            users.splice(index, 1);
            return;
        }
    });
};

const userConnected = (id: string) => {
    return users.some((p) => {
        return p.id === id;
    });
};

const logUsers = () => {
    console.log("Connected ids are:");
    users.forEach((p) => { console.log(p.id); });
};

io.on('connection', (socket: Socket) => {
    let userId = socket.id;

    if (!userConnected(userId)) {
        addUser(userId, "User " + users.length);
        
        console.log("\nUser with ID " + userId + " connected.");
        logUsers();

        socket.emit('joinResponse', users);
    }

    // Any
    socket.on('disconnect', () => {
        let userId = socket.id;
        removeUser(userId);

        console.log("User with ID " + userId + " disconnected.");
        logUsers();
    });
});