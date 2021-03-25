/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/profile">
                        <BackButton buttonFunction={ButtonNameClicked} />
                    </Link>
                </div>
                <h1 className="profile-header">Min profil</h1>
            </header>
            <div className="change-password-container">
                <TextInput className="text-input-password" type="password" label="Nuvarande lösenord: " placeholder="Skriv ditt nuvarande lösenord här..." onChange={() => console.log("Klick!")} />
                <TextInput className="text-input-password" type="password" label="Nytt lösenord: " placeholder="Skriv ditt nya lösenord här..." onChange={() => console.log("Klick!")} />
                <TextInput className="text-input-password" type="password" label="Återupprepa nytt lösenord: " placeholder="Återupprepa ditt nya lösenord här..." onChange={() => console.log("Klick!")} />
            </div>
            <SaveButton label="Spara lösenord" buttonFunction={ButtonNameClicked} linkTo="/profile" />
        </div>
    );
}