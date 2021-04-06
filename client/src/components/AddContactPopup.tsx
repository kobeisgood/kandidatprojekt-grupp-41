import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import '../css/contact-card.css';
import '../css/textinput.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { SquareButton } from '../components/SquareButton';
import { useEffect, useState } from 'react';
import { GetSearchedContact, AddFoundContact } from '../Connection';
import { Contact } from '../Types';
import { TextInput } from './TextInput';


interface Props {
    socket: SocketIOClient.Socket | null,
    visibilityHandler: Function
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function
}

export const AddContactPopup = (props: Props) => {

    // The content rendered when we haven't searched for a contact yet
    const
        [neutralPageState, setNeutralPageState] = useState(true),
        [phoneNumberInput, setPhoneNumberInput] = useState(""),
        [faultyNumberDisplayed, setFaultyNumberDisplayed] = useState(""),
        [contactAddedState, setContactAddedState] = useState(false),
        [incorrectNumberState, setIncorrectNumberState] = useState(false),
        [ownNumber, setOwnNumber] = useState(false)

    const handlePhoneNumberInput = (event: any) => {
        setPhoneNumberInput(event.target.value);
    }

    const resetStates = () => {
        setNeutralPageState(true)
        setContactAddedState(false)
        setIncorrectNumberState(false)
        setOwnNumber(false)
    }

    // Closes the add contact popup
    const closeAddContactPopup = () => {
        props.visibilityHandler();
        resetStates()
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

        setIncorrectNumberState(false)
        setOwnNumber(false)

        setFaultyNumberDisplayed(phoneNumberInput)

        let contactNumber: string = phoneNumberInput


        // When you try to add yourself
        if (contactNumber == props.phoneNumber) {
            setNeutralPageState(false)
            setIncorrectNumberState(true)
            setOwnNumber(true)
           // alert("Du försöker lägga till dig själv dumhuve, försök med ett annat nummer")
           // return
        }

        // When you try to add someone you already have in your contacts
        //let foundBadNumber: boolean = false;
        let i;
        for (i = 0; i < props.contactList.length; i++) {
            var contact = props.contactList[i]
            if (contact.phoneNbr == contactNumber) {
                setNeutralPageState(false)
                setIncorrectNumberState(true)
               // foundBadNumber = true;
               // alert("Den här kontakten finns redan i din kontaktlista.... herrejevlar kmr du int håg nåting?")
               // break;
            }
        }
       /* if (foundBadNumber) {
            return
        }*/

        if (props.socket != null) {
            GetSearchedContact(props.socket, contactNumber, setFoundContact)
            setNeutralPageState(false)
        }
    };

    // Adds the contact to the user in the database
    const addContactDatabase = () => {
        if (props.socket != null && foundContact != null) {
            setContactAddedState(true)
            AddFoundContact(props.socket, foundContact, props.contactList, props.phoneNumber, props.setContactList)
        } else {
            console.log('No such contact!')
        }
    }

    // Adds the contact to the user on the frontend 
    const addContactFrontend = () => {
        if (foundContact != null) {
            props.contactList.push(foundContact)
            props.setContactList(props.contactList)
            closeAddContactPopup()
        }
    }

    // Renders the HTML content of the popup depending on if contact is found or not and when contact is added 
    const renderPopupContent = () => {
        return (
            <div className="content-column left-buffer">
               <h3>Lägg till kontakt</h3>

                {/* Neutral */}
                {neutralPageState &&
                    <>
                        <p className="popup-middle-sized-text">Skriv in mobilnumret för den du vill lägga till</p>
                        <div className="number-input-row">
                            <TextInput className="text-input w-400" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} /> 
                        </div>
                        <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Contact NOT found */}
                {foundContact == null && !neutralPageState && !contactAddedState &&
                    <>
                        <p className="popup-error-message">Fel Nummer! </p>
                        <p className="popup-middle-sized-text">Nummer {faultyNumberDisplayed}  hittas inte </p>
                        <p className="popup-middle-sized-text bottom-buffer">Kontrollera att du har skrivit rätt </p>
                        <div className="number-input-row">
                            <TextInput className="text-input w-400" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} /> 
                        </div>
                        <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Faulty Contact found(own number or someone already in list)*/}
                {foundContact != null && !neutralPageState && !contactAddedState && incorrectNumberState &&
                    <>
                        <p className="popup-error-message">Fel Nummer! </p>

                        {ownNumber ? <p className="popup-middle-sized-text">Nummer {faultyNumberDisplayed} är ditt egna nummer</p> : 
                            <p className="popup-middle-sized-text">Nummer {faultyNumberDisplayed} finns redan i din kontaktlista </p>}

                        <p className="popup-middle-sized-text bottom-buffer">Kontrollera att du har skrivit rätt </p>
                        <div className="number-input-row">
                            <TextInput className="text-input w-400" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} /> 
                        </div>
                        <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Contact found */}
                {foundContact != null && !neutralPageState && !contactAddedState && !incorrectNumberState && 
                    <>
                        <div className="contact-found-row">
                            <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="KontaktBild" />
                            <div className="contact-found-info-col">
                                <p className="found-contact-name">{foundContact.phoneNbr != "" ? foundContact.firstName : ""} {foundContact.phoneNbr != "" ? foundContact.lastName : ""} </p>
                                <p className="found-contact-number">{foundContact.phoneNbr != "" ? foundContact.phoneNbr : ""}</p>
                            </div>
                        </div>
                        <SquareButton label="Lägg till kontakt" onClick={addContactDatabase} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Contact added feedback */}
                {foundContact != null && !neutralPageState && contactAddedState && !incorrectNumberState &&
                    <>
                        <h4 className="popup-middle-sized-text bottom-buffer"> {foundContact.firstName} {foundContact.lastName} är nu tillagd i din telefonbok </h4>
                        <SquareButton label="Tillbaka till telefonboken" onClick={addContactFrontend} className="save-button handle-contact-button button" />
                    </>
                }

            </div>
        );
    };


    return (
        <div id="add-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">

                {!contactAddedState &&
                    <img className="cancel-button" src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeAddContactPopup}></img>}

                <div className="call-popup-flexbox-container">

                    {renderPopupContent()}

                </div>
            </div>
        </div>
    );
};