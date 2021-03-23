import { Link, useHistory } from 'react-router-dom';
import '../css/start-view.css';
import '../css/button.css';

interface Props {
    setMe: Function;
}

export const StartView = (props: Props) => {
    const history = useHistory();

    const logOut = () => {
        props.setMe(null);
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