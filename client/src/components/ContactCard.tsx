/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React from 'react';
import { Contact } from '../Types';
import { SquareButton } from './SquareButton';

import '../css/colors.css';
import '../css/contact-card.css';
import crossIcon from '../icons/cross-icon.svg';
import callIcon from '../icons/call-icon.svg';

interface Props {
    removeContactState: boolean;
    contact: Contact | null,
    onCall: Function,
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function,
    setSelectedContact: Function,
    setDeleteContactVisible: Function,
    profilePic: Function
}

export const ContactCard = (props: Props) => {
    const openDeletePopup = () => {
        if (props.contact?.phoneNbr !== "")
            props.setSelectedContact({
                name: props.contact?.firstName + " " + props.contact?.lastName,
                phoneNbr: props.contact?.phoneNbr
            });

        props.setDeleteContactVisible();
    };

    return (
        <div className="contact-card-container">

            <div className="contact-card-flexbox">
                {!props.removeContactState ? <></> :
                    <button className="delete-contact-button" onClick={openDeletePopup}> <img src={crossIcon} alt="CrossIcon"></img> </button>
                }
                <img className="contact-card-profile-picture" src={props.profilePic(props.contact?.profilePic)} alt="Profilbild" />
                <p className="contact-name">{props.contact ? props.contact.firstName : ""} <br /> <span>{props.contact ? props.contact.lastName : ""}</span></p>
                <SquareButton label="Ring" onClick={props.onCall} icon={callIcon} className="call-button" />
            </div>
        </div>
    );
};