/* View for the profile page 'Min profil'
Authors: Charlie and Hanna 
*/
import React, { useRef } from "react";
import { User } from '../Types';
import { ProfileChangeButton } from '../components/ProfileChangeButton';
import { BackButton } from '../components/BackButton';

import '../css/profile.css';
import camera from "../icons/profile/camera.svg"
import choosePicture from "../icons/profile/choosePicture.svg"
import hjordis from "../images/hjordis.png"


interface Props {
    user: User
}

export const ChangePictureView = (props: Props) => {
    const InpElem = useRef<HTMLInputElement>(null);

    const OpenFile = () => {
        if (InpElem.current !== null)
            InpElem.current.click();
    }

    return (
        <div>
            {/* Header for 'Tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container">
                <div className="back-button-container">
                    <BackButton linkTo="/profile" />
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
                <ProfileChangeButton label={"Välj befintlig bild"} icon={choosePicture} onClick={OpenFile} />
                <input type="file" style={{ display: "none" }} ref={InpElem} />
            </div>
        </div>
    );
}