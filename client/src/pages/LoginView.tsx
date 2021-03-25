import { useState } from 'react';
import { User } from '../Types';
import { Login } from '../Connection';
import { useHistory } from "react-router-dom";
import { SaveButton } from '../components/SaveButton';
import { TextInput } from '../components/TextInput';

import '../css/login-view.css';


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
    const redir = () => { history.push("/dashboard"); };

    const attemptLogin = () => {
        setLoggingIn(true);

        props.setSocket(
            Login(phoneInp, passwordInp, props.setMe, redir)
        );
    };

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <div className="login-container">
                <TextInput className="text-input-password" type="text" label="Ditt mobilnummer: " 
                placeholder="Skriv ditt mobilnummer här..." onChange={handlePhoneInp} />

                <TextInput className="text-input-password" type="password" label="Ditt lösenord: " 
                placeholder="Skriv ditt lösenord här..." onChange={handlePasswordInp} />
            
                <label className="container">Håll mig inloggad
                    <input type="checkbox"></input>
                        <span className="checkmark"></span>
                </label>
            </div>
            <SaveButton label="Logga in" buttonFunction={attemptLogin} />
        </form>
    );
};