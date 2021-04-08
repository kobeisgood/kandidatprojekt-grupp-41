/***
 * Component for a button ending a call, on the bottom of the page when in a call
 * 
 * Author: Theo
 */

import '../css/call.css';
import { SquareButton } from './SquareButton';
import decline from '../icons/decline.svg';


interface Props {
    endCall: Function;
}

export const EndCallButton = (props: Props) => {
    return (
        <div className="callView-button-container">

            <SquareButton onClick={() => props.endCall()} icon={decline}  className="end-call-button" />
            

            <h2>Avsluta samtal</h2>
        </div>
    );
};