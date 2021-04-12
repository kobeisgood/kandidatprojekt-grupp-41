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
    onCall: Function
}


export const ContactPopup = (props: Props) => {

    return (
        <div className=" full-page-popup-container">
            <div className="call-popup-container">
                <img className="cancel-button" src={darkCrossIcon} alt="DarkCrossIcon" onClick={() => props.visibilityHandler()}></img>
                <div className="contact-card-container-big">
                    <div className="contact-card-flexbox">
                        <img className="contact-card-profile-picture" src={hjordis} alt="Profilbild" />
                        <p className="contact-name-big">{props.contact?.firstName} <br /> <span>{props.contact?.lastName}</span> <br/> {props.contact?.phoneNbr} </p>
                        <SquareButton
                            label="Ring"
                            onClick={() => { 
                                props.visibilityHandler();
                                props.onCall();
                            }}
                            icon={callIcon}
                            className="call-button-big" />
                    </div>
                </div>
            </div>
        </div>
    )

}

// TODO: FIX DESIGN
