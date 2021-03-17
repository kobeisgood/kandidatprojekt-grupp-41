import { ContactCard } from '../components/ContactCard';
import '../css/phone-book.css';
import { Link } from 'react-router-dom';

export const PhoneBookView = () => {
    return (
        <div className="phone-book-container">
            <div className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <Link to="/"><button className="back-button">Tillbaka</button></Link>
                    <div className="phone-book-top-flexbox-column">
                        <p>Telefonbok</p>
                        <input type="text" className="search-contacts-input"/>
                    </div>
                    <button className="add-contact-button">Lägg till kontakt</button>
                    <button className="remove-contact-button">Ta bort kontakt</button>
                </div>
            </div>
            <div className="contact-cards-container">
                <div className="contact-cards-flexbox">
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
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