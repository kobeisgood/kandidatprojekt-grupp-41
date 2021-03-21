
import React from 'react';
import '../css/contact-card.css';
import '../css/colors.css';
import CallIcon from '../icons/call-icon.svg';

export const ContactCard = () => {
    return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
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


