/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import { UserName } from '../Types';

import { BackButton } from '../components/BackButton';

interface Props {
    userName: UserName
}

export const ProfileView = (props: Props) => {
    // Event handler for clicking back button and the change name button etc. 
    const ButtonNameClicked = () => {

    }

    return (
        <div>
            <header className="profile-header-container profile-header">
                <div className="back-button-container">
                    <BackButton buttonFunction={ButtonNameClicked} />
                </div>
                <h1 className="profile-header">Min profil</h1>
            </header>
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={hjordis} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.userName}</h1>
                    <h1 className="profile-number">0701234567</h1>
                </div>
            </div>
        </div>
    );
}