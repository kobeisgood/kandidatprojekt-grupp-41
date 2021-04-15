/* View for the profile page 'Min profil'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import { User } from '../Types';
import { ProfileChangeButton } from '../components/ProfileChangeButton';

import '../css/profile.css';

import changeName from "../icons/profile/changeName.svg"
import changeNumber from "../icons/profile/changeNumber.svg"
import changePassword from "../icons/profile/changePassword.svg"
import changePicture from "../icons/profile/changePicture.svg"
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';

import trashbin from "../icons/profile/trashbin.svg"
import { DeleteAccount } from '../components/DeleteAccount';

interface Props {
    user: User | null,
    profilePic: Function
}

export const ProfileView = (props: Props) => {
    const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);

    const deleteAccountClicked = () => {
        setDeleteAccountPopUp(true); 
    }

    const deleteAccountVisibleHandler = () => {
        setDeleteAccountPopUp(!deleteAccountPopUp);
    }


    // Event handler for clicking back button and the change name button etc. 
    return (
        <div>
            {/* Header for 'Tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container">
                <div className="back-button-container">
                    <BackButton linkTo="/dashboard" />
                </div>
                <h1 className="profile-header">Min profil</h1>
                {/* TODO
                    - Add function on click for popup "remove account"
                     */}
                <div className="delete-account-container">
                    <SquareButton label="Ta bort konto" onClick={deleteAccountClicked} icon={trashbin} className="delete-account-button" />
                </div>
            </header>
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={props.profilePic(props.user?.profilePic)} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.user ? props.user.firstName + " " + props.user.lastName : ""}</h1>
                    <h1 className="profile-number">{props.user ? props.user.phoneNbr : ""}</h1>
                </div>
            </div>
            {/* Container for the 4 buttons: 'Ändra namn', 'Ändra nummer', 'Byt bild' and 'Byt lösenord' */}
            <div className="profile-buttons-container">
                <ProfileChangeButton label={"Ändra namn"} icon={changeName} linkTo="/profile/changename" />
                <ProfileChangeButton label={"Ändra nummer"} icon={changeNumber} linkTo="/profile/changenumber" />
                <ProfileChangeButton label={"Byt bild"} icon={changePicture} linkTo="/profile/changepicture" />
                <ProfileChangeButton label={"Byt lösenord"} icon={changePassword} linkTo="/profile/changepassword" />
            </div>
            {deleteAccountPopUp && <DeleteAccount visibilityHandler = {deleteAccountVisibleHandler}/>}
        </div>
    ); 
}