import '../css/call.css';
import '../css/buttons.css';


interface Props {
    abortCall: Function,
    name: string
}

export const CallingPopup = (props: Props) => {
    return (
        <>
            <div className="call-popup-shadow" />
            <div className="call-popup-container">
                <div className="calling-popup-flexbox-container">
                    <div className="calling-text">
                        <h3>Ringer</h3>
                        <img className="loading-dots-gif" src="https://www.braheskolan.se/core/dependencies/loader.gif" alt="Tre punkter visar laddningsanimation" />
                    </div>

                    <div className="calling-horisontal-flexbox-container">
                        <div className="calling-person-container">
                            <img className="caller-profile-picture" src="https://i.redd.it/avif889dhh751.jpg" alt="Profilbild av personen som ringer" />
                            <h3 className="caller-name-text">{props.name}</h3>
                        </div>

                        <div className="decline-button-container incoming-call-button-container">
                            <button onClick={() => props.abortCall()} className="decline-call-button incoming-call-button"></button>
                            <h3>Avsluta</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}