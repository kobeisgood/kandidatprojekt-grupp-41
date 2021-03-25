
import { authenticate, getContacts } from './Database';
import { UserID } from './Types';


type PhoneNbr = string;

export let connectedUsers: Map<PhoneNbr, UserID> = new Map<PhoneNbr, UserID>();




/**
 * Adds a user to the server's list of connected users.
 * 
 * @param id The user's socket ID
 * @param name The user's name
 */
export const loginUser = async (id: UserID, phone: string, psw: string) => {
    const user = await authenticate(phone, psw); // Check database for password match

    if (user !== null) {
        const contacts = await getContacts(user.contacts);
        user.contacts = contacts;
        connectedUsers.set(id, phone);
        return user;
    } else {
        return null;
    }
};

/**
 * Removes a user from the server's list of connected users.
 * 
 * @param id The user's socket ID
 */
export const logoutUser = (phone: string) => {
    connectedUsers.delete(phone);
};

/**
 * Checks whether a user is connected or not.
 * 
 * @param id The user's socket ID
 * @returns A boolean representing connection status of the user
 */
export const userIsLoggedIn = (phone: string) => {
    return connectedUsers.has(phone);
};

/**
 * Looks up a connected user's name from the list.
 * 
 * @param id The user's socket ID
 * @returns The user's name if found, otherwise null
 */
export const getUserName = (id: UserID) => {
    /*let user = connectedUsers.find((user: User) => {
        return user.id === id
    });

    if (user !== undefined)
        return user.firstName;
    else
        return null;*/
};

/**
 * Prints the IDs of all connected users to the server log.
 */
export const logUsers = () => {
    /*console.log("Connected ids are:");
    connectedUsers.forEach((p) => { console.log(p.id); });*/
};