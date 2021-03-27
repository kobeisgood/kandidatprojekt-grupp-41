import '../css/call.css';
import '../css/button.css';
import '../css/savebutton.css';
import '../css/popups.css';
import '../css/contact-card.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { SquareButton } from '../components/SquareButton';
import { useState } from 'react';
import { Contact } from '../Types';
import { FindContactNumber, GetSearchedContact } from '../Connection';


interface Props {
    socket: SocketIOClient.Socket | null,
}

export const AddContactPopup = (props:Props) => {

    // The content rendered when we haven't searched for a contact yet
    const [neutralPageState, setNeutralPageState] = useState(true);

    // Closes the add contact popup
    const closeAddContactPopup = () => {
        var element = document.getElementById("add-contact-popup");
        if (element != null) {
            element.style.visibility = 'hidden'
        }
        setNeutralPageState(true)
    };

    const [foundContact, setFoundContact] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phoneNbr: "",
        profilePic: "",

    });

    // Searches for contact in db, renders correct content in popup
    const searchContact = () => {

        let contactNumber: string = (document.getElementById("add-contact-number-input") as HTMLInputElement).value;

            if(props.socket != null){
                GetSearchedContact(props.socket, contactNumber, setFoundContact)
                setNeutralPageState(false)
            }

        (document.getElementById("add-contact-number-input") as HTMLInputElement).value = "";
    };

    // Adds the contact to the user
    const addContact = () => {

        // create function in main/connection/db that adds foundContact to user 
            // closeAddContactPopup()
        console.log('Contact added')
    }

    // Renders the HTML content of the popup depending on if contact is found or not
    const renderPopupContent = () => {

        // Contact NOT found
        if (foundContact == null && !neutralPageState) {
            return (
                <div className="content-column">
                    <h3>Lägg till kontakt</h3>
                    <p>Fel Nummer! </p>
                    <p>Nummer *nummer*  hittas inte </p>
                    <p>Kontrollera att du har skrivit rätt </p>
                    <div className="number-input-row">
                        <p>Mobilnummer:</p>
                        <input id="add-contact-number-input" type="number" placeholder="Skriv mobilnummer här..."></input>
                    </div>
                    <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                </div>
            )
        }

        // Contact found
        if (foundContact != null && !neutralPageState) {
            return (
                <div className="content-column">
                    <h3>Lägg till kontakt</h3>
                    <div className="contact-found-row">
                        <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="KontaktBild" />
                        <div className="contact-found-info-col">
                            <p>{foundContact.phoneNbr != "" ? foundContact.firstName : ""}</p>
                            <p>{foundContact.phoneNbr != "" ? foundContact.lastName : ""}</p>
                            <p>{foundContact.phoneNbr != "" ? foundContact.phoneNbr : ""}</p>
                        </div>
                    </div>
                    <SquareButton label="Lägg till kontakt" onClick={addContact} className="save-button handle-contact-button button" />
                </div>
            )
        }

        // Neutral
        if (neutralPageState) {
            return (
                <div className="content-column">
                    <h3>Lägg till kontakt</h3>
                    <p>Skriv in mobilnumret för den du vill lägga till</p>
                    <div className="number-input-row">
                        <p>Mobilnummer:</p>
                        <input id="add-contact-number-input" type="number" placeholder="Skriv mobilnummer här..."></input>
                    </div>
                    <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                </div>
            )
        }

       
    };

    


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