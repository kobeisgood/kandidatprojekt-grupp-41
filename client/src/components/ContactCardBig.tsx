/* 
    Component for a big contact card
    Authors: Daniel and Robin
 */

import React from 'react';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import { SquareButton } from './SquareButton';
import { Contact } from '../Types';

interface Props {
    className?: string;
    contact: Contact | null;
    onCall: Function
    profilePic: Function
}

export const ContactCardBig = (props: Props) => {
    return (
        <div className={`${"contact-card-container-big"} ${props.className}`}>
            <div className="contact-card-flexbox">
                <img className="contact-card-profile-picture" src={props.profilePic(props.contact?.profilePic)} alt="Profilbild" />
                <p className="contact-name-big">{props.contact?.firstName} <br/> <span>{props.contact?.lastName}</span></p>
                <SquareButton label="Ring" onClick={props.onCall} icon={callIcon} className="call-button-big"/>
            </div>
        </div>
    );
}