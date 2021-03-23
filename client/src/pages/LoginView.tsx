import { useState } from 'react';
import { User } from '../Types';
import { Login } from '../Connection';
import { useHistory } from "react-router-dom";


interface Props {
    socket: SocketIOClient.Socket | null;
    setSocket: Function;
    me: User | null;
    setMe: Function;
}

export const LoginView = (props: Props) => {
    const
        [phoneInp, setPhoneInp] = useState(""),
        [passwordInp, setPasswordInp] = useState(""),
        [loggingIn, setLoggingIn] = useState(false);

    const
        handlePhoneInp = (event: any) => { setPhoneInp(event.target.value); },
        handlePasswordInp = (event: any) => { setPasswordInp(event.target.value); };

    const history = useHistory(); // For redirecting user
    const redir = () => { history.push("/start"); };

    const attemptLogin = () => {
        setLoggingIn(true);

        props.setSocket(
            Login(phoneInp, passwordInp, props.setMe, redir)
        );
    };

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <label>Ditt mobilnummer:</label><br />
            <input type="text" onChange={handlePhoneInp} /><br />
            <label>Ditt lösenord:</label><br />
            <input type="password" onChange={handlePasswordInp} /><br />
            <label>Håll mig inloggad</label>
            <input type="checkbox" defaultChecked /><br />
            <button onClick={() => attemptLogin()}>Logga in</button>
        </form>
    );
};