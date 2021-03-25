/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/

import { Link, useHistory } from 'react-router-dom';
import { SquareButton } from '../components/SquareButton';

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
            <button className="log-out-button button button-rectangular" onClick={logOut}>
                Logga ut
            </button>

            <div className="start-view-flexbox-container">
                <h1>Välkommen, Hjördis!</h1>
                <div className="start-view-button-container">
                    <Link to="/profile">
                        <button className="big-button">Min profil</button>
                    </Link>
                    <Link to="/phonebook"><button className="big-button">Telefonbok</button></Link>
                    <button className="big-button">Knappsats</button>
                </div>
                <h2>Senaste samtalen</h2>
                <div className="latest-calls-carousel-container">
                    Karusell yo
                    </div>
            </div>
        </div>
    );
}