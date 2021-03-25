import '../css/call.css';
import '../css/button.css';
import '../css/popups.css';
import DarkCrossIcon from '../icons/dark-cross-icon.svg';

// Closes the delete contact popup
const closeDeleteContactPopup = () => {
    var element = document.getElementById("remove-contact-popup");
    if(element != null) {
        element.style.visibility = 'hidden'
    }
}

/* Should have the info from the contact as parameters(or maybe just the id), the info needs to be passed from the contact card to here */ 
/* Alternatively this method could perhaps be in the contact card component and be exported to here*/
const deleteContact = () => {
    
    // Find the contact(user) from the id 
    // if user exists 
        // delete from db
        // console.log("Contact deleted")
        // closeDeleteContactPopup();
    // else 
        // return error

    console.log("Contact deleted")
  
}

export const DeleteContactPopup = () => {
    return (
        <div id="remove-contact-popup" className="full-page-container full-page-popup-container">
            <div className="call-popup-container">
                <div className="call-popup-flexbox-container">

                    <div className="cancel-row"> <img src={DarkCrossIcon} alt="DarkCrossIcon" onClick={closeDeleteContactPopup}></img> </div>

                    <h4>Är du säker på att du vill ta bort /namn på kontakt/?</h4>

                    <div className="button-row">
                        <button id="yes-button" className="yes-button" onClick={deleteContact}> 
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