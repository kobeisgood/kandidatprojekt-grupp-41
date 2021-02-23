const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000);
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