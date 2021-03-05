import React from 'react';
import '../css/call.css';

export const CallingPopup = () => {
    const declineCall = () => {
        console.log("declined call");
    }

    return(
        <div className="full-page-container">
            <div className="call-popup-container">
                <div className="calling-popup-flexbox-container">
                    <h3>Ringer...</h3>

                    <div className="calling-horisontal-flexbox-container">
                        <div className="calling-person-container">
                            <img className="caller-profile-picture" src="https://www.ibengt.se/wp-content/uploads/struts_159154314_1754472391.jpg" alt="Profilbild av personen som ringer"/>
                            <h3 className="caller-name-text"><span>Lauf</span> <br/> Weckvist</h3>
                        </div>

                        <div className="decline-button-container incoming-call-button-container">
                            <button onClick={declineCall} className="decline-call-button incoming-call-button"></button>
                            <h3>Sluta ringa</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}