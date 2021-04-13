/***
 * Component for camera and microphone buttons on the bottom of the page when in a call
 * 
 * Author: Theo
 * 
 * <i className={"fas " + props.icon + " fa-6x"}> </i> 
 */

import '../css/call.css';
import { SquareButton } from './SquareButton';

interface Props {
    functionDesc: string;
    icon: string;
    buttonFunction: Function;
}

export const CallViewButton = (props: Props) => {
    return (
        <div className="callView-button-container">

            <SquareButton  onClick={() => props.buttonFunction()} icon={props.icon}  className="callView-button" />
            
            <h2>{props.functionDesc}</h2>
        </div>
    );
};