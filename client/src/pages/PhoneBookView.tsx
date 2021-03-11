import { ContactCard } from '../components/ContactCard';
import '../css/phone-book.css';

export const PhoneBookView = () => {
    return (
        <div className="phone-book-container">
            <div className="phone-book-top-container">
                <div className="phone-book-top-flexbox-row">
                    <button className="back-button">Tillbaka</button>
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