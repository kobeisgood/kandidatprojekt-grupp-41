import '../css/call.css';
import '../css/buttons.css';
import { SquareButton } from './SquareButton';
import decline from '../icons/decline.svg';
import accept from '../icons/accept.svg';


interface Props {
    callerName: string,
    callRespond: Function
}

export const CallPopup = (props: Props) => {
    const acceptCall = () => {
        props.callRespond(true);
    }

    const declineCall = () => {
        props.callRespond(false);
    }

    return (
        <>
            <div className="call-popup-shadow" />
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">
                    <h3>Inkommande samtal</h3>
                    <img className="caller-profile-picture" src="https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog2814877/Edward_Blom2.jpg" alt="Profilbild av personen som ringer" />
                    <div className="incoming-call-buttons-container">
                        <div className="answer-button-container incoming-call-button-container">
                            <SquareButton className="answer-call-button incoming-call-button button" onClick={acceptCall} icon={accept} />
                            <h3 className="answer-text">Svara</h3>
                        </div>

                        <h3 className="caller-name-text">{props.callerName}</h3>

                        <div className="decline-button-container incoming-call-button-container">
                            <SquareButton className="decline-call-button incoming-call-button button" onClick={acceptCall} icon={accept} />  
                            <h3 className="decline-text">Avböj</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}