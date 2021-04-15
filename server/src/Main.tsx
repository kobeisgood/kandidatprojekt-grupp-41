import { Socket } from 'socket.io';
import Peer from 'simple-peer'; // WebRTC wrapper library
import { CallData, PhoneNbr, User, Contact } from './Types';
import { InitServer, RedirectServer } from './Init';
import { addContactToList, removeContactFromList, connectToDb, createUser, getContactFromNbr, numberExists, updateName, updateNbr, updatePassword, authenticate, addCallEntryToList } from './Database';
import { connectedUsers, loginUser, userIsLoggedIn, getUserId, logoutUser } from './UserManagement';

/* INITIATION */
const io = InitServer(); // Init basic server requirements
connectToDb(); // Connect to database
RedirectServer(); // For redirecting HTTP traffic to HTTPS version of page
console.log("Server up and running...");


/* SERVER RUNNING */
io.on('connection', (socket: Socket) => { // Begin listening to client connections
    socket.on('login-user', (phone, psw) => {
        let userId = socket.id;

        if (!userIsLoggedIn(phone)) { // If user not already connected
            loginUser(userId, phone, psw).then((user) => {
                if (user !== null) {
                    console.log(user.firstName + " " + user.lastName + " successfully logged in!");

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
                    console.log("\nA user failed to log in!");
                    socket.emit('login-response', null);
                }
            });
        }
    });

    socket.on('logout-user', (phone: string) => {
        console.log("User logging out");

        if (userIsLoggedIn(phone)) {
            logoutUser(phone);
            socket.emit('logout-response', true);
        } else {
            socket.emit('logout-response', false);
        }
    });

    socket.on('request-userList', () => {
        socket.emit('receive-userList', connectedUsers);
    });

    socket.on('register-user', (user: User, psw: string) => {
        createUser(user, psw)
            .then((result) => {
                console.log("New user registerd!");

                if (result !== null)
                    socket.emit('registration-result', true);
                else
                    socket.emit('registration-result', false);
            })
            .catch(() => {
                console.error("User could not be added!");
                socket.emit('registration-result', false);
            });
    });

    socket.on('update-name', (user: { phoneNbr: string, firstName: string, lastName: string }) => {
        updateName(user.phoneNbr, user.firstName, user.lastName)
            .then(() => {
                console.log("Name update registered!");
                socket.emit("update-name-result", true);
            })
            .catch(() => {
                console.error("Name update unsuccessful");
                socket.emit('update-name-result', false);
            });
    });

    socket.on('update-nbr', (user: { phoneNbr: string, newNbr: string }) => {
        updateNbr(user.phoneNbr, user.newNbr)
            .then(() => {
                console.log("Number update registered!");
                socket.emit("update-nbr-result", true);
            })
            .catch(() => {
                console.error("Number update unsuccessful");
                socket.emit('update-nbr-result', false);
            });
    });

    socket.on('update-password', (user: { phoneNbr: string, oldPassword: string, newPassword: string }) => {
        authenticate(user.phoneNbr, user.oldPassword)
            .then((result) => {
                if (result !== null) {
                    updatePassword(user.phoneNbr, user.newPassword)
                        .then(() => {
                            console.log("Password update registered!");
                            socket.emit("update-password-result", true);
                        })
                        .catch(() => {
                            console.error("Password update unsuccesful");
                            socket.emit('update-password-result', false);
                        });
                }
                else (socket.emit('update-password-result', false))
            })
            .catch(() => {
                console.error("Password wrong");
                socket.emit('update-password-result', false);
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

    socket.on('get-searched-contact', (phoneNumber: string) => {
        getContactFromNbr(phoneNumber).then((contact) => {
            socket.emit('got-contact', contact)
        })
            .catch(() => {
                console.error("Contact could not be found!")
            });
    })

    socket.on('add-searched-contact', (contact: User, loggedInUserNumber: string) => {
        addContactToList(contact, loggedInUserNumber).then((realUpdatedContactList) => {
            console.log('Contact has been added to db!')
            socket.emit('contact-added', realUpdatedContactList)
        })
            .catch(() => {
                console.error("Contact could not be added!")
            })
    })

    socket.on('remove-searched-contact', (contact: User, loggedInUserNumber: string) => {
        removeContactFromList(contact, loggedInUserNumber).then((realUpdatedContactList) => {
            console.log('Contact has been removed from db!')
            socket.emit('contact-removed', realUpdatedContactList)
        })
            .catch(() => {
                console.error("Contact could not be removed!")
            })
    });

    socket.on('call-user', (data: { callee: PhoneNbr, signalData: Peer.SignalData, caller: PhoneNbr, callerName: string, profilePic: string }) => {
        const calleeId = getUserId(data.callee);
        socket.to(calleeId).emit('user-calling', { signalData: data.signalData, caller: data.caller, callerName: data.callerName, profilePic: data.profilePic });
    });
    
    socket.on('accept-call', (data: CallData) => {
        const callerId = getUserId(data.caller);

        addCallEntryToList(data.callee, data.caller, (newCallEntries: Contact[]) => {
            socket.to(callerId).emit('updated-call-entries', newCallEntries);
        });

        addCallEntryToList(data.caller, data.callee, (newCallEntries: Contact[]) => {
            socket.emit('updated-call-entries', newCallEntries);
        });

        socket.to(callerId).emit('call-accepted', data.signalData);
    });
    
    socket.on('decline-call', (data: CallData) => {
        const callerId = getUserId(data.caller);
        socket.to(callerId).emit('call-declined');
    });
    
    socket.on('abort-call', (calleeNbr: string) => {
        const calleeId = getUserId(calleeNbr);
        socket.to(calleeId).emit('call-aborted');
    });
    
    socket.on('disconnecting', () => {
    });
    
    socket.on('disconnect', () => {
    });
});