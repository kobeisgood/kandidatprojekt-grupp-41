import { OpenConnection, RequestUserList } from './Connection';
import { User } from './Types';
import './App.css';

var socket: SocketIOClient.Socket;
var allUsers: User[] = [];

function connectToServer() {
    socket = OpenConnection();
    RequestUserList(socket);
    console.log(allUsers);
}

function App() {
    return (
        <div className="App">
            <button onClick={connectToServer}>Anslut</button>
        </div>
    );
}

export default App;
