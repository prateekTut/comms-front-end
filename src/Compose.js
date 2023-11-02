import React, { useRef, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import HeightIcon from "@mui/icons-material/Height";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./css/compose.css";
import { useDispatch } from "react-redux";
import { CloseSendMessage } from "./features/mail/mailSlice";
import JoditEditor from "jodit-react";
import {BACKEND_API, FRONTEND_API } from "./url";

function Compose() {
  const MAX_COUNT = 5;
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const defaultDraft = "<p>Warm Regards,</p><p>Human Resource Department</p><p>TutorsHive Pvt Ltd.</p><p>Email: admin@tutorshive.com</p><p>Phone: +91-9156292475</p>"
  const [message, setMessage] = useState(defaultDraft);
  const handleChange = (e,editor) => {
    const data = editor.getData();
    data=data+message;
    setMessage(data);
  }
  const editor = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const dispatch = useDispatch();
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (to === "") {
      return alert("To is required!!");
    }
    if (subject === "") {
      return alert("Subject is required!!");
    }
    if (message === "") {
      return alert("Message is required!!");
    }
    const jsonData = new FormData();
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", FRONTEND_API);
    jsonData.append("toemail", to);
    if (cc.length!==0){
      jsonData.append("ccemail", cc);
    }
    jsonData.append("subject", subject);
    jsonData.append("emailMsg", message);

    if (uploadedFiles != null) {
      for (const file of uploadedFiles) {
        jsonData.append("files", file);
      }
    }

    fetch(BACKEND_API+"send_email", {
      method: "POST",
      mode: "cors",
      body: jsonData,
      headers: headers,
    });

    alert(`Name is ${to}. Subject is ${subject}. Message is ${message}`);

    dispatch(CloseSendMessage());
  };
  const CreateDraft = (e) => {
    e.preventDefault();
    const jsonData = new FormData();
    if(message !== defaultDraft){
      if (to !== "" || subject !== "" || message !== "") {
        jsonData.append("toemail", to);
        jsonData.append("subject", subject);
        jsonData.append("draftMsg", message);
      }
      // jsonData.append('files', selectedfile[0]);
  
      if (uploadedFiles != null) {
        for (const file of uploadedFiles) {
          jsonData.append("files", file);
        }
      }
      fetch(BACKEND_API+"create_draft", {
        method: "POST",
        mode: "cors",
        body: jsonData,
      });
    }
    dispatch(CloseSendMessage());
  };


  return (
    <div className="compose" >
      <div className="compose_header">
        <div className="compose_header_left">
          <span>New Message</span>
        </div>
        <div className="compose_header_right">
          <RemoveIcon />
          <HeightIcon />
          <CloseIcon onClick={CreateDraft} />
        </div>
      </div>

      <div className="compose_body">
        <div className="compose_bodyForm">
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cc"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
            <JoditEditor 
              ref = {editor}
              value = {message}
            
              onChange={newContent => {setMessage(newContent)}}
              
            />
        </div>
      </div>

      <div className="compose_footer_right">
          {/* <AttachFileIcon> */}
          <input
            id="fileUpload"
            type="file"
            multiple
            onChange={handleFileEvent}
            disabled={fileLimit}
          />
          {/* <label htmlFor="fileUpload">
            <a className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}>
              Upload Files
            </a>
          </label> */}

          {
            <div className="uploaded-files-list">
              {uploadedFiles.map((file) => (
                <div>{file.name}</div>
              ))}
            </div>
          }
          {/* <LinkIcon />
          <InsertEmoticonIcon />
          <NoteAddIcon />
          <PhotoIcon />
          <PhonelinkLockIcon />
          <CreateIcon />
          <MoreVertIcon />
          <DeleteIcon /> */}
        </div>

      <div className="compose_footer">
        <div className="compose_footer_left">
          <button type="submit" onClick={formSubmit}>
            Send <ArrowDropDownIcon />
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default Compose;
