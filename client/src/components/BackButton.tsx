 /* Component for go back one step in the directory
 Authors: Charlie and Hanna 
 */

 import React from 'react';
 import '../css/profile.css';
 
 interface Props {
     buttonFunction:Function;
   }
 
 export const BackButton = (props:Props) => {

     return (
         <div className="back-button-container">
             <button className="back-button" onClick={() => props.buttonFunction()}> 
                 <h2>Tillbaka</h2>
             </button>
         </div>         
     );
 }
 
 