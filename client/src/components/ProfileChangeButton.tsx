/* Component for changing name, number, picture and password
 
Authors: Charlie and Hanna 
*/

import { SquareButton } from './SquareButton';

import '../css/profile.css';

interface Props {
    label: string;
    icon: string;
    onClick?: Function;
    linkTo?: string;
}

export const ProfileChangeButton = (props: Props) => {
    const onClick = () => {
        if (props.onClick !== undefined)
            props.onClick();
        else
            void(0);
    };

    return (
        <SquareButton className="change-profile-button" onClick={() => onClick()} icon={props.icon} label={props.label} linkTo={props.linkTo} />
    );
};