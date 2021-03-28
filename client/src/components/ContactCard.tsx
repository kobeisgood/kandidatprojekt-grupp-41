/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React from 'react';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import { SquareButton } from './SquareButton';
import hjordis from '../images/hjordis.jpg';

export const ContactCard = () => {
    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                <p className="contact-name">Repo <span>Laufsson</span></p>
                {/* TODO
                    - Make into a CallButton
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={() => void 0} icon={callIcon} className="call-button"/>
            </div>
        </div>
    );
}


