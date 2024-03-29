import { useState } from 'react';
import { Contact } from '../Types';
import { GetSearchedContact, AddFoundContact } from '../Connection';
import { SquareButton } from '../components/SquareButton';
import { TextInput } from './TextInput';

import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import '../css/contact-card.css';
import darkCrossIcon from '../icons/dark-cross-icon.svg';


interface Props {
    visibilityHandler: Function
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function,
    profilePic: Function
}

export const AddContactPopup = (props: Props) => {
    // The content rendered when we haven't searched for a contact yet
    const
        [neutralPageState, setNeutralPageState] = useState(true),
        [phoneNumberInput, setPhoneNumberInput] = useState(""),
        [faultyNumberDisplayed, setFaultyNumberDisplayed] = useState(""),
        [contactAddedState, setContactAddedState] = useState(false),
        [incorrectNumberState, setIncorrectNumberState] = useState(false),
        [ownNumber, setOwnNumber] = useState(false),
        [foundContact, setFoundContact] = useState({
            id: "",
            firstName: "",
            lastName: "",
            phoneNbr: "",
            profilePic: "",

        });

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

    // Searches for contact in db, renders correct content in popup
    const searchContact = () => {

        // reseting states
        setIncorrectNumberState(false)
        setOwnNumber(false)

        setFaultyNumberDisplayed(phoneNumberInput)

        let contactNumber: string = phoneNumberInput


        // When you try to add yourself
        if (contactNumber === props.phoneNumber) {
            setNeutralPageState(false)
            setIncorrectNumberState(true)
            setOwnNumber(true)
        }

        // When you try to add someone you already have in your contacts
        for (let i = 0; i < props.contactList.length; i++) {
            var contact = props.contactList[i]
            if (contact.phoneNbr === contactNumber) {
                setNeutralPageState(false)
                setIncorrectNumberState(true)
            }
        }

        GetSearchedContact(contactNumber, setFoundContact)
        setNeutralPageState(false)
    };

    // Adds the contact to the user in the database
    const addContact = () => {
        if (foundContact != null) {
            setContactAddedState(true)
            AddFoundContact(foundContact, props.phoneNumber, props.setContactList)
        } else {
            console.log('No such contact!')
        };
    }

    // Renders content if user has inputed a faulty number(own, already existing, non-existing)
    const searchValidationErrors = () => {
        return (
            <>
                {/* Contact NOT found */}
                {foundContact === null && !neutralPageState && !contactAddedState &&
                    <>
                        <p className="popup-error-message">Kunde ej hitta det angivna numret!</p>
                        <p className="popup-middle-sized-text">Du skrev in {faultyNumberDisplayed}.</p>
                        <p className="popup-middle-sized-text bottom-buffer">Vänligen dubbelkolla att detta stämmer och försök sedan igen.</p>
                        <div className="number-input-row">
                            <TextInput className="text-input-add-contact-number" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} />
                        </div>
                        <SquareButton label="Sök efter kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Faulty Contact found(own number or someone already in list)*/}
                {foundContact != null && !neutralPageState && !contactAddedState && incorrectNumberState &&
                    <>
                        {ownNumber ?
                            <>
                                <p className="popup-error-message">Du har angett ditt egna nummer!</p>
                                <p className="popup-middle-sized-text">{faultyNumberDisplayed} är ditt egna nummer och kan inte läggas till.</p>
                            </>
                            :
                            <>
                                <p className="popup-error-message">Kontakt finns redan!</p>
                                <p className="popup-middle-sized-text">Nummer {faultyNumberDisplayed} finns redan i din kontaktlista </p>
                            </>
                        }

                        <div className="number-input-row">
                            <TextInput className="text-input-add-contact-number" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} />
                        </div>
                        <SquareButton label="Sök efter kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

            </>)
    }

    // Renders feedback when contact added
    const addContactFeedback = () => {
        return (
            <>
                {foundContact != null && !neutralPageState && contactAddedState && !incorrectNumberState &&
                    <>
                        <h4 className="popup-middle-sized-text big-bottom-buffer right-buffer"> {foundContact.firstName} {foundContact.lastName} är nu tillagd i din telefonbok </h4>
                        <SquareButton label="Tillbaka till telefonboken" onClick={closeAddContactPopup} className="save-button handle-contact-button button right-buffer" />
                    </>
                }

            </>
        )
    }

    // Renders the HTML content of the popup depending on if contact is found or not and when contact is added 
    const renderPopupContent = () => {
        return (
            <div className="content-column left-buffer">
                {foundContact != null && !neutralPageState && contactAddedState && !incorrectNumberState ?
                    <h3 className="right-buffer bottom-buffer">Lägg till kontakt</h3> : <h3>Lägg till kontakt</h3>}

                {/* Neutral */}
                {neutralPageState &&
                    <>
                        <p className="popup-middle-sized-text">Fyll i mobilnumret för den person du vill lägga till i din telefonbok.</p>
                        <div className="number-input-row">
                            <TextInput className="text-input-add-contact-number" label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} />
                        </div>
                        <SquareButton label="Sök efter kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {searchValidationErrors()}

                {/* Contact found */}
                {foundContact != null && !neutralPageState && !contactAddedState && !incorrectNumberState &&
                    <>
                        <div className="contact-found-row">
                            <img className="contact-card-profile-picture" src={props.profilePic(foundContact.profilePic)} alt="KontaktBild" />
                            <div className="contact-found-info-col">
                                <p className="found-contact-name">{foundContact.phoneNbr !== "" ? foundContact.firstName : ""} {foundContact.phoneNbr !== "" ? foundContact.lastName : ""} </p>
                                <p className="found-contact-number">{foundContact.phoneNbr !== "" ? foundContact.phoneNbr : ""}</p>
                            </div>
                        </div>
                        <SquareButton label="Lägg till kontakt" onClick={addContact} className="save-button handle-contact-button button" />
                    </>
                }

                {addContactFeedback()}
            </div>
        );
    };

    return (
        <div id="add-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">

                {!contactAddedState &&
                    <img className="cancel-button" src={darkCrossIcon} alt="DarkCrossIcon" onClick={closeAddContactPopup}></img>}

                <div className="call-popup-flexbox-container">
                    {renderPopupContent()}
                </div>
            </div>
        </div>
    );
};