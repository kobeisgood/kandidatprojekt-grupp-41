import { Socket } from 'socket.io';
import { CallData, User, Peer } from './Types';
import { InitServer } from './Init';
import { connectToDb, createUser, getContactFromNbr, numberExists } from './Database';
import { connectedUsers, loginUser, logoutUser, userIsLoggedIn, getUserId } from './UserManagement';


/* INITIATION */
const io = InitServer(); // Init basic server requirements
connectToDb(); // Connect to database

console.log("Server up and running...");


/* SERVER RUNNING */
io.on('connection', (socket: Socket) => { // Begin listening to client connections
    socket.on('login-user', (phone, psw) => {
        let userId = socket.id;

        if (!userIsLoggedIn(phone)) { // If user not already connected
            loginUser(userId, phone, psw).then((user) => {
                if (user !== null) {
                    console.log("\nUser with ID " + userId + " successfully logged in.");
                    
                    socket.emit('login-response', {
                        id: socket.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNbr: user.phoneNbr,
                        profilePic: user.profilePic,
                        contacts: user.contacts,
                        callEntries: user.callEntries
                    });
                } else {
                    console.log("\nUser with ID " + userId + " failed to log in.");
                    socket.emit('login-response', null);
                }
            });
        }
    });

    socket.on('request-userList', () => {
        socket.emit('receive-userList', connectedUsers);
    });

    socket.on('register-user', (user: User, psw: string) => {
        createUser(user, psw, "")
            .then(() => {
                console.log("New user registerd!");
                socket.emit('registration-result', true);
            })
            .catch(() => {
                console.error("User could not be added!");
                socket.emit('registration-result', false);
            });
    });

    socket.on('find-contact-number', (phoneNumber: string) => {
        numberExists(phoneNumber).then((result) => {
            if (result) {
                socket.emit('number-found', result)
            } else {
                socket.emit('number-not-found', result)
            }
            
        });
    });

    socket.on('get-searched-contact', (phoneNumber:string) => {
        getContactFromNbr(phoneNumber).then((contact) => {
            console.log(contact)
            socket.emit('got-contact', contact)
        })
        .catch(() => {
            console.error("Contact could not be found!")
        });
    });

    /*
    socket.on('join-room', (roomId: string) => {
        let userId = socket.id;
        let userName = getUserName(userId);
        socket.to(roomId).broadcast.emit('user-connected', userName, connectedUsers);
        socket.join(roomId);
        socket.emit('join-response', connectedUsers);
        console.log(userName + " joined room " + roomId);
    });
    */

    socket.on('call-user', (data) => {
        const calleeId = getUserId(data.calleeNbr);
        console.log(connectedUsers);
        console.log(data.calleeNbr);

        console.log("CalleeID:");
        console.log(calleeId);

        console.log("CallerID:");
        console.log(data.caller);
        
        socket.to(calleeId).emit('user-calling', { signalData: data.signalData, caller: data.caller, callerName: data.callerName });
    });

    socket.on('accept-call', (data: CallData) => {
        socket.to(data.caller).emit('call-accepted', data.signalData);
    });

    socket.on('decline-call', (data: CallData) => {
        console.log("decline call");
        socket.to(data.caller).emit('call-declined');
    });

    socket.on('abort-call', (callee: Peer) => {
        console.log("User aborted call");
        console.log(callee);
        socket.to(callee.id).emit('call-aborted');
    });

    /*
    socket.on('disconnecting', () => {
        let userId = socket.id;
        let userName = getUserName(userId);
        logoutUser(userId); // Remove user from record

        // Announce that user left the room
        socket.rooms.forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', userName, connectedUsers);
        });
    });
    */

    socket.on('disconnect', () => {
        let userId = socket.id;

        console.log("User with ID " + userId + " logged out.");
    });
});