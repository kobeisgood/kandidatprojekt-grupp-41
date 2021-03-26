/* 
    View for the phone book
    Authors: Daniel and Robin
 */

import { ContactCard } from '../components/ContactCard';
import '../css/phone-book.css';
import '../css/colors.css';
import { Link } from 'react-router-dom';
import addContactIcon from '../icons/add-contact-icon.svg';
import removeContactIcon from '../icons/remove-contact-icon.svg';
import { BackButton } from '../components/BackButton';
import { SquareButton } from '../components/SquareButton';

export const PhoneBookView = () => {
    return (
        <div className="phone-book-container">
            <header className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <div className="back-button-container">
                        <BackButton linkTo={"/"} />
                    </div>
                    <div className="phone-book-top-flexbox-column">
                        <h1 className="phone-book-text">Telefonbok</h1>
                        <input type="text" placeholder="Sök efter kontakt..." className="search-contacts-input" />
                    </div>
                    <div className="contact-buttons-container">
                        {/* TODO
                            - Add function to add contact
                            - Add function to remove contact
                             */}
                        <SquareButton label="Lägg till kontakt" onClick={() => void 0} icon={addContactIcon} className="add-contact-button" />
                        <SquareButton label="Ta bort kontakt" onClick={() => void 0} icon={removeContactIcon} className="remove-contact-button" />
                    </div>
                </div>
            </header>
            <div className="contact-cards-container">
                <div className="contact-cards-flexbox">
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                </div>
            </div>
        </div>
    );
};