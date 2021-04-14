import React, { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';
import { Register } from '../Connection';
import { User } from '../Types';
import hjordis from "../images/hjordis.png"
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';
import backArrow from '../icons/back-arrow.svg';
import '../css/create-account-view.css';

interface Props {
    callback: () => void;
}

export const CreateAccountView = (props: Props) => {
    // sätter state tilltrue så vi börjar på neutralPage vilket är standarf vyn
    const [neutralPageState, setNeutralPageState] = useState(true);

    const 
        [phoneNumberInput, setPhoneNumberInput] = useState(""),
        [passwordInput, setPasswordInput] = useState(""),
        [repeatPasswordInput, setRepeatPasswordInput] = useState(""),
        [firstnameInput, setFirstnameInput] = useState(""),
        [lastnameInput, setLastnameInput] = useState(""),
        [profilePic, setProfilePic] = useState("pathToPic");

    const
        handlePhoneNumberInput = (event: any) => { setPhoneNumberInput(event.target.value); use },
        handlePasswordInput = (event: any) => { setPasswordInput(event.target.value); },
        handleRepeatPasswordInput = (event: any) => { setRepeatPasswordInput(event.target.value); },
        handleFirstnameInput = (event: any) => { setFirstnameInput(event.target.value); },
        handleLastnameInput = (event: any) => { setLastnameInput(event.target.value); };

    //för när man klickar på tillbaka i vidare vyn alltså set up vyn
    const goBack = () => {
        setNeutralPageState(true)
    };

    let user: User;

    const attemptCreateAccount = () => {
        console.log(phoneNumberInput + ", " + passwordInput + ", " + repeatPasswordInput, ", " + firstnameInput + ", " + lastnameInput + ", " + profilePic);

        user.firstName = firstnameInput;
        user.lastName = lastnameInput;
        user.phoneNbr = phoneNumberInput;

        Register(user, passwordInput, props.callback);
    }

    const renderContent = () => {
        return (
            <div>
                {/* vy när man klickat på gå vidare "set up vyn" */}
                { !neutralPageState &&
                    <>
                        <header className="create-header-container">
                            <div className="back-button-container">
                                <SquareButton label="Tillbaka" onClick={goBack} icon={backArrow} className="back-button" />
                            </div>
                            <h1 className="create-header">Skapa konto</h1>
                        </header>
                        <div className="create-description-text-container">
                            <h2 className="create-description-text">
                                Om du vill kan du fylla i ditt namn och välja en bild på dig själv. Detta hjälper andra att känna igen dig.
                            </h2>
                        </div>

                        <div className="create-pic-container">
                            <img className="img" src={hjordis} alt="profilbild" />
                            <div className="pic-button-container">
                                <SquareButton label="Välj bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                                {/* <SquareButton label="Ladda upp bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" /> */}
                            </div>
                        </div>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="crate-container">
                                <div>
                                    <TextInput className="text-input-create-account-tel" type="text" label="Förnamn: "
                                        placeholder="Skriv ditt förnamn här..." onChange={handleFirstnameInput} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-name" type="text" label="Efternamn: "
                                        placeholder="Skriv ditt efternamn här..." onChange={handleLastnameInput} />
                                </div>
                            </div>
                        </form>

                        <SaveButton label="Skapa konto" onClick={attemptCreateAccount} /* linkTo="/dashboard" */ />
                    </>
                }

                {/* Standard vy som man kommer till när man klickar på knappen eller skriver in /createaccount */}
                {neutralPageState &&
                    <>
                        <header className="create-header-container">
                            <div className="back-button-container">
                                <BackButton linkTo="/" />
                            </div>
                            <h1 className="create-header">Skapa konto</h1>
                        </header>
                        <div className="create-description-text-container">
                            <h2 className="description-text">
                                Fyll i fälten nedan och tryck sedan på "Gå vidare".
                                </h2>
                        </div>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="create-container">
                                <div>
                                    <TextInput className="text-input-create-account-tel" type="tel" label="Ditt mobilnummer: "
                                        placeholder="Skriv ditt mobilnummer här..." onChange={handlePhoneNumberInput} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-password" type="password" label=" Välj ditt lösenord: "
                                        placeholder="Välj ditt lösenord här..." onChange={handlePasswordInput} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-password" type="password" label="Upprepa lösenord: "
                                        placeholder="Upprepa ditt lösenord här..." onChange={handleRepeatPasswordInput} />
                                </div>
                            </div>
                        </form>

                        <SaveButton label="Gå vidare" onClick={setNeutralPageState} />
                    </>
                }
            </div>
        );
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};