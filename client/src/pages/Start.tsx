/* View for the profile page 'Min profil'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/start.css';
import { SquareButton } from '../components/SquareButton';




export const Start = () => {
    // Event handler for clicking back button and the change name button etc. 
    const ButtonNameClicked = () => {

    }


    return (
        <div>
            <h1 className="header">
                Välkommen till Boom
            </h1>
            <div className="buttons-container">
                <SquareButton label={"Logga in"} onClick={ButtonNameClicked} linkTo="/LoginView" />
            </div>
        </div>


    );
}