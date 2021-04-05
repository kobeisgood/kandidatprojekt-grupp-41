/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import '../css/profile.css';
import hjordis from "../images/hjordis.png"
import { User } from '../Types';

import { BackButton } from '../components/BackButton';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';

interface Props {
    me: User | null
    setMe: Function
    updateNbr: Function
}

export const ChangeNumberView = (props: Props) => {
    const setNumber = (phoneNbr: string) => {
        if (props.me !== null) {
            props.setMe({
                id: props.me.id,
                firstName: props.me.firstName,
                lastName: props.me.lastName,
                phoneNbr: phoneNbr,
                profilePic: props.me.profilePic,
                contacts: props.me.contacts,
                callEntries: props.me.callEntries
            });
        }
    };
    
    const
        [numberInp, setNumberInp] = useState(""),
        [numberRepeatInp, setNumberRepeatInp] = useState("");


    const
        handleNumberInp = (event: any) => { setNumberInp(event.target.value); },
        handleNumberRepeatInp = (event: any) => { setNumberRepeatInp(event.target.value); };

    const isInpSame = () => numberInp === numberRepeatInp;

    return (
        <div>
            <header className="profile-header-container profile-header">
                <div className="back-button-container">
                    <BackButton linkTo="/profile" />
                </div>
                <h1 className="profile-header">Min profil</h1>
            </header>
            {/* Container for profile pic, name and number */}
            <div className="profile-big-info-container">
                <img src={hjordis} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.me ? props.me.firstName + " " + props.me.lastName : ""}</h1>
                    <h1 className="profile-number">{props.me ? props.me.phoneNbr : ""}</h1>
                </div>
            </div>
            <div className="change-number-container">
                <div>
                    <TextInput className="text-input-number" type="tel" label="Nytt mobilnummer: " placeholder="Skriv nytt mobilnummer..." onChange={handleNumberInp} />
                </div>
                <div>
                    <TextInput className="text-input-number" type="tel" label="Återupprepa mobilnummer: " placeholder="Återupprepa mobilnummer..." onChange={handleNumberRepeatInp} />
                </div>
            </div>
            <SaveButton label="Spara nummer" onClick={() => isInpSame() ? props.updateNbr(numberInp, setNumber) : console.log("Number does not match")} />
        </div>
    );
}