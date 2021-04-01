import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { Contact } from '../Types';
import { RemoveFoundContact } from '../Connection';

interface Props {
    socket: SocketIOClient.Socket | null,
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
        if (props.socket != null && props.contact != null) {
            RemoveFoundContact(props.socket, props.contact, props.contactList, props.phoneNumber, props.setContactList)
            closeDeleteContactPopup()
        } else {
            console.log('No such contact!')
        }

    }

    return (
        <div id="remove-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">

                    <div className="cancel-row"> <img src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeDeleteContactPopup}></img> </div>

                    <h4>Är du säker på att du vill ta bort {props.contact?.firstName} {props.contact?.lastName}?</h4>

                    <div className="button-row">
                        <button id="yes-button" className="yes-button" onClick={deleteContact}>
                            Ja
                        </button>
                        <button id="no-button" className="no-button" onClick={closeDeleteContactPopup}>
                            Nej
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )
}