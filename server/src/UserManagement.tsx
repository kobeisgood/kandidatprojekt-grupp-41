  
import { User, UserID } from './Types';


export let connectedUsers: User[] = [];

/**
 * Adds a user to the server's list of connected users.
 * 
 * @param id The user's socket ID
 * @param name The user's name
 */
export const connectUser = (id: UserID, name: string) => {
    connectedUsers.push({
        id: id,
        firstName: name,
        lastName: ""
    });
};

/**
 * Removes a user from the server's list of connected users.
 * 
 * @param id The user's socket ID
 */
export const disconnectUser = (id: UserID) => {
    connectedUsers.forEach((u: User) => {
        if (u.id === id) {
            let index = connectedUsers.indexOf(u);
            connectedUsers.splice(index, 1);
            return;
        }
    });
};

/**
 * Checks whether a user is connected or not.
 * 
 * @param id The user's socket ID
 * @returns A boolean representing connection status of the user
 */
export const userIsConnected = (id: UserID) => {
    return connectedUsers.some((p) => {
        return p.id === id;
    });
};

/**
 * Looks up a connected user's name from the list.
 * 
 * @param id The user's socket ID
 * @returns The user's name if found, otherwise null
 */
export const getUserName = (id: UserID) => {
    let user = connectedUsers.find((user: User) => {
        return user.id === id
    });

    if (user !== undefined)
        return user.firstName;
    else
        return null;
};

/**
 * Prints the IDs of all connected users to the server log.
 */
export const logUsers = () => {
    console.log("Connected ids are:");
    connectedUsers.forEach((p) => { console.log(p.id); });
};