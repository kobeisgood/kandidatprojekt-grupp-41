/***
 * Component for camera and microphone buttons on the bottom of the page when in a call
 * 
 * Author: Theo
 * 
 * <i className={"fas " + props.icon + " fa-6x"}> </i> 
 */

import React from 'react';
import '../css/call.css';

interface Props {
    functionDesc:string;
    icon:string;
    buttonFunction:Function;
  }

export const CallViewButton = (props:Props) => {

    return (
        <div className="function-button-container">
            <button className="function-button" onClick={() => props.buttonFunction()}> 
                <img src={props.icon} width="80%" height="80%" />
            </button>
            
            <h2>{props.functionDesc}</h2>

        </div>
        
    );

}

