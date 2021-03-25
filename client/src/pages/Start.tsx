/* View for the start page 'Välkommen till boom'
Authors: Hanna 
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/start.css';
import { SquareButton } from '../components/SquareButton';




export const Start = () => {
    function ButtonNameClicked() {
    }


    return (
        <div>
            <h1 className="header">
                Välkommen till Boom
            </h1>
            <div className="buttons-container">
                <SquareButton label="Skapa konto" onClick={() => void 0} linkTo="/startView/" className="create-acount-button" />
                <SquareButton label="Logga in" onClick={() => void 0} linkTo="/loginView/" className="login-button" />
            </div>
        </div>


    );
}