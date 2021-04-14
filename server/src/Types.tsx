import Peer from 'simple-peer'; // WebRTC wrapper library


export type UserID = string;
export type PhoneNbr = string;

export interface User {
    id: UserID,
    firstName: string,
    lastName: string,
    phoneNbr: PhoneNbr,
    profilePic: string
}

export interface Contact {
    id: UserID,
    firstName: string;
    lastName: string;
    phoneNbr: string;
    profilePic: string;
}

export interface Peer {
    id: UserID,
    name: string
}

export interface CallData {
    callee: PhoneNbr,
    signalData: Peer.SignalData,
    caller: PhoneNbr
}