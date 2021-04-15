import { useState } from 'react';
import { Contact } from '../Types';
import { GetSearchedContact, AddFoundContact } from '../Connection';
import { SquareButton } from '../components/SquareButton';
import { TextInput } from './TextInput';

import '../css/buttons.css';
import '../css/popups.css';
import '../css/profile-picker.css';
import darkCrossIcon from '../icons/dark-cross-icon.svg';
import hjordis from '../images/hjordis.png';


interface Props {
    visibilityHandler: Function
}

export const ProfilePickPopup = (props: Props) => {
    return (
        <div className="full-page-container full-page-popup-container">
            <div className="profile-popup-container">

                <img className="cancel-button-profile" src={darkCrossIcon} alt="DarkCrossIcon" onClick={props.visibilityHandler()}></img>

                <div className="profile-popup-flexbox-column">
                    <h2 className="choose-profile-header">Tryck på en bild för att välja den som profilbild</h2>
                    <div className="profile-popup-picture-container">
                        <img src={hjordis} alt="Profil bild som går att välja" className="profile-picture-popup"/>
                        <img src={hjordis} alt="Profil bild som går att välja" className="profile-picture-popup"/>
                        <img src={hjordis} alt="Profil bild som går att välja" className="profile-picture-popup"/>
                        <img src={hjordis} alt="Profil bild som går att välja" className="profile-picture-popup"/>
                    </div>
                </div>
            </div>
        </div>
    );
};