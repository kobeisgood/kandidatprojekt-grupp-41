/***
 * Component for camera and microphone buttons on the bottom of the page when in a call
 * 
 * Author: Theo
 * 
 * <i className={"fas " + props.icon + " fa-6x"}> </i> 
 */

import '../css/call.css';

interface Props {
    functionDesc: string;
    icon: string;
    buttonFunction: Function;
}

export const CallViewButton = (props: Props) => {
    return (
        <div className="callView-button-container">
            <button className="callView-button" onClick={() => props.buttonFunction()}>
                <img src={props.icon} width="80%" height="80%" alt="Icon for button in app call view" />
            </button>

            <h2>{props.functionDesc}</h2>
        </div>
    );
};