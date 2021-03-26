/* Component for changing name, number, picture and password
 
Authors: Charlie and Hanna 
*/

import React from 'react';
import { SquareButton } from './SquareButton';

interface Props {
    label: string;
    icon: string;
    buttonFunction: Function;
    linkTo: string;
}

export const ProfileChangeButton = (props: Props) => {

    return (
        <SquareButton className="page-navigation-button" onClick={() => props.buttonFunction()} icon={props.icon} label={props.label} linkTo={props.linkTo} />
    );
}

