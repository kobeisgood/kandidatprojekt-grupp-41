import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import '../css/contact-card.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { SquareButton } from '../components/SquareButton';
import { useState } from 'react';
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
        [faultyNumberDisplayed, setFaultyNumberDisplayed] = useState("")

    const handlePhoneNumberInput = (event: any) => {
        setPhoneNumberInput(event.target.value);
    }


    // Closes the add contact popup
    const closeAddContactPopup = () => {
        setNeutralPageState(true)
        props.visibilityHandler();
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

        setFaultyNumberDisplayed(phoneNumberInput)

        let contactNumber: string = phoneNumberInput
        

        // When you try to add yourself
        if (contactNumber == props.phoneNumber) {
            alert("Du försöker lägga till dig själv dumhuve, försök med ett annat nummer")
            return
        }

        // When you try to add someone you already have in your contacts
        let foundBadNumber: boolean = false;
        let i;
        for (i = 0; i < props.contactList.length; i++) {
            var contact = props.contactList[i]
            if (contact.phoneNbr == contactNumber) {
                foundBadNumber = true;
                alert("Den här kontakten finns redan i din kontaktlista.... herrejevlar kmr du int håg nåting?")
                break;
            }
        }
        if (foundBadNumber) {
            return
        }

        if (props.socket != null) {
            GetSearchedContact(props.socket, contactNumber, setFoundContact)
            setNeutralPageState(false)
        }

        //setPhoneNumberInput("")
    };

    // Adds the contact to the user
    const addContact = () => {

        if (props.socket != null && foundContact != null) {
            AddFoundContact(props.socket, foundContact, props.contactList, props.phoneNumber, props.setContactList)
            setNeutralPageState(true)
            closeAddContactPopup()
        } else {
            console.log('No such contact!')
        }
    }

    // Renders the HTML content of the popup depending on if contact is found or not
    const renderPopupContent = () => {
        return (
            <div className="content-column">
                <h3>Lägg till kontakt</h3>

                {/* Contact NOT found */}
                {foundContact == null && !neutralPageState &&
                    <>
                        <p className="popup-error-message">Fel Nummer! </p>
                        <p className="popup-middle-sized-text">Nummer {faultyNumberDisplayed}  hittas inte </p>
                        <p className="popup-middle-sized-text bottom-buffer">Kontrollera att du har skrivit rätt </p>
                        <TextInput label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} /> {/*TODO: make text inputs nice after merge*/}
                        <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Contact found */}
                {foundContact != null && !neutralPageState &&
                    <>
                        <div className="contact-found-row">
                            <img className="contact-card-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="KontaktBild" />
                            <div className="contact-found-info-col">
                                <p className="found-contact-name">{foundContact.phoneNbr != "" ? foundContact.firstName : ""} {foundContact.phoneNbr != "" ? foundContact.lastName : ""} </p>
                                <p className="found-contact-number">{foundContact.phoneNbr != "" ? foundContact.phoneNbr : ""}</p>
                            </div>
                        </div>
                        <SquareButton label="Lägg till kontakt" onClick={addContact} className="save-button handle-contact-button button" />
                    </>
                }

                {/* Neutral */}
                {neutralPageState &&
                    <>
                        <p className="popup-middle-sized-text">Skriv in mobilnumret för den du vill lägga till</p>
                        <TextInput label="Mobilnummer:" type="text" placeholder="Skriv mobilnummer här..." onChange={handlePhoneNumberInput} maxLength={10} /> {/*TODO: make text inputs nice after merge*/}
                        <SquareButton label="Sök efter Boom kontakt" onClick={searchContact} className="save-button handle-contact-button button" />
                    </>
                }
            </div>
        );
    };


    return (
        <div id="add-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">

                <img className="cancel-button" src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeAddContactPopup}></img>

                <div className="call-popup-flexbox-container">

                    {renderPopupContent()}

                </div>
            </div>
        </div>
    );
};