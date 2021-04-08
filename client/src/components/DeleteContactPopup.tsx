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
    contactList: Contact[],
    phoneNumber: string,
    setContactList: Function,
    contact: Contact | undefined,
    contactInfo: { name: string, phoneNbr: string},
    closePopup: Function
}

export const DeleteContactPopup = (props: Props) => {
    const [contactDeletedState, setContactDeletedState] = useState(false);

    // Contact is deleted in db
    const deleteContact = () => {
        if (props.socket != undefined && props.contact != undefined) {
            setContactDeletedState(true)
            RemoveFoundContact(props.socket, props.contact, props.contactList, props.phoneNumber, props.setContactList)         
        } else {
            console.log('No such contact!')
        }
    }


    const contactDeletedFeedback = () => {
        return (
            <>
                <div className="call-popup-flexbox-container">
                    <h4 className="popup-middle-sized-text bottom-buffer">{props.contactInfo.name} är nu borttagen från din telefonbok </h4>
                    <SquareButton label="Tillbaka till telefonboken" onClick={props.closePopup} className="save-button handle-contact-button button" />
                </div>
            </>
        )
    }

    const renderPopupContent = () => {
        return (
            <>
                {contactDeletedState && 
                    contactDeletedFeedback()
                }

                {!contactDeletedState &&
                    <>
                        <h4 className="popup-middle-sized-text">Är du säker på att du vill ta bort {props.contactInfo.name}?</h4>
                        <div className="button-row">
                            <SquareButton className="yes-button" label={"Ja"} onClick={deleteContact} />
                            <SquareButton className="no-button" label={"Nej"} onClick={props.closePopup} />
                        </div>
                    </>}
            </>
        )
    }

    return (
        <div id="remove-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                {!contactDeletedState &&
                    <img className="cancel-button" src={DarkCrossIcon} alt="DarkCrossIcon" onClick={() => props.closePopup()}></img>}
                <div className="call-popup-flexbox-container left-buffer">
                    {renderPopupContent()}
                </div>
            </div>
        </div>
    )
}