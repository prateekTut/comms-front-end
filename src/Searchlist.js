import React, { useRef, useState, useEffect } from "react";
import Emaillistsetting from "./Emaillistsetting";
import Emailtype from "./Emailtype";
import "./css/emaillist.css";
import EmailBodyThread from "./EmailBodyThread";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./css/loading.css";

function Searchlist({ emails, setEventSearch, isLoadingSearch, setIsLoadingSearch }) {
  
  
  const length= useRef(0);
  const threadId = [];
  const [isLoading, setIsLoading] = useState(isLoadingSearch)

  useEffect(() => {
    console.log('in search')
    console.log(isLoading);
    setIsLoadingSearch(isLoading);
  }, [isLoading])
 

  // aggragting diferent conversations
  if (emails) {
    length.current=emails.length;
    emails.forEach((email) => {
      if (!threadId.includes(emails.ThreadId)) {
        threadId.push(email.ThreadId);
      }
    });
  }
  let mapemail = new Map();
  // eslint-disable-next-line array-callback-return
  if (emails) {
    threadId.forEach((id) => {
      const mail = [];
      emails.forEach((email) => {
        if (email.ThreadId === id) {
          mail.push(email);
        }
      });
      mapemail.set(id, mail);
    });
  }
  const items = [];
  mapemail.forEach(function (values, key) {
    items.push(
      <li>
        <EmailBodyThread threademail={values} type={4} />
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className="mail__centre">
       <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="emaillist">
      <Emaillistsetting noOfRows={length.current} setEventInbox={setEventSearch} setIsLoading={setIsLoading}/>
      <Emailtype />
      {<ul>{items}</ul>}
    </div>
  );
}

export default Searchlist;
