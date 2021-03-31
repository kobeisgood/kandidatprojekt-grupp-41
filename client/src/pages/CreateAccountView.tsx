import { useState } from 'react';
import { User } from '../Types';
import { Login } from '../Connection';
import { useHistory } from "react-router-dom";
import { TextInput } from '../components/TextInput';
import { SquareButton } from '../components/SquareButton';
import '../css/create-account-view.css';



export const LoginView = () => {
    
    

    return (
        <div>
            <header className="create-header-container">
                <SquareButton label="Tillbaka" onClick={() => void 0} linkTo="/" className="backButton"/>
                <h1 className="create-header">Skapa konto</h1>
            </header>
            <div className="description-text-container">
                <h2 className="description-text">
                    Fyll i fälten nedan och tryck sedan på "Gå vidare".
            </h2>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="login-container">
                    <div>
                        <TextInput className="text-input-number" type="text" label="Ditt mobilnummer: "
                            placeholder="Skriv ditt mobilnummer här..." onChange={() => void 0} />
                    </div>
                    <div>
                        <TextInput className="text-input-password" type="password" label="Välj ditt lösenord: "
                            placeholder="Välj ditt lösenord här..." onChange={() => void 0} />
                    </div>
                    <div>
                        <TextInput className="text-input-password" type="password" label="Upprepa lösenord: "
                            placeholder="Upprepa ditt lösenord här..." onChange={() => void 0} />
                    </div>
                    
                </div>
                <SquareButton label="Gå vidare" onClick={() => void 0} className="saveButton" />
            </form>
        </div>
    );
};