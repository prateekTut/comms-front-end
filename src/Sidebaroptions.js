import React from "react";
import "./css/sidebaroptions.css"

function Sidebaroptions({Icon, title,isactive,onClick}){
    return (
        <div className={`sidebarOptions ${isactive && 'sidebarOptions--active'}`}  onClick={onClick}>
            <Icon />
            <h4>{title}</h4>
           
        </div>
    )
}

export default Sidebaroptions;