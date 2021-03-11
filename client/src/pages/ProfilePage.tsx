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
            <h1>Min profil</h1>
            <ul>
                <li><button className="change-name">Ändra namn</button></li>
                <li><button className="change-number">Ändra nummer</button></li>
                <li><button className="change-picture">Byt bild</button></li>
                <li><button className="change-password">Byt lösenord</button></li>
            </ul>
        </div>
    );
}