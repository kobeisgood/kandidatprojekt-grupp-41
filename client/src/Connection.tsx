import io from 'socket.io-client';


export const OpenConnection = () => {
    return io.connect('http://192.168.1.154:4000');
};

export const JoinWithId = (socket: SocketIOClient.Socket, id: number, andThen?: Function) => {
    console.log("Tried to join with ID " + id);
    socket.emit('player-joinWithId', id);

    // Upon ID reception, update app state
    socket.on('joinResponse', function (success: boolean) {
        if (success)
            console.log("Successfully joined!");
        else
            console.log("Error upon joining.");

        if (andThen !== undefined)
            andThen();
        
        socket.off('joinResponse');
    });
};