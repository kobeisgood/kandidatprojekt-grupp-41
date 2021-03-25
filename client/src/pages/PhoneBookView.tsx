/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import { DeleteContactPopup } from '../components/DeleteContactPopup';
import { AddContactPopup } from '../components/AddContactPopup';
import '../css/phone-book.css';
import '../css/colors.css';
import { Link } from 'react-router-dom';
import AddContactIcon from '../icons/add-contact-icon.svg';
import RemoveContactIcon from '../icons/remove-contact-icon.svg';
import { Contact } from '../Types';
import { useState } from 'react';

interface Props {
    contactList: Contact[]
}

// Opens the add contact popup
    const openAddContactPopup = () => {
    var element = document.getElementById("add-contact-popup");
    if(element != null) {
        element.style.visibility = 'visible'
    }
}   
export const PhoneBookView = (props: Props) => {
    const [removeContactState, setRemoveContactState] = useState(false);

    const removeContactClicked = () => {
        setRemoveContactState(!removeContactState)
    }
    
    return (
        <div className="phone-book-container">
            <header className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <div className="back-button-container">
                        <Link to="/dashboard"><button className="back-button">Tillbaka</button></Link>
                    </div>
                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>
                    <div className="contact-buttons-container">
                        <button className="add-contact-button" onClick={openAddContactPopup}>
                            <div className="contact-button-flexbox">
                                <img src={AddContactIcon} alt="" className="contact-button-image" />
                                <p className="contact-button-text">Lägg till kontakt</p>
                            </div>
                        </button>
                        <button className="remove-contact-button" onClick={removeContactClicked}>
                            <div className="contact-button-flexbox">
                                <img src={RemoveContactIcon} alt="" className="contact-button-image" />
                                {removeContactState === false ? <p className="contact-button-text">Ta bort kontakt</p> :
                                    <p className="contact-button-text">Avbryt</p>}
                            </div>
                        </button>
                    </div>
                </div>
            </header>
            <div className="contact-cards-container">
                <div className="contact-cards-flexbox">
                    {props.contactList.map((contact: Contact) => {
                        return <ContactCard contact={contact} removeContactState={removeContactState} />
                    })}
                </div>
            </div>

            {removeContactState &&
                <DeleteContactPopup /> 
            }

            <AddContactPopup />
        </div>
    );
};