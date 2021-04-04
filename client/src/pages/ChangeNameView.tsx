/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React from 'react';
import '../css/profile.css';
import '../css/textinput.css';
import hjordis from "../images/hjordis.png"
import { User } from '../Types';

import { BackButton } from '../components/BackButton';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';

interface Props {
    user: User | null
}

export const ChangeNameView = (props: Props) => {
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
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={hjordis} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.user ? props.user.firstName + " " + props.user.lastName : ""}</h1>
                    <h1 className="profile-number">{props.user ? props.user.phoneNbr : ""}</h1>
                </div>
            </div>
            <div className="change-name-container">
                <TextInput className="text-input" type="text" label="Förnamn: " placeholder={props.user ? props.user.firstName : ""} onChange={() => console.log("Klick!")} />
                <TextInput className="text-input" type="text" label="Efternamn: " placeholder={props.user ? props.user.lastName : ""} onChange={() => console.log("Klick!")} />
            </div>
            <SaveButton label="Spara namn" onClick={ButtonNameClicked} linkTo="/profile" />
        </div>
    );
}