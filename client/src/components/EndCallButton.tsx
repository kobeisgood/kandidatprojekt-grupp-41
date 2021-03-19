/***
 * Component for a button ending a call, on the bottom of the page when in a call
 * 
 * Author: Theo
 */

import '../css/call.css';

interface Props {
    endCall: Function;
}

export const EndCallButton = (props: Props) => {
    return (
        <div className="callView-button-container">
            <button className="end-call-button" onClick={() => props.endCall()}>
                <i className="fas fa-phone-slash fa-6x"> </i>
            </button>

            <h2>Avsluta samtal</h2>
        </div>
    );
};