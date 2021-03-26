/* Component for go back one step in the directory
Authors: Charlie and Hanna 
*/

import React from 'react';
import { SquareButton } from './SquareButton';
import backArrow from '../icons/back-arrow.svg';

interface Props {
    linkTo: string
}

export const BackButton = (props: Props) => {
    return (
        <SquareButton label="Tillbaka" onClick={() => void 0} icon={backArrow} linkTo={props.linkTo} className="back-button" />
    );
}

