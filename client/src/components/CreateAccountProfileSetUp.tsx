import { User } from '../Types';
import { TextInput } from './TextInput';
import { SaveButton } from './SaveButton';
import hjordis from "../images/hjordis.png"
import { SquareButton } from './SquareButton';
import '../css/create-account-view.css';




export const CreateAccountProfileSetUp = () => {
    return (
        <div>
            <div className="create-description-text-container">
                <h2 className="create-description-text">
                    Om du vill kan du fylla i ditt namn och välja en bild på dig själv. Detta hjälper andra att känna igen dig.
                </h2>
            </div>

            <div className="create-pic-container">
                <img className="img" src={hjordis} alt="profilbild" />
                <div className="pic-button-container">
                    <SquareButton label="Ta en ny bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                    <SquareButton label="Ladda upp bild" onClick={() => void 0} linkTo="/login" className="profile-set-upp-button" />
                </div>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="create-container">

                    <TextInput className="text-input" type="text" label="Förnamn: "
                        placeholder="Skriv ditt förnamn här..." onChange={() => void 0} />


                    <TextInput className="text-input" type="text" label="Efternamn: "
                        placeholder="Välj ditt efternamn här..." onChange={() => void 0} />

                </div>
            </form>


            <SaveButton label="Skapa konto" onClick={() => void 0} />

        </div>
    );
}