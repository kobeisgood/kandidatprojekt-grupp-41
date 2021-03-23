/* 
    Component for a contact card
    Authors: Daniel and Robin
 */
import React, { useState } from 'react';
import '../css/contact-card.css';
import '../css/colors.css';
import CallIcon from '../icons/call-icon.svg';
import CrossIcon from '../icons/cross-icon.svg';
import { isPropertySignature } from 'typescript';

interface Props {
    removeContactState: boolean;
}


export const ContactCard = (props:Props) => {

    const [deleteContactState, setDeleteContactState] = useState(false)

    const deleteContactStateToggle = () => {
        setDeleteContactState(!deleteContactState)
    }

    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">

            { props.removeContactState === false ? <></> : 
            <button className="delete-contact-button"> <img src={CrossIcon} alt="Kryssikon"></img> </button>}

                <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="Profilbild" />
                <p className="contact-name">Repo <span>Laufsson</span></p>
                <button className="call-button">
                    <div className="call-button-flexbox">
                        <img className="call-button-icon" src={CallIcon} alt="Ringikon" />
                        <p className="call-button-text">Ring</p>
                    </div>
                </button>
            </div>
        </div>
    );
}


