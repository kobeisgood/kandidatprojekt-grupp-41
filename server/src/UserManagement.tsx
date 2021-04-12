import { authenticate, getContacts, getCallEntries } from './Database';
import { UserID, PhoneNbr } from './Types';


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
        const callEntries = await getCallEntries(user.callEntries); /* TODO: Make function for sorting, reverse, etc. */
        user.callEntries = callEntries;
        connectedUsers.set(phone, id);
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

export const getUserId = (phoneNbr: string) => {
    return connectedUsers.get(phoneNbr);
}