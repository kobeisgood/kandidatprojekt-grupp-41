/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React, { useState } from 'react';
import '../css/colors.css';
import CrossIcon from '../icons/cross-icon.svg';
import { Contact } from '../Types';
import { SquareButton } from './SquareButton';
import '../css/contact-card.css';
import callIcon from '../icons/call-icon.svg';
import hjordis from '../images/hjordis.jpg';
import { DeleteContactPopup } from './DeleteContactPopup';

interface Props {
    removeContactState: boolean;
    contact: Contact | null,
    //visibilityHandler: Function,
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
    
    /* Opens the delete contact popup
    const openRemoveContactPopup = () => {
        setRemoveContactVisible(true)
    }*/

    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                {!props.removeContactState ? <></> :
                    <button className="delete-contact-button" onClick={removeContactVisibleHandler}> <img src={CrossIcon} alt="CrossIcon"></img> </button>
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