/**
 * Component for when you press a contact card in the phonebook view 
 * 
 */

import { Contact } from "../Types";
import { SquareButton } from './SquareButton';

import '../css/popups.css';
import '../css/colors.css';
import '../css/contact-card.css';
import '../css/carousel.css';

import darkCrossIcon from '../icons/dark-cross-icon.svg';
import hjordis from '../images/hjordis.jpg';
import callIcon from '../icons/call-icon.svg';

interface Props {
    contact: Contact | undefined,
    visibilityHandler: Function,
    onCall: Function,
}

export const ContactPopup = (props: Props) => {

    return (
        <div className="full-page-popup-container">       
                <div className="contact-card-container-big-contact-popup">
                    <img className="cancel-button" src={darkCrossIcon} alt="DarkCrossIcon" onClick={() => props.visibilityHandler()}></img>
                    <div className="contact-card-flexbox left-buffer">
                        <img className="contact-card-profile-picture-big" src={hjordis} alt="Profilbild" />
                        <p className="contact-name-big">{
                            props.contact?.firstName}
                            <br />
                            <span> {props.contact?.lastName}</span>
                        </p>
                        <p className="contact-name-big"> {props.contact?.phoneNbr} </p>
                        <SquareButton
                            label="Ring"
                            onClick={() => {
                                props.visibilityHandler();
                                props.onCall();
                            }}
                            icon={callIcon}
                            className="call-button-big-contact-popup" />
                    </div>
                </div>
        </div>
    )
}