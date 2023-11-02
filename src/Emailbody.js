import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import "./css/emaillist.css";
import { useHistory } from "react-router-dom";
import React from "react";

function Emailbody({ date, from, subject, content, path,thread,id }) {
  const history = useHistory();
  return (
    <div
      className="emailbody"
      onClick={(e) =>
        history.push({
          pathname: "/mail",
          state: { date: date, from: from, subject: subject, content: content ,path: path,thread:thread,id:id},
        })
      }
    >
      <div className="emailbody_left">
        <CheckBoxOutlineBlank />
        <StarBorderIcon />
        <LabelOutlinedIcon />
        <h4>{from}{"  "}</h4>
      </div>

      <div className="emailbody_middle">
        <div className="emailbody_middle_msg">
          <p>{subject}</p>
        </div>
      </div>

      <div className="emailbody_right">
        <p>
          {new Date(date).getHours()}
          {":"}
          {new Date(date).getMinutes()}
          {"    "}
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default Emailbody;
