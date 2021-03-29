/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/

import { useHistory } from 'react-router-dom';
import { SquareButton } from '../components/SquareButton';
import { Carousel } from '../components/Carousel';

import '../css/start-view.css';
import '../css/buttons.css';
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
            */}
            <div className="log-out-button-container">
                <SquareButton label="Logga ut" onClick={logOut} icon={logOutIcon} className="log-out-button" />
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
                    <Carousel />
                </div>
            </div>
        </div>
    );
}