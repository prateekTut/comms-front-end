import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import "./css/emaillist.css";
import { useHistory } from "react-router-dom";
import React from "react";

function EmailBodyThread({threademail,type}) {

  const history = useHistory();
  const mails=threademail;
  const email=mails[0];
  const value = (type===1)?email.From:email.To;
  const value_name =(type===1)?email.FromName:email.ToName;
  return (
    <div
      className="emailbody"
      onClick={(e) =>
        history.push({
          pathname: "/mail",
          state: { threadId: email.ThreadId , type: type},
        })
      }
    >
      <div className="emailbody_left">
        <CheckBoxOutlineBlank />
        <StarBorderIcon />
        <LabelOutlinedIcon />
        { email.LabelIds.includes("UNREAD") ?  (<p><b>{value}{"<"}{value_name}{">"}</b></p>) : (<p>{value}{"<"}{value_name}{">"}</p>)}
       
      </div>

      <div className="emailbody_middle">
        <div className="emailbody_middle_msg">
          { email.LabelIds.includes("UNREAD") ?  (<p><b>{email.Subject}</b></p>) : (<p>{email.Subject}</p>)}
        </div>
      </div>

      <div className="emailbody_right">
        {
           email.LabelIds.includes("UNREAD") ? <p><b>
           {new Date(email.Date).getHours()}
           {":"}
           {new Date(email.Date).getMinutes()}
           {"    "}
           {new Date(email.Date).toLocaleDateString()}
           </b></p>
            : <p>
            {new Date(email.Date).getHours()}
            {":"}
            {new Date(email.Date).getMinutes()}
            {"    "}
            {new Date(email.Date).toLocaleDateString()}
            </p>
        }
        
      </div>
    </div>
  );
}

export default EmailBodyThread;
