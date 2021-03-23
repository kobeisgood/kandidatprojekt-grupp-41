/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React from 'react';
import '../css/contact-card.css';
import '../css/colors.css';
import callIcon from '../icons/call-icon.svg';
import { SquareButton } from './SquareButton';

export const ContactCard = () => {
    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="Profilbild" />
                <p className="contact-name">Repo <span>Laufsson</span></p>
                {/* TODO
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={() => void 0} icon={callIcon} className="call-button"/>
            </div>
        </div>
    );
}


