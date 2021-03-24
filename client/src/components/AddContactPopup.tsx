import '../css/call.css';
import '../css/button.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { SquareButton } from '../components/SquareButton';
import { useState } from 'react';

const closeAddContactPopup = () => {
    var element = document.getElementById("add-contact-popup");
    if(element != null) {
        element.style.visibility = 'hidden'
    }
};

const test = () => {
    console.log("ahaaa")
}

export const AddContactPopup = () => {

    const [contactFoundState, setContactFoundState] = useState(false)
    const [contactNotFoundState, setContactNotFoundState] = useState(false)


    return (
        <div id="add-contact-popup" className="full-page-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">

                    <div className="cancel-row"> <img src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeAddContactPopup}></img> </div>

                    <div className="content-column">
                        <h3>Lägg till kontakt</h3>
                        <p>Skriv in mobilnumret för den du vill lägga till</p>
                        <div className="number-input-row">
                            <p>Mobilnummer:</p>
                            <input id="add-contact-number-input" type="number" placeholder="Skriv mobilnummer här..."></input>
                        </div>
                        <SquareButton label="Sök efter Boom kontakt" onClick={test} className="search-contact-button button-rectangular button" />
                    </div>

                </div>
            </div>

        </div>

    )
}