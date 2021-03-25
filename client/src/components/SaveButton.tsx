/* Component for saving changes of name, picture, password and number in profile view

Authors: Charlie and Hanna 
*/

import React from 'react';
import { SquareButton } from './SquareButton';

import '../css/savebutton.css';

interface Props {
    label: string;
    onClick: Function;
    linkTo?: string;
}

export const SaveButton = (props: Props) => {
    return (
        <SquareButton className="save-button" onClick={() => props.onClick()} label={props.label} linkTo={props.linkTo} />
    );
}
