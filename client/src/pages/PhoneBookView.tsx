/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import { AddContactPopup } from '../components/AddContactPopup';
import { DeleteContactPopup } from '../components/DeleteContactPopup';
import { Contact } from '../Types';
import { useState } from 'react';

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

let selectedContact: { name: string, phoneNbr: string };
    
const setSelectedContact = (contact: { name: string, phoneNbr: string }) => {
    selectedContact = contact;
};

export const PhoneBookView = (props: Props) => {
    const [removeContactState, setRemoveContactState] = useState(false);
    const [addContactVisible, setAddContactVisible] = useState(false);
    const [deleteContactVisible, setDeleteContactVisible] = useState(false);

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
                    <div className="back-button-phonebook-container">
                        <BackButton linkTo="/dashboard" />
                    </div>
                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>
                    <div className="contact-buttons-container">
                        <SquareButton label="Lägg till kontakt" onClick={addContactVisibleHandler} icon={addContactIcon} className="add-contact-button" />
                        <SquareButton label={!removeContactState ? "Ta bort kontakt" : "Avbryt"} onClick={removeContactClicked} icon={removeContactIcon} className="remove-contact-button" />
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
                                setSelectedContact={setSelectedContact}
                                setDeleteContactVisible={() => setDeleteContactVisible(true)}
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

            {deleteContactVisible &&
                <DeleteContactPopup
                    contact={props.contactList.find((contact) => {
                        if (contact.phoneNbr == selectedContact.phoneNbr)
                            return contact;
                        else
                            return null;
                    })}
                    contactInfo={selectedContact}
                    socket={props.socket}
                    contactList={props.contactList}
                    phoneNumber={props.phoneNumber}
                    setContactList={props.setContactList}
                    closePopup={() => setDeleteContactVisible(false)}
                />
            }
        </div>
    );
};