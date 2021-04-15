import '../css/buttons.css';
import '../css/popups.css';
import '../css/profile-picker.css';
import darkCrossIcon from '../icons/dark-cross-icon.svg';

import pic1 from '../images/profilePics/1.svg';
import pic2 from '../images/profilePics/2.svg';
import pic3 from '../images/profilePics/3.svg';
import pic4 from '../images/profilePics/4.svg';


interface Props {
    visibilityHandler: Function,
    choosePic: Function
}

export const ProfilePickPopup = (props: Props) => {
    return (
        <div className="full-page-container full-page-popup-container">
            <div className="profile-popup-container">

                <img className="cancel-button-profile" src={darkCrossIcon} alt="DarkCrossIcon" onClick={() => props.visibilityHandler()}></img>

                <div className="profile-popup-flexbox-column">
                    <h2 className="choose-profile-header">Tryck på en bild för att välja den som profilbild</h2>
                    <div className="profile-popup-picture-container">
                        <img src={pic1} alt="Profil bild som går att välja" className="profile-picture-popup" onClick={() => props.choosePic("1")} />
                        <img src={pic2} alt="Profil bild som går att välja" className="profile-picture-popup" onClick={() => props.choosePic("2")} />
                        <img src={pic3} alt="Profil bild som går att välja" className="profile-picture-popup" onClick={() => props.choosePic("3")} />
                        <img src={pic4} alt="Profil bild som går att välja" className="profile-picture-popup" onClick={() => props.choosePic("4")} />
                    </div>
                </div>
            </div>
        </div>
    );
};