 /* Component for changing name, number, picture and password
  
 Authors: Charlie and Hanna 
 */

 import React from 'react';
 import '../css/profile.css';
 
 interface Props {
     functionDesc:string;
     icon:string;
     buttonFunction:Function;
   }
 
 export const ProfileChangeButton = (props:Props) => {
 
     return (
        <div className="profile-button-container">
             <button className="change-profile-button" onClick={() => props.buttonFunction()}> 
                 <img src={props.icon} />
                 <h2 className="profile-button-names">{props.functionDesc}</h2>
             </button>
         </div>
     );
 }
 
 