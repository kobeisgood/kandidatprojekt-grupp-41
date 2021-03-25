/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/

import { Link, useHistory } from 'react-router-dom';
import { ProfileChangeButton } from '../components/ProfileChangeButton';

import '../css/start-view.css';
import '../css/button.css';
import profileIcon from '../icons/profile-icon.svg';
import phoneBookIcon from '../icons/phone-book-icon.svg';
import keypadIcon from '../icons/keypad-icon.svg';
import logOutIcon from '../icons/log-out-icon.svg';

interface Props {
    setMe: Function;
}

export const Dahsboard = (props: Props) => {
    const history = useHistory();

    const logOut = () => {
        props.setMe(null);
        localStorage.clear();
        history.push("/");
    };

    return (
        <div className="full-page-container">
            {/* TODO
                - Add log out functionality on click
                - Change to reusable button component */}
            <button className="log-out-button button-rectangular" onClick={logOut}>
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
                        <ProfileChangeButton label="Min profil" icon={profileIcon} />
                    </Link>
                    <Link to="/phonebook">
                        <ProfileChangeButton label="Telefonbok" icon={phoneBookIcon} />
                    </Link>
                    <ProfileChangeButton label="Knappsats" icon={keypadIcon} />
                </div>
                <p className="latest-calls-text">Senaste samtalen</p>
                <div className="latest-calls-carousel-container">
                    Färdig karusell yo
                </div>
            </div>
        </div>
    );
}