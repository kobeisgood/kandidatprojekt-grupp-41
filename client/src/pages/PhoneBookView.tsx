/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import { AddContactPopup } from '../components/AddContactPopup';
import { Contact } from '../Types';
import { useRef, useState } from 'react';

import '../css/phone-book.css';
import '../css/colors.css';
import addContactIcon from '../icons/add-contact-icon.svg';
import removeContactIcon from '../icons/remove-contact-icon.svg';
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';

interface Props {
    contactList: Contact[]
    socket: SocketIOClient.Socket | null,
    onCall: Function,
    phoneNumber: string,
    setContactList: Function
    setPeer: Function
}

export const PhoneBookView = (props: Props) => {
    const [removeContactState, setRemoveContactState] = useState(false);
    const [addContactVisible, setAddContactVisible] = useState(false);

    const addContactButtonRef = useRef(null)

    // Handles only the cross above the contact card
    const removeContactClicked = () => {
        setRemoveContactState(!removeContactState)
    }

    const addContactVisibleHandler = () => {
        setAddContactVisible(!addContactVisible)
        setRemoveContactState(false)
    }

    return (
        <div className="phone-book-container">
            <header className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <div className="phone-book-header-element">
                        <div className="back-button-phonebook-container">
                            <BackButton linkTo="/dashboard" />
                        </div>
                    </div>

                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>

                    <div className="contact-buttons-container">
                        <div className="contact-button-container">
                            <SquareButton label="Lägg till kontakt" onClick={addContactVisibleHandler} icon={addContactIcon} className="add-contact-button" />
                        </div>

                        <div className="contact-button-container">
                            <SquareButton label={!removeContactState ? "Ta bort kontakt" : "Avbryt"} onClick={removeContactClicked} icon={removeContactIcon} className="remove-contact-button" />
                        </div>
                    </div>
                </div>
            </header>
            <div className="contact-cards-container">
                <div className="contact-cards-flexbox">
                    {props.contactList.map((contact: Contact) => {
                        return (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                removeContactState={removeContactState}
                                onCall={() => {
                                    props.setPeer({ number: contact.phoneNbr, name: contact.firstName + " " + contact.lastName }); props.onCall(contact.phoneNbr);
                                }}
                                socket={props.socket}
                                contactList={props.contactList}
                                phoneNumber={props.phoneNumber}
                                setContactList={props.setContactList}
                            />
                        )
                    })}
                </div>
            </div>

            {addContactVisible &&
                <AddContactPopup
                    visibilityHandler={addContactVisibleHandler}
                    socket={props.socket}
                    contactList={props.contactList}
                    phoneNumber={props.phoneNumber}
                    setContactList={props.setContactList}
                />
            }
        </div>
    );
};