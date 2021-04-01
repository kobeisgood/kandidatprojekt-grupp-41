
import { TextInput } from './TextInput';
import { SaveButton } from './SaveButton';


export const CreateAccountChoose = () => {
    return (
        <div>
            <div className="description-text-container">
                <h2 className="description-text">
                    Fyll i fälten nedan och tryck sedan på "Gå vidare".
                    </h2>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="crate-container">
                    <div>
                        <TextInput className="text-input-number" type="text" label="Ditt mobilnummer: "
                            placeholder="Skriv ditt mobilnummer här..." onChange={() => void 0} />
                    </div>
                    <div>
                        <TextInput className="text-input-password" type="password" label=" Välj ditt lösenord: "
                            placeholder="Välj ditt lösenord här..." onChange={() => void 0} />
                    </div>
                    <div>
                        <TextInput className="text-input-password" type="password" label="Upprepa lösenord: "
                            placeholder="Upprepa ditt lösenord här..." onChange={() => void 0} />
                    </div>
                </div>
            </form>

            <SaveButton label="Gå vidare" onClick={() => void 0} />
        </div>
    );
}