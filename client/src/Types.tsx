import Peer from 'simple-peer'; // WebRTC wrapper library


export type UserID = string;
export type PhoneNbr = string;

export interface User {
    id: UserID,
    firstName: string,
    lastName: string,
    phoneNbr: string,
    profilePic: string,
    contacts: Contact[],
    callEntries: Contact[]
}

export interface PeerInfo {
    type: string,
    content: any
}

export interface Contact {
    id: UserID,
    firstName: string;
    lastName: string;
    phoneNbr: string;
    profilePic: string;
}

export interface Peer {
    number: string,
    name: string
}

export interface CallEntry {
    calledUserId: UserID,
    timeOfCall: Date
}

export interface CallData {
    callee: UserID,
    signalData: Peer.SignalData,
    caller: UserID
}