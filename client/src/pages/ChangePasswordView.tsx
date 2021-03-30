/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React from 'react';
import '../css/profile.css';

import { BackButton } from '../components/BackButton';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';


export const ChangePasswordView = () => {
    // Event handler for clicking back button and the change name button etc. 
    const ButtonNameClicked = () => {

    }

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
                    <TextInput className="text-input-password" type="password" label="Nuvarande lösenord: " placeholder="Skriv nuvarande lösenord..." onChange={() => console.log("Klick!")} />
                </div>
                <div>
                    <TextInput className="text-input-password" type="password" label="Nytt lösenord: " placeholder="Skriv nytt lösenord..." onChange={() => console.log("Klick!")} />
                </div>
                <div>
                    <TextInput className="text-input-password" type="password" label="Återupprepa nytt lösenord: " placeholder="Återupprepa nytt lösenord..." onChange={() => console.log("Klick!")} />
                </div>
            </div>
            <SaveButton label="Spara lösenord" onClick={ButtonNameClicked} linkTo="/profile" />
        </div>
    );
}