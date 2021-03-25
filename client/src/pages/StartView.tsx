/* View for the start page 'Välkommen till boom'
Authors: Hanna 
*/
import React from 'react';
import { SquareButton } from '../components/SquareButton';
import '../css/start.css';


export const Start = () => {
    function ButtonNameClicked() {}

    return (
        <div>
            <h1 className="header">
                Välkommen till Boom
            </h1>
            <div className="buttons-container">
                <SquareButton label="Skapa konto" onClick={() => void 0} linkTo="/dashboard" className="create-acount-button" />
                <SquareButton label="Logga in" onClick={() => void 0} linkTo="/login" className="login-button" />
            </div>
        </div>
    );
}