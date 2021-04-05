import '../css/profile.css';
import cross from "../icons/profile/cross.svg"
import { SquareButton } from './SquareButton';

interface Props {
    visibilityHandler: Function;
}

export const DeleteAccount = (props: Props) => {
    const closeDeleteAccountPopUp = () => {
        props.visibilityHandler()
    }

    return (
        <div className="fade-background-container">
            <div className="delete-account-popup-container">
                <button className="cross-mark" onClick={closeDeleteAccountPopUp}>
                    <img src={cross} alt="cross" />
                </button>
                <div className="delete-account-content">
                    <div className="calling-popup-flexbox-container">
                        <h3>Är du säker på att du vill ta bort ditt konto?</h3>
                    </div>
                    <div className="yes-no-button-container">
                        <SquareButton className="yes-button" label={"Ja"} onClick={() => void 0}></SquareButton>
                        <SquareButton className="no-button" label={"Nej"} onClick={closeDeleteAccountPopUp}></SquareButton>
                    </div>
                </div>
            </div>
        </div>
    );
}