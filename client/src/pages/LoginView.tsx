import { useState } from 'react';

export const LoginView = () => {
    const [phoneInp, setPhoneInp] = useState("");
    const [passwordInp, setPasswordInp] = useState("");

    const handlePhoneInp = (event: any) => { setPhoneInp(event.target.value); };
    const handlePasswordInp = (event: any) => { setPasswordInp(event.target.value); };

    const login = () => {
    };

    return (
        <form>
            <label>Ditt mobilnummer:</label><br />
            <input type="text" onChange={handlePhoneInp} /><br />
            <label>Ditt lösenord:</label><br />
            <input type="password" onChange={handlePasswordInp} /><br />
            <label>Håll mig inloggad</label>
            <input type="checkbox" checked /><br />
            <button onClick={() => login()}>Logga in</button>
        </form>
    );
};