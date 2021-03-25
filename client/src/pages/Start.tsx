/* View for the start page 'Välkommen till boom'
Authors: Hanna 
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/start.css';
import { SquareButton } from '../components/SquareButton';
import cam_girl from "../images/cam_girl.png"





export const Start = () => {
    function ButtonNameClicked() {
    }


    return (
        <div>
            <h1 className="header">
                Välkommen till Boom
            </h1>
            <div className="buttons-container">
                <SquareButton label="Logga in" onClick={() => void 0} linkTo="/loginView/" className="login-button" />
                <SquareButton label="Skapa konto" onClick={() => void 0} linkTo="/startView/" className="create-acount-button" />
            </div>
            <img className="" src={cam_girl} alt="profilbild" />
        </div>


    );
}