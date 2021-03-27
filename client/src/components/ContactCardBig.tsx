/* 
    Component for a big contact card
    Authors: Daniel and Robin
 */

import React from 'react';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import { SquareButton } from './SquareButton';
import hjordis from '../images/hjordis.jpg';

export const ContactCardBig = () => {
    return (
        <div className="contact-card-container-big">
            <div className="contact-card-flexbox">
                <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                <p className="contact-name-big">Repo <br/> <span>Laufsson</span></p>
                {/* TODO
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={() => void 0} icon={callIcon} className="call-button-big"/>
            </div>
        </div>
    );
}
    
    
    