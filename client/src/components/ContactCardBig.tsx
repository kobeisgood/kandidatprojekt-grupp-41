/* 
    Component for a big contact card
    Authors: Daniel and Robin
 */

import React from 'react';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import { SquareButton } from './SquareButton';
import hjordis from '../images/hjordis.jpg';

interface Props {
    className?: string;
}

export const ContactCardBig = (props: Props) => {
    return (
        <div className={`${"contact-card-container-big"} ${props.className}`}>
            <div className="contact-card-flexbox">
                <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                <p className="contact-name-big">Hjördis <br/> <span>Gammelsson</span></p>
                {/* TODO
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={() => void 0} icon={callIcon} className="call-button-big"/>
            </div>
        </div>
    );
}