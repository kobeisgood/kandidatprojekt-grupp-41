/* Component for go back one step in the directory
Authors: Charlie and Hanna 
*/

import React from 'react';

interface Props {
    buttonFunction: Function;
}

export const BackButton = (props: Props) => {

    return (
        <button className="button-general back-button" onClick={() => props.buttonFunction()}>
            <h2>Tillbaka</h2>
        </button>
    );
}

