import Peer from 'simple-peer'; // WebRTC wrapper library


export type UserID = string;

export interface User {
    id: UserID,
    firstName: string,
    lastName: string,
    phoneNbr: string,
    profilePic: string,
    contacts: Contact[],
    callEntries: Array<Object>
}

export interface Contact {
    id: UserID,
    firstName: string;
    lastName: string;
    phoneNbr: string;
    profilePic: string;
}

export interface CallData {
    callee: UserID,
    signalData: Peer.SignalData,
    caller: UserID
}