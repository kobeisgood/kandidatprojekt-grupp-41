/* View for the profile page 'Min profil'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import trashbin from "../icons/profile/trashbin.svg"
import { User } from '../Types';
import { ProfileChangeButton } from '../components/ProfileChangeButton';

import changeName from "../icons/profile/changeName.svg"
import changeNumber from "../icons/profile/changeNumber.svg"
import changePassword from "../icons/profile/changePassword.svg"
import changePicture from "../icons/profile/changePicture.svg"
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';

interface Props {
    user: User
}

export const ProfileView = (props: Props) => {
    // Event handler for clicking back button and the change name button etc. 
    const ButtonNameClicked = () => {

    }
    const ChangeNameClicked = () => {
        <Link to="/changename" />
    }
    return (
        <div>
            {/* Header for 'Tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container">
                <div className="back-button-container">
                    <BackButton linkTo={"/"} />
                </div>
                <h1 className="profile-header">Min profil</h1>
                {/* TODO
                    - Add function on click for popup "remove account"
                     */}
                <div className="delete-account-container">
                    <SquareButton label="Ta bort konto" onClick={() => void 0} icon={trashbin} className="delete-account-button" />
                </div>
            </header>
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={hjordis} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.user.firstName + " " + props.user.lastName}</h1>
                    <h1 className="profile-number">0701234567</h1>
                </div>
            </div>
            {/* Container for the 4 buttons: 'Ändra namn', 'Ändra nummer', 'Byt bild' and 'Byt lösenord' */}
            <div className="profile-buttons-container">
                <ProfileChangeButton label={"Ändra namn"} icon={changeName} buttonFunction={ChangeNameClicked} linkTo="/profile/changename" />
                <ProfileChangeButton label={"Ändra nummer"} icon={changeNumber} buttonFunction={ButtonNameClicked} linkTo="/profile/changenumber" />
                <ProfileChangeButton label={"Byt bild"} icon={changePicture} buttonFunction={ButtonNameClicked} linkTo="/profile/changepicture" />
                <ProfileChangeButton label={"Byt lösenord"} icon={changePassword} buttonFunction={ButtonNameClicked} linkTo="/profile/changepassword" />
            </div>
        </div>
    );
}