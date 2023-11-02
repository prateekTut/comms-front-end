import React from 'react'
import "./css/emaillist.css"
import { IconButton } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RefreshIcon from '@mui/icons-material/Refresh'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'


function Emaillistsetting({noOfRows, setEventInbox, setIsLoading}) {
     
  
    const parentToChild = (event) => {
        console.log(event)
        setEventInbox(event);
        setIsLoading(true);
    }
    
  return (
    <div className='emaillist_settings'>
        <div className='emaillist_settingsLeft'>
            <IconButton>
                <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
            </IconButton>

            <IconButton>
                <ArrowDropDownIcon></ArrowDropDownIcon>
            </IconButton>

            <IconButton>
                <RefreshIcon></RefreshIcon>
            </IconButton>

            <IconButton>
                <MoreVertIcon></MoreVertIcon>
            </IconButton>
        </div>

        <div className='emaillist_settingsRight'>
            <p>{noOfRows}</p>
            <IconButton onClick={() => parentToChild('prev')}>
                <ChevronLeftIcon></ChevronLeftIcon>
            </IconButton>

            <IconButton onClick={() => parentToChild('next')}>
                <ChevronRightIcon></ChevronRightIcon>
            </IconButton>
        </div>
    </div>

  )
}

export default Emaillistsetting;