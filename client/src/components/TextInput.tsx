/* Square component button
 
Authors: André, (Charlie and Hanna)
*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/textinput.css';

interface Props {
    label: string;
    className?: string;
    placeholder: string;
}

export const TextInput = (props: Props) => {
    const labelElem = props.label === undefined ? <></> : <label className="input-label">{props.label}</label>;

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            {labelElem}
            <input className="text-input" type="text" placeholder={props.placeholder} />
        </form>
    );
}

