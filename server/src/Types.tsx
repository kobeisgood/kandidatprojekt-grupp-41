import Peer from 'simple-peer'; // WebRTC wrapper library


export type UserID = string;

export interface User {
    id: UserID,
    firstName: string,
    lastName: string,
    phoneNbr: string
}

export interface Peer {
    id: UserID,
    name: string
}

export interface CallData {
    callee: UserID,
    signalData: Peer.SignalData,
    caller: UserID
}