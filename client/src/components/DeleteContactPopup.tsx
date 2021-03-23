import '../css/call.css';
import '../css/button.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';

const closeDeleteContactPopup = () => {
    var element = document.getElementById("remove-contact-popup");
    if(element != null) {
        element.style.visibility = 'hidden'
    }
}

export const DeleteContactPopup = () => {
    return (
        <div id="remove-contact-popup" className="full-page-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">

                    <div className="cancel-row"> <img src={DarkCrossIcon} alt="DarkCrossIcon"></img> </div>

                    <h4>Är du säker på att du vill ta bort /namn på kontakt/?</h4>

                    <div className="button-row">
                        <button id="yes-button" className="yes-button"> 
                            Ja  
                        </button>
                        <button id="no-button" className="no-button" onClick={closeDeleteContactPopup}>  
                            Nej  
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )
}