/* View for the changing name 'Ändra namn'
Authors: Charlie and Hanna 
*/
import React, { useState } from 'react';
import '../css/profile.css';
import '../css/textinput.css';
import { User } from '../Types';

import { BackButton } from '../components/BackButton';
import { TextInput } from '../components/TextInput';
import { SaveButton } from '../components/SaveButton';

interface Props {
    me: User | null
    setMe: Function
    updateName: (firstName: string, lastName: string, setName: Function, setNameChanged: Function) => void,
    profilePic: Function
}


export const ChangeNameView = (props: Props) => {
    const setName = (firstName: string, lastName: string) => {
        if (props.me !== null)
            props.setMe({
                id: props.me.id,
                firstName: firstName,
                lastName: lastName,
                phoneNbr: props.me.phoneNbr,
                profilePic: props.me.profilePic,
                contacts: props.me.contacts,
                callEntries: props.me.callEntries
            });
    }

    const
        [firstNameInp, setFirstNameInp] = useState(""),
        [lastNameInp, setLastNameInp] = useState(""),
        [nameChanged, setNameChanged] = useState(false);

    const
        handleFirstNameInp = (event: any) => { setFirstNameInp(event.target.value); },
        handleLastNameInp = (event: any) => { setLastNameInp(event.target.value); };

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
                <img src={props.profilePic(props.me?.profilePic)} alt="profilbild" />
                <div className="profile-info-contact-container">
                    <h1 className="profile-name">{props.me ? props.me.firstName + " " + props.me.lastName : ""}</h1>
                    <h1 className="profile-number">{props.me ? props.me.phoneNbr : ""}</h1>
                </div>
            </div>
            <div className="change-name-container">
                <div>
                    <TextInput className="text-input-change-name" type="text" label="Förnamn: " placeholder={props.me ? props.me.firstName : ""} onChange={handleFirstNameInp} />
                </div>
                <div>
                    <TextInput className="text-input-change-name" type="text" label="Efternamn: " placeholder={props.me ? props.me.lastName : ""} onChange={handleLastNameInp} />
                </div>
            </div>
            {/* Feedback for showing that the name has been updated */}
            {nameChanged ?
                <div className="update-container">
                    <h3 className="update-text">Namn uppdaterat!</h3>
                </div> : <SaveButton label="Spara namn" onClick={() => props.updateName(firstNameInp, lastNameInp, setName, setNameChanged)} />
            }
        </div>
    );
}