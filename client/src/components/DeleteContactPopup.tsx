import { Contact } from '../Types';
import { RemoveFoundContact } from '../Connection';
import { SquareButton } from './SquareButton';

import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';

interface Props {
    visibilityHandler: Function
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function,
    contact: Contact | null
}

export const DeleteContactPopup = (props: Props) => {
    // Closes the delete contact popup
    const closeDeleteContactPopup = () => {
        props.visibilityHandler()
    }

    const deleteContact = () => {
        if (props.contact != null) {
            RemoveFoundContact(props.contact, props.contactList, props.phoneNumber, props.setContactList);
            closeDeleteContactPopup();
        } else
            console.log("No such contact!");
    }

    return (
        <div id="remove-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                <img className="cancel-button" src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeDeleteContactPopup}></img>
                <div className="call-popup-flexbox-container">
                    <h4>Är du säker på att du vill ta bort {props.contact?.firstName} {props.contact?.lastName}?</h4>
                    <div className="button-row">
                        <SquareButton className="yes-button" label={"Ja"} onClick={deleteContact} />
                        <SquareButton className="no-button" label={"Nej"} onClick={closeDeleteContactPopup} />
                    </div>

                </div>
            </div>
        </div>
    );
};