/* View for the start page 'Välkommen till boom'
Authors: Hanna 
*/

import React from 'react';
import { SquareButton } from '../components/SquareButton';
import cam_girl from "../images/cam_girl.png"

import '../css/start.css';


export const StartView = () => {
    return (
        <div>
            <h1 className="header">
                Välkommen till Boom!
            </h1>
            <div className="buttons-container">
                <label className="description-text">Har du redan ett konto?
                    <SquareButton label="Logga in" onClick={() => void 0} linkTo="/login" className="login-button" />
                </label>
                <label className="description-text">Är du ny eller saknar konto?
                    <SquareButton label="Skapa konto" onClick={() => void 0} linkTo="/createaccount" className="create-acount-button" />
                </label>
            </div>
            <img className="start-img" src={cam_girl} alt="profilbild" />
        </div>
    );
};