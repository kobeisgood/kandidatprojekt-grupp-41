/* 
    Start view showing buttons for my profile, phone book, key pad and log out. Also contains a carousel of latest calls.
    Author: Daniel
*/

import { useHistory } from 'react-router-dom';
import { SquareButton } from '../components/SquareButton';
import { Carousel } from '../components/Carousel';
import { User } from '../Types';
import { Logout } from '../Connection';

import '../css/start-view.css';
import '../css/buttons.css';
import profileIcon from '../icons/profile-icon.svg';
import phoneBookIcon from '../icons/phone-book-icon.svg';
import keypadIcon from '../icons/keypad-icon.svg';
import logOutIcon from '../icons/log-out-icon.svg';

interface Props {
    me: User | null;
    setMe: Function;
    onCall: Function;
    profilePic: Function
}

export const Dashboard = (props: Props) => {
    const history = useHistory();

    const logOut = () => {
        if (props.me !== null)
            Logout(props.me.phoneNbr, clearLoginInfo);
    };

    const clearLoginInfo = () => {
        props.setMe(null);
        localStorage.clear();
        history.push("/login");
    };

    return (
        <div className="dashboard-full-page-container">
            <div className="log-out-button-container">
                <SquareButton label="Logga ut" onClick={logOut} icon={logOutIcon} className="log-out-button" />
            </div>

            <div className="start-view-flexbox-container">
                <h1 className="welcome-text">Välkommen, {props.me ? props.me.firstName + "!": ""}</h1>
                <div className="start-view-button-container">
                    {/* onClick prop passes empty function since it already has a link */}
                    <div className="page-navigation-button-container"><SquareButton label="Min profil" onClick={() => void 0} icon={profileIcon} linkTo="/profile/" className="page-navigation-button" /></div>
                    <div className="page-navigation-button-container"><SquareButton label="Telefonbok" onClick={() => void 0} icon={phoneBookIcon} linkTo="/phonebook" className="page-navigation-button" /></div>
                    {/* Knappsats is currently disabled
                        Remove disabled-page-navigation-button css to enable */}
                    <div className="page-navigation-button-container"><SquareButton label="Knappsats" onClick={() => void 0} icon={keypadIcon} className="page-navigation-button disabled-page-navigation-button" /></div>
                </div>
                {props.me !== null && props.me?.callEntries.length > 0 ?
                    <>
                        <p className="latest-calls-text">Senaste samtalen</p>
                        <div className="latest-calls-carousel-container">
                            <Carousel callEntries={props.me ? props.me.callEntries : []} onCall={props.onCall} profilePic={props.profilePic} />
                        </div>
                    </>
                    :
                    <p className="latest-calls-text no-calls">Du har inga senaste samtal</p>
                }
            </div>
        </div>
    );
}