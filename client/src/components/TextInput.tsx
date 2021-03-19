/* Square component button
 
Authors: André, (Charlie and Hanna)
*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';

interface Props {
    label: string;
    onClick: Function;
    className?: string;
}

export const TextInput = (props: Props) => {
    const labelElem = props.label === undefined ? <></> : <h2 className="text-input">{props.label}</h2>;

    return (
        <></>
    );
}

