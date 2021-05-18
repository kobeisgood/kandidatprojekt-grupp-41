import { authenticate, getContacts, getCallEntries } from './Database';
import { UserID, PhoneNbr } from './Types';


export let connectedUsers: Map<PhoneNbr, UserID> = new Map<PhoneNbr, UserID>();

/**
 * Adds a user to the server's list of connected users.
 * 
 * @param id The user's socket ID
 * @param name The user's name
 */
export const loginUser = async (id: UserID, phoneNbr: string, psw: string) => {
    let user = await authenticate(phoneNbr, psw); // Check database for password match

    if (user !== null) {
        const contacts = await getContacts(user.contacts);
        user.contacts = contacts;

        const callEntries = await getCallEntries(user.callEntries);
        user.callEntries = callEntries;

        connectedUsers.set(phoneNbr, id);
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
export const logoutUser = (phoneNbr: string) => {
    connectedUsers.delete(phoneNbr);
};

/**
 * Checks whether a user is connected or not.
 * 
 * @param id The user's socket ID
 * @returns A boolean representing connection status of the user
 */
export const userIsLoggedIn = (phoneNbr: string) => {
    return connectedUsers.has(phoneNbr);
};

export const getUserId = (phoneNbr: string) => {
    return connectedUsers.get(phoneNbr);
}

export const getUserNbr = (id: UserID) => {
    let userNbr = null;

    connectedUsers.forEach((value: UserID, key: PhoneNbr) => {
        if (value === id)
            userNbr = key;
    });

    return userNbr;
};