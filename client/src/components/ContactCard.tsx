/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React from 'react';
import '../css/colors.css';
import CrossIcon from '../icons/cross-icon.svg';
import { Contact } from '../Types';
import { SquareButton } from './SquareButton';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import hjordis from '../images/hjordis.jpg';

interface Props {
    removeContactState: boolean;
    contact: Contact | null,
    visibilityHandler: Function,
    onCall: Function
}

export const ContactCard = (props: Props) => {
    // Opens the delete contact popup
    const openRemoveContactPopup = () => {
        props.visibilityHandler();
    }

    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                {!props.removeContactState ? <></> :
                    <button className="delete-contact-button" onClick={openRemoveContactPopup}> <img src={CrossIcon} alt="CrossIcon"></img> </button>
                }
                <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                <p className="contact-name">{props.contact ? props.contact.firstName : ""} <span>{props.contact ? props.contact.lastName : ""}</span></p>
                {/* TODO
                    - Make into a CallButton
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={props.onCall} icon={callIcon} className="call-button" />
            </div>
        </div>
    );
};