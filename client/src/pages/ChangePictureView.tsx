/* View for the profile page 'Min profil'
Authors: Charlie and Hanna 
*/
import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import { User } from '../Types';
import { ProfileChangeButton } from '../components/ProfileChangeButton';

import camera from "../icons/profile/camera.svg"
import choosePicture from "../icons/profile/choosePicture.svg"
import { BackButton } from '../components/BackButton';
import ImageUpload from "../ImageUpload";

interface Props {
    user: User
}

export const ChangePictureView = (props: Props) => {
    const InpElem = useRef<HTMLInputElement>(null);

    const OpenFile = () => {
        if (InpElem.current !== null) {
            InpElem.current.click();
        }
    }

    return (
        <div>
            {/* Header for 'Tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container">
                <div className="back-button-container">
                    <BackButton linkTo="/" />
                </div>
                <h1 className="profile-header">Min profil</h1>
            </header>
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={hjordis} alt="profilbild" />
            </div>
            {/* Container for the 4 buttons: 'Ändra namn', 'Ändra nummer', 'Byt bild' and 'Byt lösenord' */}
            <div className="profile-buttons-container">
                <ProfileChangeButton label={"Ta en ny bild"} icon={camera} />
                <ProfileChangeButton label={"Välj befintlig bild"} icon={choosePicture} buttonFunction={OpenFile} />
                <input type="file" style={{display: "none"}} ref={InpElem} />
            </div>
        </div>
    );
}