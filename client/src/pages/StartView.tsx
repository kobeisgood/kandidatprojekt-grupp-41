/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/
import '../css/start-view.css';
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
            <div className="log-out-button-container">
                <SquareButton label="Logga ut" onClick={() => void 0} icon={logOutIcon} className="log-out-button" />
            </div>

            <div className="start-view-flexbox-container">
                <h1 className="welcome-text">Välkommen, Hjördis!</h1>
                <div className="start-view-button-container">
                    {/* onClick prop passes empty function since it already has a link */}
                    <SquareButton label="Min profil" onClick={() => void 0} icon={profileIcon} linkTo="/profile/" className="page-navigation-button" />
                    <SquareButton label="Telefonbok" onClick={() => void 0} icon={phoneBookIcon} linkTo="/phonebook" className="page-navigation-button" />
                    <SquareButton label="Knappsats" onClick={() => void 0} icon={keypadIcon} className="page-navigation-button" />
                </div>
                <p className="latest-calls-text">Senaste samtalen</p>
                <div className="latest-calls-carousel-container">
                    Färdig karusell yo
                </div>
            </div>
        </div>
    );
}