/* Component for go back one step in the directory
Authors: Charlie and Hanna 
*/
import { Link } from 'react-router-dom';

import '../css/backbutton.css';

interface Props {
    linkTo: string;
}

export const BackButton = (props: Props) => {

    return (
        <div className="back-button-container">
            <Link to={props.linkTo}>
                <button className="back-button">
                    <h2>Tillbaka</h2>
                </button>
            </Link>
        </div>
    );
};