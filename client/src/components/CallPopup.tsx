import { UserName } from '../Types';
import '../css/call.css';

interface Props {
    callerName: UserName,
    callRespond: Function
}

export const CallPopup = (props: Props) => {
    const acceptCall = () => {
        props.callRespond(true);
    }

    const declineCall = () => {
        props.callRespond(false);
    }

    return(
        <div className="full-page-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">
                    <h3>Inkommande samtal</h3>
                    <img className="caller-profile-picture" src="https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog2814877/Edward_Blom2.jpg" alt="Profilbild av personen som ringer"/>
                    <div className="incoming-call-buttons-container">
                        <div className="answer-button-container incoming-call-button-container">
                            <button onClick={acceptCall} className="answer-call-button incoming-call-button" />
                            <h3>Svara</h3>
                        </div>

                        <h3 className="caller-name-text">{props.callerName}</h3>

                        <div className="decline-button-container incoming-call-button-container">
                            <button onClick={declineCall} className="decline-call-button incoming-call-button" />
                            <h3>Avböj</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}