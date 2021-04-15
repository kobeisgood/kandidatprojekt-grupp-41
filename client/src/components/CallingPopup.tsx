import { SquareButton } from '../components/SquareButton';
import decline from '../icons/decline.svg';
import '../css/call.css';
import '../css/buttons.css';


interface Props {
    abortCall: Function,
    name: string,
    pic: string,
    profilePic: Function
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
                    <div className="calling-vertical-flexbox-container">
                        <div className="calling-person-container">
                            <img className="caller-profile-picture" src={props.profilePic(props.pic)} alt="Profilbild av personen som ringer" />
                            <h3 className="caller-name-text">{props.name}</h3>
                        </div>
                        <div>
                            <SquareButton label="Avbryt "onClick={() => props.abortCall()} icon={decline} className="abort-button" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}