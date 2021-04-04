/* Round component button
    Author: Daniel
*/

import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    label?: string;
    onClick: Function;
    icon?: string;
    linkTo?: string;
    className?: string;
}

export const RoundButton = (props: Props) => {
    const iconElem = props.icon === undefined ? <></> : <img src={props.icon} />;
    const labelElem = props.label === undefined ? <></> : <h2>{props.label}</h2>;

    return (
        <div>
            {props.linkTo === undefined ?
                <button className={`${props.className} ${"button-general round-button"}`} onClick={() => props.onClick()}>
                    {iconElem}
                    {labelElem}
                </button>
                :
                <Link style={{textDecoration: "none"}} to={props.linkTo}>
                    <button className={`${props.className} ${"button-general round-button"}`} onClick={() => props.onClick()}>
                        {iconElem}
                        {labelElem}
                    </button>
                </Link>
            }
        </div>
    );
}

