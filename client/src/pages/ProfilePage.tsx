import React, { useState } from 'react';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import { UserName } from '../Types';

interface Props {
    userName: UserName
}

export const ProfilePage = (props: Props) => {
    const test = () => {
        console.log("ahaa");
    }

    return (
        <div>
            {/* Header for 'tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container profile-header">
                <button>Tillbaka</button>
                <h1>Min profil</h1>
                <button>Ta bort konto</button>
            </header>
            {/* Container for profil pic, name and number */}
            <div className="profile-big-info-container">
                <div className="profile-info-picture-container"><img src={hjordis} alt="profilbild"/></div>
                <div className="profile-info-contact-container">
                <h1 className="profile-name">{props.userName}</h1>
                </div>
            </div>

            <ul>
                <li><button className="change-name"></button></li>
                <li><button className="change-number"></button></li>
                <li><button className="change-picture"></button></li>
                <li><button className="change-password"></button></li>
            </ul>
        </div>
    );
}