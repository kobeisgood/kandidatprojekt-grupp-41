/* Square component button
 
Authors: André, (Charlie and Hanna)
*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';

interface Props {
    label: string;
    onClick: Function;
    icon?: string;
    linkTo?: string;
    className?: string;
}

export const SquareButton = (props: Props) => {
    const iconElem = props.icon === undefined ? <></> : <img src={props.icon} width="40%" height="40%" />;
    const labelElem = props.label === undefined ? <></> : <h2 className="profile-button-names">{props.label}</h2>;

    return (
        <div className="profile-button-container">
            {props.linkTo === undefined ?
                <button className={props.className} onClick={() => props.onClick()}>
                    {iconElem}
                    {labelElem}
                </button>
                :
                <Link to={props.linkTo}>
                    <button className={props.className} onClick={() => props.onClick()}>
                        {iconElem}
                        {labelElem}
                    </button>
                </Link>
            }
        </div>
    );
}

