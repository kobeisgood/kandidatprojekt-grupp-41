import '../css/start-view.css';
import '../css/button.css';
import { Link } from 'react-router-dom';
import { ProfileChangeButton } from '../components/ProfileChangeButton';
import profileIcon from '../icons/profile-icon.svg';
import phoneBookIcon from '../icons/phone-book-icon.svg';
import keypadIcon from '../icons/keypad-icon.svg';
import logOutIcon from '../icons/log-out-icon.svg';

export const StartView = () => {
    return (
        <div className="full-page-container">
            {/* TODO
                - Add log out functionality on click
                - Change to reusable button component */}
            <button className="log-out-button button-rectangular">
                <div className="log-out-button-content">
                    <img src={logOutIcon} alt="Log out icon" className="log-out-button-image"/>
                    <p className="log-out-button-text">Logga ut</p>
                </div>
            </button>

            <div className="start-view-flexbox-container">
                <h1 className="welcome-text">Välkommen, Hjördis!</h1>
                <div className="start-view-button-container">
                    {/* buttonFunction prop passes empty function since it already has a link */}
                    <Link to="/profile">
                        <ProfileChangeButton functionDesc={"Min profil"} icon={profileIcon} buttonFunction={() => void 0} />
                    </Link>
                    <Link to="/phonebook">
                        <ProfileChangeButton functionDesc={"Telefonbok"} icon={phoneBookIcon} buttonFunction={() => void 0} />
                    </Link>
                    <ProfileChangeButton functionDesc={"Knappsats"} icon={keypadIcon} buttonFunction={() => void 0} />
                </div>
                <p className="latest-calls-text">Senaste samtalen</p>
                <div className="latest-calls-carousel-container">
                    Färdig karusell yo
                </div>
            </div>
        </div>
    );
}