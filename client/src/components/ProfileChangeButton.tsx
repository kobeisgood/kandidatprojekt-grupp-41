/* Component for changing name, number, picture and password
 
Authors: Charlie and Hanna 
*/

import React from 'react';
import '../css/profile.css';
import { SquareButton } from './SquareButton';

interface Props {
    label: string;
    icon: string;
    buttonFunction?: Function;
    linkTo?: string;
}

export const ProfileChangeButton = (props: Props) => {
    const onClick = () => {
        if (props.buttonFunction !== null)
            return props.buttonFunction;
        else
            return void(0);
    };

    return (
        <SquareButton className="change-profile-button" onClick={() => onClick()} icon={props.icon} label={props.label} linkTo={props.linkTo} />
    );
};