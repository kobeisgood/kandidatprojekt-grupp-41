import Peer from 'simple-peer';

export type UserID = string;
export type UserName = string;

export interface User {
    id: UserID,
    name: UserName
}

export interface CallData {
    callee: UserID,
    signalData: Peer.SignalData,
    caller: UserID
}