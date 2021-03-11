import React, { useState } from 'react';
import { CallViewButton } from '../components/CallViewButton';
import { EndCallButton } from '../components/EndCallButton';
import { VideoStreamer } from '../components/VideoStreamer';

import '../css/profile.css';

import micOn from "../icons/microphone-solid-on.svg"
import micOff from "../icons/microphone-solid-off.svg"
import camOn from "../icons/camera-solid-on.svg"
import camOff from "../icons/camera-solid-off.svg"


export const ProfilePage = () => {


    const test = () => {
        console.log("ahaa");
    }

    return (
        <div>
            {/* Header for 'tillbaka', 'Min profil' and 'Ta bort konto' */}
            <header className="profile-header-container profile-header">
                <button>Tillbaka</button>
                <h1>Min profil</h1>
                <button>Ta bort konto</button>
            </header>
            {/* Container for profil pic, name and number */}
            <div className="profile-big-info-container">
                <div className="profile-info-picture-container"><img src="/src/images/hjordis.png" alt="Profilbild"></img></div>
                <div className="profile-info-contact-container">
                    <button>Då</button>
                    <button>Då</button>
                </div>
                {/* <div className="profile-info-contact-container"><button>!</button></div> */}
            </div>

            <ul>
                <li><button className="change-name"></button></li>
                <li><button className="change-number"></button></li>
                <li><button className="change-picture"></button></li>
                <li><button className="change-password"></button></li>
            </ul>
        </div>
    );
}