import { Contact } from "../Types";

import '../css/popups.css';
import '../css/colors.css';
import '../css/contact-card.css';
import '../css/carousel.css';

import darkCrossIcon from '../icons/dark-cross-icon.svg';

interface Props {
    contact: Contact | undefined, 
    visibilityHandler: Function
}


export const ContactPopup = (props:Props) => {

    return(
        <div className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
            <img className="cancel-button" src={darkCrossIcon} alt="DarkCrossIcon" onClick={() => props.visibilityHandler()}></img>
                {props.contact?.firstName} {props.contact?.lastName} {props.contact?.phoneNbr}
            </div>
        </div>
    )

}