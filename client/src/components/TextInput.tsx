/* Square component button
 
Authors: André, (Charlie and Hanna)
*/

import '../css/textinput.css';

interface Props {
    label: string;
    className?: string;
    placeholder: string;
    type?: string;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void)
}

export const TextInput = (props: Props) => {
    const labelElem = props.label === undefined ? <></> : <label className="input-label">{props.label}</label>;

    return (
        <>
            {labelElem}
            <input className={props.className} type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
        </>
    );
};