import React, { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';
import hjordis from "../images/hjordis.png"
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';
import backArrow from '../icons/back-arrow.svg';
import '../css/create-account-view.css';


export const CreateAccountView = () => {
    // sätter state tilltrue så vi börjar på neutralPage vilket är standarf vyn
    const [neutralPageState, setNeutralPageState] = useState(true);

    //för när man klickar på tillbaka i vidare vyn alltså set up vyn
    const goBack = () => {
        setNeutralPageState(true)
    };

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
                                <SquareButton label="Ta en ny bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                                <SquareButton label="Ladda upp bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                            </div>
                        </div>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="crate-container">
                                <div>
                                    <TextInput className="text-input-create-account-tel" type="text" label="Förnamn: "
                                        placeholder="Skriv ditt förnamn här..." onChange={() => void 0} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-name" type="text" label="Efternamn: "
                                        placeholder="Skriv ditt efternamn här..." onChange={() => void 0} />
                                </div>
                            </div>
                        </form>


                        <div className="create-pic-container">
                            <img className="img" src={hjordis} alt="profilbild" />
                            <div className="pic-button-container">
                                <SquareButton label="Ta en ny bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                                <SquareButton label="Ladda upp bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                            </div>
                        </div>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="crate-container">
                                <div>
                                    <TextInput className="text-input-number" type="text" label="Förnamn: "
                                        placeholder="Skriv ditt förnamn här..." onChange={() => void 0} />
                                </div>
                                <div>
                                    <TextInput className="text-input-number" type="text" label="Efternamn: "
                                        placeholder="Skriv ditt efternamn här..." onChange={() => void 0} />
                                </div>
                            </div>
                        </form>

                        <SaveButton label="Skapa konto" onClick={() => void 0} linkTo="/dashboard" />
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
                                        placeholder="Skriv ditt mobilnummer här..." onChange={() => void 0} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-password" type="password" label=" Välj ditt lösenord: "
                                        placeholder="Välj ditt lösenord här..." onChange={() => void 0} />
                                </div>
                                <div>
                                    <TextInput className="text-input-create-account-password" type="password" label="Upprepa lösenord: "
                                        placeholder="Upprepa ditt lösenord här..." onChange={() => void 0} />
                                </div>
                            </div>
                            <div>
                                <TextInput className="text-input-password" type="password" label="Upprepa lösenord: "
                                    placeholder="Upprepa ditt lösenord här..." onChange={() => void 0} />
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