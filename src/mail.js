import { IconButton } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
import "./css/mail.css";
import JoditEditor from "jodit-react";
import { BACKEND_API, FRONTEND_API } from "./url";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./css/loading.css";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useLocation } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import parse from 'html-react-parser';
// import sanitizeHtml from 'sanitize-html';
import MyDocViewer from "./MyDocViewer";

function Mail({ setId, setRead }) {
  const meEmailCode = "140326422059872";
  const [isLoading, setIsLoading] = useState(true);
  // const [replyTo, setReplyTo] = useState("");
  var replyToMsgId = "";
  var replyToReferences = "";
  var replyToSubject = "";
  var replyTo = "";
  var replyCc = "";
  // const [replyToMsgId, setReplyToMsgId] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);

  function handleClick() {
    setShowTextArea(true);
  }

  const [message, setMessage] = useState("<p>Warm Regards,</p><p>Human Resource Department</p><p>TutorsHive Pvt Ltd.</p><p>Email: admin@tutorshive.com</p><p>Phone: +91-9156292475</p>");
  const handleChange = (e, editor) => {
    const data = editor.getData();
    data = data + message;
    setMessage(data);
  }
  const editor = useRef(null)

  function setTo(to) {
    replyTo = to;
  }

  function setCc(cc) {
    replyTo = cc;
  }


  const history = useHistory();
  const location = useLocation();
  const threadId = location.state?.threadId;
  const [mails, setEmails] = useState([])


  const fetchMail = () => {

    console.log("ID " + threadId)
    fetch(BACKEND_API +
      "read_thread?threadId=" + threadId
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data)
        data = data.replace(/&quot;/g, '\\"');
        data = JSON.parse(data);
        setRead(threadId);
        setEmails(data["threads"]);
        setIsLoading(false);
      });
  }

  const fetchMedia = (mediaName) => {

    console.log("media " + mediaName)
    fetch(BACKEND_API +
      "media/" + mediaName
    )

      .then((response) => response.text())
      .then((data) => {
        try {

          const filePath = path.join(__dirname, "./Image Attachments", mediaName); // Replace with actual directory path
          console.log("file path " + filePath)
          fs.writeFileSync(filePath, buffer);
          res.send("Media saved successfully.");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error while saving media.");
        }
      });
  }

  /*   app.get("/media/:mediaName", async (req, res) => {
      const mediaName = req.params.mediaName;
      const mediaUrl = BACKEND_API + `media/${mediaName}`; // Replace with actual media URL
    
      try {
        const response = await fetch(mediaUrl);
        const buffer = await response.buffer();
        const filePath = path.join(__dirname, "./Image Attachments", mediaName); // Replace with actual directory path
    
        fs.writeFileSync(filePath, buffer);
        res.send("Media saved successfully.");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error while saving media.");
      }
    }); */

  useEffect(() => {

    fetchMail();

  }
    , [threadId]);

  const sendReply = async (e) => {
    e.preventDefault();

    console.log("reply to " + replyTo);
    console.log("reply cc " + replyCc);
    console.log("message " + message);

    const jsonData = new FormData();
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", FRONTEND_API);
    jsonData.append("toemail", replyTo);
    if (replyCc.length !== 0) {
      jsonData.append("toemail", replyCc);
    }
    jsonData.append("emailMsg", message);
    jsonData.append("threadId", threadId);
    jsonData.append("In-Reply-To", replyToMsgId);
    jsonData.append("References", replyToReferences)
    jsonData.append("subject", replyToSubject);

    for (const [key, value] of jsonData.entries()) {
      console.log(key, value);
    }

    await fetch(BACKEND_API + "send_email", {
      method: "POST",
      mode: "cors",
      body: jsonData,
      headers: headers,
    });
    setMessage("");
    setShowTextArea(false);
    window.location.reload(true);
  }




  // const handlesearch = () => {
  //   var id = ""
  //   mails.forEach((mail)=> id = mail.Id)
  //   const type = location.state?.type;
  //   console.log("type is :",type);
  //   setId(id)
  //   if (type === 1) {
  //     history.push("/");
  //   }
  //   if (type === 2) {
  //     history.push("/draft");
  //   }
  //   if (type === 3) {
  //     history.push("/sent");
  //   }
  //   if (type === 4) {
  //     history.push("/search");
  //   }
  // setURL("http://localhost:7000/get_emails");

  // }
  const display = [];
  const GoBack = (e) => {
    const type = location.state?.type;
    console.log("type is :", type);
    e.preventDefault();
    if (type === 1) {
      history.push("/");
    }
    if (type === 2) {
      history.push("/draft");
    }
    if (type === 3) {
      history.push("/sent");
    }
    if (type === 4) {
      history.push("/search");
    }
  };
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", FRONTEND_API);
  const type = location.state?.type;


  mails.forEach(function (values) {
    console.log
    if (mails[0].hasOwnProperty('Message-ID')) {
      replyToMsgId = mails[0]["Message-ID"];
    }

    //console.log("values  "  + values.Path)
    replyToMsgId = mails[0].Id
    replyToReferences = mails[0].References;

    if (values.LabelIds.includes("UNREAD")) {
      fetch(BACKEND_API +
        "mark_as_read?msgid=" + values.Id
      );
      setEmails(mails.map(item => {
        if (item.ThreadId === values.ThreadId) {
          item.LabelIds = item.LabelIds.filter(label => label !== "UNREAD")
        }
        return item;
      }))
    }
    const valueFrom = values.From;
    const valueTo = values.To;
    const valueCc = values.Cc.join(', ');
    console.log(typeof values.To)

    /*    const getTo = (encodedStrings) => {
   
         const emails = encodedStrings.map(encodedString => {
           const parts = encodedString.split(' '); // Split by space
   
           if (parts.length === 2) {
             const email = parts[1];
             console.log(email);
             return email;
           } else {
             return "Invalid input format.";
           }
         });
         /*  console.log(emails); 
         return emails;
       }*/


    const getTo = (encodedStrings) => {
      //console.log(encodedStrings);

      if (encodedStrings.length != 0) {
        const maskedEmail = encodedStrings[0];
        // Split the input string into email and name
        const parts = maskedEmail.split(" ");

        // Extract the email part
        const email = parts[0];

        // Encode the email to base64
        const emailBase64 = atob(email);

        return emailBase64;
      } else {
        return null
      }
    }
    // const value_name =(type===1)?values.FromName:values.ToName;
    display.push(
      <li>
        <div className="mail__body">
          <div className="mail__bodyHeader">
            <h2>{values.Subject}</h2>
            <br />
            <LabelImportantIcon className="mail__important" />
            <div style={{ display: 'block', marginLeft: '100px', float: 'right' }}>
              <small>
                From: {valueFrom}<br />
                To: {getTo(valueTo)}<br />
                Cc: {valueCc}<br /></small>
            </div>

            {/* <p>{value_name}</p> */}
            <p className="mail__time">
              <IconButton>
                <DeleteIcon
                  onClick={async (e) => {
                    await fetch(BACKEND_API +
                      `delete_email_by_id?msgId=${values.Id}`,
                      {
                        method: "GET",
                        mode: "cors",
                        headers: headers,
                      }
                    );
                    if (mails.length === 1) {
                      setId(values.Id);
                      if (type === 1) {
                        history.push("/");
                      }
                      if (type === 2) {
                        history.push("/draft");
                      }
                      if (type === 3) {
                        history.push("/sent");
                      }
                      if (type === 4) {
                        history.push("/search");
                      }
                    }
                    else {
                      // setEmails(mails.filter(item => item.id !== values.Id));
                      setIsLoading(true);
                      fetchMail();
                    }

                    // handlesearch()
                  }
                  }
                />
              </IconButton>
              {values.Date}</p>
          </div>
          <div className="mail__message">
            <p>{parse(values.Body)} </p>
          </div>

          {values.Path.length !== 0 && (

            <div className="emailbody_attachment">
              {values.Path.map((item, index) => {
                const fileName = Object.keys(item)[0]; // Extract the file name
                const filePath = item[fileName]; // Extract the file path


                const handleDownload = () => {
                  // Make an AJAX request to the server endpoint
                  fetch('/download')
                    .then(response => response.blob())
                    .then(blob => {
                      // Create a temporary URL for the blob
                      const url = window.URL.createObjectURL(blob);

                      // Create a link element to trigger the download
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = fileName;

                      // Trigger a click event on the link to initiate the download
                      link.click();

                      // Clean up the temporary URL
                      window.URL.revokeObjectURL(url);
                    })
                    .catch(error => {
                      console.error('Error downloading the file:', error);
                    });
                };

                return (
                  <div key={index}>
                    <span>{fileName}</span>
                    <button type="button" onClick={handleDownload}>Download</button>
                  </div>
                );
              })}
            </div>
          )}


        </div>
      </li>
    );
    if (display.length === mails.length) {
      replyTo = values.From.concat(values.Cc).concat(values.To);
      console.log(replyTo)
      // Extract the single element from the array
      if (replyTo.length != 0) {

        const maskedEmail = replyTo[0];

        // Split the input string into email and name
        const parts = maskedEmail.split(" ");

        // Extract the email part
        const email = parts[0];

        // Encode the email to base64
        const emailBase64 = atob(email);

        // Output the base64-encoded email
        console.log("Base64-encoded Email:", emailBase64);;
        replyTo = emailBase64;
      } else {
        replyTo = replyTo[0];

      }

      /* replyTo = replyTo.filter(array => !array.includes(meEmailCode));
      replyTo = replyTo.map((item) => item.split(' ')[1])
      replyTo = replyTo.map(item => item.replace(/"/g, '')); */

      console.log(replyTo)
      replyToSubject = values.Subject;
      // if (mails.length-2>=0){
      //   replyToReferences = mails[mails.length-2].Id + " " + replyToMsgId;
      // }
      // else{
      //   replyToReferences = replyToMsgId;
      // }

    }
  });






  if (isLoading) {
    return (
      <div className="mail__centre">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <IconButton onClick={GoBack}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <MoveToInboxIcon />
          </IconButton>
          <IconButton>
            <ErrorIcon />
          </IconButton>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <WatchLaterIcon />
          </IconButton>
          <IconButton>
            <CheckCircleIcon />
          </IconButton>
          <IconButton>
            <LabelImportantIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>

        <div className="mail__toolsRight">
          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>
          <IconButton>
            <PrintIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <ul>{display}</ul>
      <div>
        {!showTextArea && <button onClick={handleClick}>Reply</button>}
        {showTextArea && (
          <div className="reply__message">
            <div className="compose_bodyForm">
              <input
                type="text"
                placeholder="To"
                value={replyTo}
                onChange={(e) => setTo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Cc"
                value={replyCc}
                onChange={(e) => setCc(e.target.value)}
              />
            </div>
            <JoditEditor
              ref={editor}
              value={message}

              onChange={newContent => { setMessage(newContent) }}

            />
            <button type="submit" onClick={sendReply} >Send</button>

            <button onClick={() => setShowTextArea(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mail;
