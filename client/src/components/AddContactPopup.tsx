import '../css/call.css';
import '../css/button.css';
import '../css/popups.css';
import '../css/contact-card.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { SquareButton } from '../components/SquareButton';
import { useState } from 'react';

// Closes the add contact popup
const closeAddContactPopup = () => {
    var element = document.getElementById("add-contact-popup");
    if (element != null) {
        element.style.visibility = 'hidden'
    }
};


export const AddContactPopup = () => {

    const [contactFoundState, setContactFoundState] = useState(false)
    const [contactNotFoundState, setContactNotFoundState] = useState(false)

    // Searches for contact in db
    const searchContact = () => {
        // check in db for number
        // if number(user) exists
            // return new content ---> contactFound(), renderPopupContent()
            // save data from the user in something
            // get profile pic, name and number 
        // else
            // return new content ---> contactNotFound(), renderPopupContent()
        console.log("ahaaa")
    };

    const contactFound = () => {
        setContactFoundState(true);
        setContactNotFoundState(false)
    };

    const contactNotFound = () => {
        setContactNotFoundState(true)
        setContactFoundState(false)
    };

    // Renders the HTML content of the popup depending on if contact is found or not
    const renderPopupContent = () => {
        let contactNotFound = contactNotFoundState;
        let contactFound = contactFoundState;

        if (contactNotFound) {
            return (
                <div className="content-column">
                    <h3>Lägg till kontakt</h3>
                    <p>Fel Nummer! </p>
                    <p>Nummer *nummer* hittas inte </p>
                    <p>Kontrollera att du har skrivit rätt </p>
                    <div className="number-input-row">
                        <p>Mobilnummer:</p>
                        <input id="add-contact-number-input" type="number" placeholder="Skriv mobilnummer här..."></input>
                    </div>
                    <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="search-contact-button button-rectangular button" />
                </div>
            )
        }

        if (contactFound) {
            return (
                <div className="content-column">
                    <h3>Lägg till kontakt</h3>
                    <div className="contact-found-row">
                        <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="KontaktBild" />
                        <div className="contact-found-info-col">
                            <p>*contactName*</p>
                            <p>*contactNumber*</p>
                        </div>
                    </div>
                    <SquareButton label="Lägg till kontakt" onClick={addContact} className="handle-contact-button button-rectangular button" />
                </div>
            )
        }

        return (
            <div className="content-column">
                <h3>Lägg till kontakt</h3>
                <p>Skriv in mobilnumret för den du vill lägga till</p>
                <div className="number-input-row">
                    <p>Mobilnummer:</p>
                    <input id="add-contact-number-input" type="number" placeholder="Skriv mobilnummer här..."></input>
                </div>
                <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="handle-contact-button button-rectangular button" />
            </div>
        )
    };

    // Adds the contact to the user
    const addContact = () => {
        // check in db for contact(user)
        // if contact(user) exists
            // add contact to user in db
            // closeAddContactPopup()
        // else
            // return error
        console.log('Contact added')
    }


    return (
        <div id="add-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">

                    <div className="cancel-row"> <img src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeAddContactPopup}></img> </div>

                    {renderPopupContent()}

                </div>
            </div>

        </div>

    )
}