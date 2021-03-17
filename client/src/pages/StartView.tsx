import '../css/start-view.css';
import '../css/button.css';

export const StartView = () => {
    return (
        <div className="full-page-container">
            <button className="log-out-button button button-rectangular">
                Logga ut
            </button>

            <div className="start-view-flexbox-container">
                <h1>Välkommen, Hjördis!</h1>
                <div className="start-view-button-container">
                    <button className="big-button">Min profil</button>
                    <button className="big-button">Telefonbok</button>
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