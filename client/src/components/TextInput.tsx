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
    type?: string;
}

export const TextInput = (props: Props) => {
    const labelElem = props.label === undefined ? <></> : <label className="input-label">{props.label}</label>;

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            {labelElem}
            <input className={props.className} type={props.type} placeholder={props.placeholder} />
        </form>
    );
}