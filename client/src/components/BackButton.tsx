/* Component for go back one step in the directory
Authors: Charlie and Hanna 
*/

import React from 'react';
import { SquareButton } from './SquareButton';

interface Props {
    linkTo: string
}

export const BackButton = (props: Props) => {

    return (
        <SquareButton label="&lsaquo; Tillbaka" onClick={() => void 0} linkTo={props.linkTo} className="back-button" />
    );
}

