import React, { useState } from 'react';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import { UserName } from '../Types';
import { ProfileChangeButton } from '../components/ProfileChangeButton';

import changeName from "../icons/profile/changeName.svg"
import changeNumber from "../icons/profile/changeNumber.svg"
import changePassword from "../icons/profile/changePassword.svg"
import changePicture from "../icons/profile/changePicture.svg"

interface Props {
    userName: UserName
}

export const ProfilePage = (props: Props) => {
    const test = () => {
        console.log("ahaa");
    }

    const ButtonNameClicked = () => {
        
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
                    <h1 className="profile-name">070123456789</h1>
                </div>
            </div>

            <div className="profile-buttons-container">
                <div>
                   <ProfileChangeButton functionDesc={"Ändra namn"} icon={changeName} buttonFunction={ButtonNameClicked} />
                </div>
                <div>
                    <ProfileChangeButton functionDesc={"Ändra nummer"} icon={changeNumber} buttonFunction={ButtonNameClicked} />
                </div>
                <div>
                    <ProfileChangeButton functionDesc={"Byt bild"} icon={changePicture} buttonFunction={ButtonNameClicked} />
                </div>
                <div>
                    <ProfileChangeButton functionDesc={"Byt lösenord"} icon={changePassword} buttonFunction={ButtonNameClicked} />
                </div>
            </div>
        </div>
    );
}