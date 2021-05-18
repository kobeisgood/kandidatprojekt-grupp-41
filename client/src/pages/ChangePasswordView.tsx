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
    updatePassword: (oldPassword: string, newPassword: string, setPasswordChanged: Function) => void
}


export const ChangePasswordView = (props: Props) => {
    const
        [existingPasswordInp, setExistingPasswordInp] = useState(""),
        [newPasswordInp, setNewPasswordInp] = useState(""),
        [newPasswordRepeatInp, setNewPasswordRepeatInp] = useState(""),
        [passwordChanged, setPasswordChanged] = useState(false);

    const
        handlePasswordInp = (event: any) => { setExistingPasswordInp(event.target.value); },
        handlePasswordRepeatInp = (event: any) => { setNewPasswordInp(event.target.value); },
        handlePasswordRepeatAgainInp = (event: any) => { setNewPasswordRepeatInp(event.target.value); };


    const isRepeatInpSame = () => newPasswordInp === newPasswordRepeatInp;
    const isExistingPasswordSame = () => existingPasswordInp !== newPasswordInp;

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
                    <TextInput className="text-input-current-password" type="password" label="Nuvarande lösenord: " placeholder="Skriv nuvarande lösenord..." onChange={handlePasswordInp} />
                </div>
                <div>
                    <TextInput className="text-input-change-password" type="password" label="Nytt lösenord: " placeholder="Skriv nytt lösenord..." onChange={handlePasswordRepeatInp} />
                </div>
                <div>
                    <TextInput className="text-input-change-password" type="password" label="Återupprepa nytt lösenord: " placeholder="Återupprepa nytt lösenord..." onChange={handlePasswordRepeatAgainInp} />
                </div>
            </div>
            {/* Feedback for showing that the password has been updated */}
            {passwordChanged ?
                <div className="update-container">
                    <h3 className="update-text">Lösenord uppdaterat!</h3>
                </div> : <SaveButton label="Spara lösenord" onClick={() => isRepeatInpSame() && isExistingPasswordSame() ? props.updatePassword(existingPasswordInp, newPasswordInp, setPasswordChanged) : console.log("Password does not match")} />
            }
        </div>
    );
}