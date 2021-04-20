import React, { useEffect, useState } from 'react';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';
import { Login, Register } from '../Connection';
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';
import backArrow from '../icons/back-arrow.svg';
import '../css/create-account-view.css';
import { useHistory } from 'react-router-dom';
import { ProfilePickPopup } from '../components/ProfilePickPopup';

interface Props {
    setMe: Function,
    listenForCalls: Function,
    profilePic: Function
}

export const CreateAccountView = (props: Props) => {
    // sätter state tilltrue så vi börjar på neutralPage vilket är standarf vyn
    const [neutralPageState, setNeutralPageState] = useState(true);
    const [showProfilePicker, setShowProfilePicker] = useState(false);

    const
        [phoneNumberInput, setPhoneNumberInput] = useState(""),
        [passwordInput, setPasswordInput] = useState(""),
        [repeatPasswordInput, setRepeatPasswordInput] = useState(""),
        [firstnameInput, setFirstnameInput] = useState(""),
        [lastnameInput, setLastnameInput] = useState(""),
        [chosenPic, setChosenPic] = useState("");

    const
        handlePhoneNumberInput = (event: any) => { setPhoneNumberInput(event.target.value); },
        handlePasswordInput = (event: any) => { setPasswordInput(event.target.value); },
        handleRepeatPasswordInput = (event: any) => { setRepeatPasswordInput(event.target.value); },
        handleFirstnameInput = (event: any) => { setFirstnameInput(event.target.value); },
        handleLastnameInput = (event: any) => { setLastnameInput(event.target.value); };

    useEffect(() => {
        setShowProfilePicker(false);
        console.log(chosenPic);
    }, [chosenPic]);

    //för när man klickar på tillbaka i vidare vyn alltså set up vyn
    const goBack = () => {
        setNeutralPageState(true)
    };

    const goForward = () => {
        if (passwordInput === repeatPasswordInput)
            setNeutralPageState(false);
        else
            alert("Lösenorden matchar inte. Vänligen försök igen.");
    };

    const attemptCreateAccount = () => {
        let user = {
            id: "",
            firstName: firstnameInput,
            lastName: lastnameInput,
            phoneNbr: phoneNumberInput,
            profilePic: chosenPic,
            contacts: [],
            callEntries: []
        };

        console.log(user);
        
        Register(user, passwordInput, loginWithNewAccount);
    }

    const history = useHistory(); // For redirecting user
    const redir = () => { history.push("/dashboard"); };

    const loginWithNewAccount = () => {
        Login(phoneNumberInput, passwordInput, props.setMe, redir, props.listenForCalls);
    };
    // Handles profile picker 
    const openProfilePicker = () => {
        setShowProfilePicker(true);
    }

    const closeProfilePicker = () => {
        setShowProfilePicker(false);
    }

    const renderContent = () => {

        return (
            <div>
                {showProfilePicker &&
                    <ProfilePickPopup visibilityHandler={closeProfilePicker} choosePic={setChosenPic} />
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

                        <SaveButton label="Gå vidare" onClick={goForward} />
                    </>
                }

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
                            <img className="img" src={props.profilePic(chosenPic)} alt="profilbild" />
                            <div className="pic-button-container">
                                <SquareButton label="Välj bild" onClick={openProfilePicker} className="profile-set-upp-button" />                                {/* <SquareButton label="Ladda upp bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" /> */}
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
            </div>
        );
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};