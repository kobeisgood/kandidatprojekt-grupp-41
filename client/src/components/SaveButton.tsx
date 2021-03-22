/* Component for saving changes of name, picture, password and number in profile view

Authors: Charlie and Hanna 
*/

import React from 'react';
import '../css/savebutton.css';
import { SquareButton } from './SquareButton';

interface Props {
    label: string;
    buttonFunction: Function;
    linkTo: string;
}

export const SaveButton = (props: Props) => {

    return (
        <SquareButton className="save-button" onClick={() => props.buttonFunction()} label={props.label} linkTo={props.linkTo} />
    );
}
