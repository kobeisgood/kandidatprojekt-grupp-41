
 import React from 'react';
 import '../css/contact-card.css';
 

 
 export const ContactCard = () => {
     return (
        <div className="contact-card-container">
            <div className="contact-card-flexbox">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Edward_blom.melodifestivalen2018.18d873.1460307.jpg/1200px-Edward_blom.melodifestivalen2018.18d873.1460307.jpg" alt="Profilbild"/>
                <p className="contact-name">Repo <span>Laufsson</span></p>
                <button className="call-button">
                    Ring
                </button>
            </div>
        </div>
     );
 }
 
 