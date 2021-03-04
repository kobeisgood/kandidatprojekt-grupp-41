import '../css/call.css';

export const CallPopup = () => {
    return(
        <div className="full-page-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">
                    <h3>Inkommande samtal</h3>
                    <img className="caller-profile-picture" src="https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog2814877/Edward_Blom2.jpg" alt="Profilbild av personen som ringer"/>
                    <div className="incoming-call-buttons-container">
                        <div className="answer-button-container incoming-call-button-container">
                            <button className="answer-call-button incoming-call-button"></button>
                            <h3>Svara</h3>
                        </div>

                        <h3 className="caller-name-text"><span>Kobe</span> <br/> Lupisson</h3>

                        <div className="decline-button-container incoming-call-button-container">
                            <button className="decline-call-button incoming-call-button"></button>
                            <h3>Avböj</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}