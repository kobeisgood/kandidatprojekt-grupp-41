export const CallPopup = () => {
    return(
        <div className="call-popup-container">
            <div>
                <h3>Inkommande samtal</h3>
                <img src="" alt=""/>
                <h3>Lars <br/> <span>Henriksson</span></h3>
                <div className="answer-buttons-container">
                    <div className="answer-button-container">
                        <button className="answer-call-button"></button>
                        <h3>Svara</h3>
                    </div>

                    <div className="decline-button-container">
                        <button className="decline-call-button"></button>
                        <h3>Avb&oumlj</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}