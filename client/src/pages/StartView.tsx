/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/
import '../css/start-view.css';
import '../css/button.css';
import { Link } from 'react-router-dom';
import { ProfileChangeButton } from '../components/ProfileChangeButton';
import profileIcon from '../icons/profile-icon.svg';
import phoneBookIcon from '../icons/phone-book-icon.svg';
import keypadIcon from '../icons/keypad-icon.svg';
import logOutIcon from '../icons/log-out-icon.svg';
import { SquareButton } from '../components/SquareButton';

export const StartView = () => {
    return (
        <div className="full-page-container">
            {/* TODO
                - Add log out functionality on click
            */}
            <SquareButton label="Logga ut" onClick={() => void 0} icon={logOutIcon} className="log-out-button button-rectangular" />

            <div className="start-view-flexbox-container">
                <h1 className="welcome-text">Välkommen, Hjördis!</h1>
                <div className="start-view-button-container">
                    {/* onClick prop passes empty function since it already has a link */}
                    <SquareButton label="Min profil" onClick={() => void 0} icon={profileIcon} linkTo="/profile/" className="change-profile-button" />
                    <SquareButton label="Telefonbok" onClick={() => void 0} icon={phoneBookIcon} linkTo="/phonebook" className="change-profile-button" />
                    <SquareButton label="Knappsats" onClick={() => void 0} icon={keypadIcon} className="change-profile-button" />
                </div>
                <p className="latest-calls-text">Senaste samtalen</p>
                <div className="latest-calls-carousel-container">
                    Färdig karusell yo
                </div>
            </div>
        </div>
    );
}