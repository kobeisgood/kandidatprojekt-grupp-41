import { useState } from 'react';
import { User } from '../Types';
import { Login } from '../Connection';
import { SaveButton } from '../components/SaveButton';
import { TextInput } from '../components/TextInput';
import { BackButton } from '../components/BackButton';
import FadeLoader from "react-spinners/FadeLoader";

import '../css/login-view.css';


interface Props {
    me: User | null,
    setMe: Function,
    listenForCalls: Function,
    setLoading: Function
}

export const LoginView = (props: Props) => {
    const
        [phoneInp, setPhoneInp] = useState(""),
        [passwordInp, setPasswordInp] = useState(""),
        [loggingIn, setLoggingIn] = useState(false);

    const
        handlePhoneInp = (event: any) => { setPhoneInp(event.target.value); },
        handlePasswordInp = (event: any) => { setPasswordInp(event.target.value); };

    const attemptLogin = () => {
        setLoggingIn(true);
        Login(phoneInp, passwordInp, props.setMe, props.setLoading, props.listenForCalls);
    };

    return (
        <div>
            {
                loggingIn &&
                <div className="fade-loader-container">
                    <FadeLoader loading={loggingIn} />
                </div>
            }

            <header className="login-header-container">

                <div className="back-button-container">
                    <BackButton linkTo="/" />
                </div>
                <h1 className="login-header">Logga in</h1>
            </header>

            <div className="description-text-container">
                <h2 className="description-text">
                    Fyll i fälten nedan och tryck sedan på “Logga in” för att gå vidare.
            </h2>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="login-container">
                    <div>
                        <TextInput className="text-input-login-tel" type="tel" label="Ditt mobilnummer: "
                            placeholder="Skriv ditt mobilnummer här..." onChange={handlePhoneInp} />
                    </div>
                    <div>
                        <TextInput className="text-input-login-password" type="password" label="Ditt lösenord: "
                            placeholder="Skriv ditt lösenord här..." onChange={handlePasswordInp} />
                    </div>
                    <label className="container">Håll mig inloggad
                    <input type="checkbox"></input>
                        <span className="checkmark"></span>
                    </label>

                </div>

                <SaveButton label="Logga in" onClick={attemptLogin} />
            </form>
        </div>
    );
};