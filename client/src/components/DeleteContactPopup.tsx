import '../css/call.css';
import '../css/buttons.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';
import { Contact } from '../Types';
import { RemoveFoundContact } from '../Connection';
import { SquareButton } from './SquareButton';
import { useState } from 'react';

interface Props {
    socket: SocketIOClient.Socket | null,
    visibilityHandler: Function
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function,
    contact: Contact | null
}

export const DeleteContactPopup = (props: Props) => {

    const [contactDeletedState, setContactDeletedState] = useState(false)

    // Closes the delete contact popup
    const closeDeleteContactPopup = () => {
        setContactDeletedState(false)
        props.visibilityHandler()
    }

    // Contact is deleted in db
    const deleteContactBackend = () => {
        if (props.socket != null && props.contact != null) {
            RemoveFoundContact(props.socket, props.contact, props.contactList, props.phoneNumber, props.setContactList)
            setContactDeletedState(true)
        } else {
            console.log('No such contact!')
        }
    }

    // Contact is deleted on the frontend
    const deleteContactFrontend = () => {
        if (props.contact != null) {
            var indexToRemove = props.contactList.indexOf(props.contact)
            if (indexToRemove > -1) {
                props.contactList.splice(indexToRemove, 1);
            } else {
                console.log("Tried to remove who does not exist?!");
            }
            props.setContactList(props.contactList)
        }
        closeDeleteContactPopup()
    }


    const contactDeletedFeedback = () => {
        return (
            <>
                <div className="call-popup-flexbox-container">
                    <h4 className="popup-middle-sized-text bottom-buffer"> {props.contact?.firstName} {props.contact?.lastName} är nu borttagen från din telefonbok </h4>
                    <SquareButton label="Tillbaka till telefonboken" onClick={deleteContactFrontend} className="save-button handle-contact-button button" />
                </div>
            </>
        )
    }

    const renderPopupContent = () => {
        return (
            <>
                {contactDeletedState && contactDeletedFeedback()}
                {!contactDeletedState &&
                    <>
                        <h4 className="popup-middle-sized-text">Är du säker på att du vill ta bort {props.contact?.firstName} {props.contact?.lastName}?</h4>
                        <div className="button-row">
                            <SquareButton className="yes-button" label={"Ja"} onClick={deleteContactBackend} />
                            <SquareButton className="no-button" label={"Nej"} onClick={closeDeleteContactPopup} />
                        </div>
                    </>}
            </>
        )
    }

    return (
        <div id="remove-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                {!contactDeletedState &&
                    <img className="cancel-button" src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeDeleteContactPopup}></img>}
                <div className="call-popup-flexbox-container left-buffer">
                    {renderPopupContent()}
                </div>
            </div>

        </div>

    )
}