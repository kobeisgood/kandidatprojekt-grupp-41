import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextInput } from '../components/TextInput';
import { BackButton } from '../components/BackButton';
import { SaveButton } from '../components/SaveButton';
import { CreateAccountChoose } from '../components/CreateAccountChoose';
import '../css/create-account-view.css';
import React, { Component } from 'react';



export const CreateAccountView = () => {

    return (
        <div>
            <header className="create-header-container">
                <div className="back-button-container">
                    <BackButton linkTo="/profile" />
                </div>
                <h1 className="create-header">Skapa konto</h1>
            </header>
            <CreateAccountChoose/>

        </div>
    );

}