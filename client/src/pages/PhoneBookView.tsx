/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import { DeleteContactPopup } from '../components/DeleteContactPopup';
import { AddContactPopup } from '../components/AddContactPopup';
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
    setPeerName: Function
}

export const PhoneBookView = (props: Props) => {
    const [removeContactState, setRemoveContactState] = useState(false);
    const [addContactVisible, setAddContactVisible] = useState(false);
    const [removeContactVisible, setRemoveContactVisible] = useState(false);

    // Handles only the cross above the contact card
    const removeContactClicked = () => {
        setRemoveContactState(!removeContactState)
    }

    const addContactVisibleHandler = () => {
        setAddContactVisible(!addContactVisible)
    }

    const removeContactVisibleHandler = () => {
        setRemoveContactVisible(!removeContactVisible)
    }
    
    return (
        <div className="phone-book-container">
            <header className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <div className="back-button-container">
                        <BackButton linkTo="/dashboard" />
                    </div>
                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>
                    <div className="contact-buttons-container">
                        {!removeContactState &&
                          <SquareButton label="Lägg till kontakt" onClick={addContactVisibleHandler} icon={addContactIcon} className="add-contact-button" />
                        }
        
                        <SquareButton label={!removeContactState ? "Ta bort kontakt" : "Avbryt" } onClick={removeContactClicked} icon={removeContactIcon} className="remove-contact-button" />
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
                            visibilityHandler={removeContactVisibleHandler}
                            onCall={() => {
                                props.setPeerName(contact.firstName + " " + contact.lastName); props.onCall(contact.phoneNbr)
                            }} />
                        )
                    })}
                </div>
            </div>

            {removeContactVisible &&
                <DeleteContactPopup visibilityHandler={removeContactVisibleHandler} /> 
            }

            {addContactVisible && 
                <AddContactPopup visibilityHandler={addContactVisibleHandler} socket={props.socket} /> 
            }
        </div>
    );
};