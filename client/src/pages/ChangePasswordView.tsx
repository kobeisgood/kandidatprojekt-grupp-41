/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import '../css/profile.css';
import { User } from '../Types';

import { BackButton } from '../components/BackButton';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';

interface Props {
    me: User | null
    setMe: Function
    updatePassword: Function
}


export const ChangePasswordView = (props: Props) => {
    // Event handler for clicking back button and the change name button etc. 
    const
        [passwordInp, enterPasswordInp] = useState(""),
        [passwordRepeatInp, setPasswordRepeatInp] = useState(""),
        [passwordRepeatAgainInp, setPasswordRepeatAgainInp] = useState("");

    const
        handlePasswordInp = (event: any) => { enterPasswordInp(event.target.value); },
        handlePasswordRepeatInp = (event: any) => { setPasswordRepeatInp(event.target.value); },
        handlePasswordRepeatAgainInp = (event: any) => { setPasswordRepeatAgainInp(event.target.value); };


    const isRepeatInpSame = () => passwordRepeatInp === passwordRepeatAgainInp;
    const isExistingPasswordSame = () => passwordInp !== passwordRepeatInp;

    return (
        <div>
            <header className="profile-header-container profile-header">
                <div className="back-button-container">
                    <BackButton linkTo="/profile" />
                </div>
                <h1 className="profile-header">Min profil</h1>
            </header>
            <div className="change-password-container">
                <div>
                    <TextInput className="text-input-password" type="password" label="Nuvarande lösenord: " placeholder="Skriv nuvarande lösenord..." onChange={handlePasswordInp} />
                </div>
                <div>
                    <TextInput className="text-input-password" type="password" label="Nytt lösenord: " placeholder="Skriv nytt lösenord..." onChange={handlePasswordRepeatInp} />
                </div>
                <div>
                    <TextInput className="text-input-password" type="password" label="Återupprepa nytt lösenord: " placeholder="Återupprepa nytt lösenord..." onChange={handlePasswordRepeatAgainInp} />
                </div>
            </div>
            <SaveButton label="Spara lösenord" onClick={() => isRepeatInpSame() ? props.updatePassword(passwordRepeatInp) : console.log("Password does not match")} />
        </div>
    );
}