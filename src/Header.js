import React, { useEffect, useState } from "react";
import ReorderIcon from '@mui/icons-material/Reorder'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, Avatar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import AppsIcon from '@mui/icons-material/Apps';
import { useHistory } from "react-router-dom";

import "./css/header.css"


const Header = ({setSearch, search}) => {
    const [value, setValue] = useState("")
    useEffect(() => {
        setValue(search)
    }, [search])
    
   
    let history = useHistory();
    const handlesearch = () => {
       
        history.push("/search");
        setSearch(value)
      }

    return (
        <div className="header">
            <div className="header_left">
                <IconButton>
                    <ReorderIcon> </ReorderIcon>
                </IconButton>
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="logo"/>
            </div>

            <div className="header_middle">
                <div className="search_mail">
              
                <IconButton>
                    <SearchIcon> </SearchIcon>
                </IconButton>

                <input value={value} type="text" placeholder="Search mail" onChange={(e)=> {setValue(e.target.value)}} onKeyUp={(e)=> { 
                    if(e.key === 'Enter'){
                        handlesearch() 
                    }
                     }}/>
                <IconButton>
                    <ExpandMoreIcon> </ExpandMoreIcon>
                </IconButton>
                </div>
            </div>

            <div className="header_right">
                <IconButton>
                    <HelpOutlineIcon> </HelpOutlineIcon>
                </IconButton>

                <IconButton>
                    <SettingsIcon> </SettingsIcon>
                </IconButton>

                <IconButton>
                    <AppsIcon> </AppsIcon>
                </IconButton>
                <Avatar src="https://media-exp1.licdn.com/dms/image/C560BAQGr3iIBR9B-Nw/company-logo_200_200/0/1649737067604?e=2147483647&v=beta&t=RdPGqX3MUSwO085YmXBYxI4n-C2GyG7Mj2kAWUhOrUU"></Avatar>
            </div>
        </div>
    )
}

export default Header;