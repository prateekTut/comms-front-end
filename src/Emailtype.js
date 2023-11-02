import React from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import "./css/emaillist.css";



function Emailtype() {
  return (
    <div className='emailtype'>
        <div className='emailtype_options emailtype_options--active'>
            <InboxIcon/>
            <p> Primary </p>
        </div>
    </div>
  )
}

export default Emailtype;