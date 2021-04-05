/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React, { useState } from 'react';
import { Contact } from '../Types';
import { SquareButton } from './SquareButton';
import { DeleteContactPopup } from './DeleteContactPopup';

import '../css/colors.css';
import '../css/contact-card.css';
import CrossIcon from '../icons/cross-icon.svg';
import callIcon from '../icons/call-icon.svg';
import hjordis from '../images/hjordis.jpg';

interface Props {
    removeContactState: boolean;
    contact: Contact | null,
    onCall: Function,
    socket: SocketIOClient.Socket | null,
    contactList: Contact[], 
    phoneNumber: string,
    setContactList: Function
}

export const ContactCard = (props: Props) => {
    const [removeContactVisible, setRemoveContactVisible] = useState(false);

    const removeContactVisibleHandler = () => {
        setRemoveContactVisible(!removeContactVisible)
    }

    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                {!props.removeContactState ? <></> :
                    <button className="delete-contact-button" onClick={removeContactVisibleHandler}> <img src={CrossIcon} alt="Delete contact icon"></img> </button>
                }
                <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                <p className="contact-name">{props.contact ? props.contact.firstName : ""} <span>{props.contact ? props.contact.lastName : ""}</span></p>
                {/* TODO
                    - Make into a CallButton
                    - Add call function on click
                    */}
                <SquareButton label="Ring" onClick={props.onCall} icon={callIcon} className="call-button" />
            </div>
            {removeContactVisible &&
                <DeleteContactPopup 
                visibilityHandler={removeContactVisibleHandler} 
                contact={props.contact}
                socket={props.socket} 
                contactList={props.contactList} 
                phoneNumber={props.phoneNumber} 
                setContactList={props.setContactList}
                /> 
            }
        </div>
    );
};