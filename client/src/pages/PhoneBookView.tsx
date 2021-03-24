/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import '../css/phone-book.css';
import '../css/colors.css';
import { Link } from 'react-router-dom';
import AddContactIcon from '../icons/add-contact-icon.svg';
import RemoveContactIcon from '../icons/remove-contact-icon.svg';
import { Contact } from '../Types';

interface Props {
    contactList: Contact[]
}

export const PhoneBookView = (props: Props) => {
    return (
        <div className="phone-book-container">
            <header className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <div className="back-button-container">
                        <Link to="/start"><button className="back-button">Tillbaka</button></Link>
                    </div>
                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>
                    <div className="contact-buttons-container">
                        <button className="add-contact-button">
                            <div className="contact-button-flexbox">
                                <img src={AddContactIcon} alt="" className="contact-button-image" />
                                <p className="contact-button-text">Lägg till kontakt</p>
                            </div>
                        </button>
                        <button className="remove-contact-button">
                            <div className="contact-button-flexbox">
                                <img src={RemoveContactIcon} alt="" className="contact-button-image" />
                                <p className="contact-button-text">Ta bort kontakt</p>
                            </div>
                        </button>
                    </div>
                </div>
            </header>
            <div className="contact-cards-container">
                <div className="contact-cards-flexbox">
                    {props.contactList.map((contact: Contact) => {
                        return <h1>{contact.firstName}</h1>
                    })}
                </div>
            </div>
        </div>
    );
};