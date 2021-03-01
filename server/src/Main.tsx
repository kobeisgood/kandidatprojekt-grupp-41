import { Server, Socket } from 'socket.io';

const express = require('express');
const app = express();
const server = app.listen(4000);
const io = new Server(server, { cors: { origin: '*' } });

console.log("Server up and running...");

app.get('/', (req, res) => {
    res.redirect('localhost:3000');
});

export interface User {
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

const getUserName = (id: string) => {
    let user = users.find((user: User) => {
        return user.id === id
    });

    if (user !== undefined)
        return user.name;
    else
        return null;
};

const logUsers = () => {
    console.log("Connected ids are:");
    users.forEach((p) => { console.log(p.id); });
};

io.on('connection', (socket: Socket) => {
    let userId = socket.id;

    if (!userConnected(userId)) { // If not already connected
        addUser(userId, "User " + (users.length + 1));

        console.log("\nUser with ID " + userId + " connected.");
        logUsers();

        socket.emit('connect-response', users);
    } else {
        socket.emit('connect-response', undefined);
    }

    socket.on('join-room', (roomId: string) => {
        let userId = socket.id;
        let userName = getUserName(userId);
        socket.join(roomId);
        socket.emit('join-response', true);
        socket.to(roomId).broadcast.emit('user-connected', userName);

        console.log(userName + " joined room " + roomId);
    });

    socket.on('disconnect', () => {
        let userId = socket.id;
        removeUser(userId);

        console.log("User with ID " + userId + " disconnected.");
        logUsers();
    });
});