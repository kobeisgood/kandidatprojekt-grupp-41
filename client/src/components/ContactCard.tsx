/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React from 'react';
import '../css/contact-card.css';
import '../css/colors.css';
import CallIcon from '../icons/call-icon.svg';
import CrossIcon from '../icons/cross-icon.svg';
import { Contact } from '../Types';

interface Props {
    removeContactState: boolean;
    contact: Contact | null
}

// Opens the delete contact popup
const openRemoveContactPopup = () => {
    var element = document.getElementById("remove-contact-popup");
    if(element != null) {
        element.style.visibility = 'visible'
    }
}
    
export const ContactCard = (props: Props) => {
    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">

            { props.removeContactState === false ? <></> : 
            <button className="delete-contact-button" onClick={openRemoveContactPopup}> <img src={CrossIcon} alt="CrossIcon"></img> </button>}

                <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="Profilbild" />
                <p className="contact-name">{props.contact ? props.contact.firstName : ""} <span>{props.contact ? props.contact.lastName : ""}</span></p>
                <button className="call-button">
                    <div className="call-button-flexbox">
                        <img className="call-button-icon" src={CallIcon} alt="CallIcon" />
                        <p className="call-button-text">Ring</p>
                    </div>
                </button>
            </div>
        </div>
    );
}


