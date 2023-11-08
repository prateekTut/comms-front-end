import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Compose from "./Compose";
import {BACKEND_API} from "./url";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mail/mailSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mail from "./mail";
import Emaillist from "./Emaillist";
import DraftList from "./DraftList";
import SentList from "./SentList";
import Searchlist from "./Searchlist";
// import useFetch from "./usefetch";
import { useStackState } from "rooks";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./css/loading.css";

function App() {
  
  const maxResults = 10
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  const [search, setSearch] = useState("");

  const [id, setId] = useState("");
  const [read, setRead] = useState("");


  const [inboxPT, setInboxPT] = useState("0");
  const [sentPT, setSentPT] = useState("0")
  const [draftPT, setDraftPT] = useState("0")
  const [searchPT, setSearchPT] = useState("0");

  //next PTS
  const [inboxNextPT, setInboxNextPT] = useState("0");
  const [sentNextPT, setSentNextPT] = useState("0")
  const [draftNextPT, setDraftNextPT] = useState("0")
  const [searchNextPT, setSearchNextPT] = useState("0");

  //Prev PTs
  const [inboxPrevPTlist] = useStackState([]);
  const [sentPrevPTlist] = useStackState([]);
  const [draftPrevPTlist] = useStackState([]);
  const [searchPrevPTlist] = useStackState([]);

  const [eventInbox, setEventInbox] = useState("next");
  const [eventDraft, setEventDraft] = useState("next");
  const [eventSent, setEventSent] = useState("next");
  const [eventSearch, setEventSearch] = useState("");

  const [inboxEmails, setInboxEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [draftEmails, setDraftEmails] = useState([]);
  const [searchEmails, setSearchEmails] = useState([]);

  const [isLoadingInbox, setIsLoadingInbox] = useState(true);
  const [isLoadingSent, setIsLoadingSent] = useState(true);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
 
  
  useEffect(() => {
    console.log(read);
    if(read!==""){
    setInboxEmails(inboxEmails.map(item => {
      if (item.ThreadId === read) {
        item.LabelIds = item.LabelIds.filter(label => label!=="UNREAD")
      }
      return item;
    }));
    

    setSentEmails(sentEmails.map(item => {
      if (item.threadId === read) {
        item.LabelIds = item.LabelIds.filter(label => label!=="UNREAD")
      }
      return item;
    }));
    setDraftEmails(draftEmails.map(item => {
      if (item.threadId === read) {
        item.LabelIds = item.LabelIds.filter(label => label!=="UNREAD")
      }
      return item;
    }));
    setSearchEmails(searchEmails.map(item => {
      if (item.threadId === read) {
        item.LabelIds = item.LabelIds.filter(label => label!=="UNREAD")
      }
      return item;
    }));
  }
    setRead("");
  }, [read]);

  useEffect(() => {
    console.log(id);
    setInboxEmails(inboxEmails.filter(item => item.ThreadId !== id));
    setSentEmails(sentEmails.filter(item => item.ThreadId !== id));
    setDraftEmails(draftEmails.filter(item => item.ThreadId !== id));
    setSearchEmails(searchEmails.filter(item => item.ThreadId !== id));
  }, [id]);


  useEffect(() => {
    
    if (eventInbox === "next") {
      if (inboxNextPT !== "") {
        fetch(
          BACKEND_API+"read_emails?labelIds=I&maxResults="+maxResults+"" +
          inboxNextPT
        )
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setInboxEmails(data["emails"]);
            if (inboxNextPT !== "0") {
              inboxPrevPTlist.push(inboxPT);
              setInboxPT(inboxNextPT);
            }
            setInboxNextPT(data["nextPageToken"]);
            setIsLoadingInbox(false);
          });
      }
      
    } else if (eventInbox === "prev") {
      if (inboxPrevPTlist.length !== 0) {
        var lastPT = inboxPrevPTlist.pop()
        fetch(BACKEND_API+
          "read_emails?labelIds=I&maxResults="+maxResults+"" +
          lastPT
        )
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setInboxEmails(data["emails"]);
            setInboxNextPT(data["nextPageToken"]);
            setInboxPT(lastPT);
            setIsLoadingInbox(false);
          });
      }
    }
    setEventInbox("");
   
  
  }, [eventInbox, inboxNextPT, inboxPT, inboxPrevPTlist]);

  useEffect(() => {
    if (eventDraft === "next") {
      if (draftNextPT !== "") {
        fetch(BACKEND_API+
          "read_emails?labelIds=D&maxResults="+maxResults+"" +
          draftNextPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setDraftEmails(data["emails"]);
            if (draftNextPT !== "0") {
              draftPrevPTlist.push(draftPT);
              setDraftPT(draftNextPT);
            }
            setDraftNextPT(data["nextPageToken"]);
            setIsLoadingDraft(false);
            console.log("in draft next", isLoadingDraft)
          });
      }
      
    } else if (eventDraft === "prev") {
      if (draftPrevPTlist.length !== 0) {
        var lastPT = draftPrevPTlist.pop()
        fetch(BACKEND_API+
          "read_emails?labelIds=D&maxResults="+maxResults+"" +
          lastPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setDraftEmails(data["emails"]);
            setDraftNextPT(data["nextPageToken"]);
            setDraftPT(lastPT);
            setIsLoadingDraft(false);
            console.log("in draft prev", isLoadingDraft)
          });
      }
    }
    setEventDraft("");
    
  
  }, [eventDraft, draftNextPT, draftPT,draftPrevPTlist]);

  useEffect(() => {
    if (eventSent === "next") {
      if (sentNextPT !== "") {
        fetch(BACKEND_API+
          "read_emails?labelIds=S&maxResults="+maxResults+"" +
          sentNextPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setSentEmails(data["emails"]);
            if (sentNextPT !== "0") {
              sentPrevPTlist.push(sentPT);
              setSentPT(sentNextPT);
            }
            setSentNextPT(data["nextPageToken"]);
            setIsLoadingSent(false);
            console.log('roshni')
            console.log(isLoadingSent)
          });
      }
      
    } else if (eventSent === "prev") {
      if (sentPrevPTlist.length !== 0) {
        var lastPT = sentPrevPTlist.pop()
        fetch(BACKEND_API+
          "read_emails?labelIds=S&maxResults="+maxResults+"" +
          lastPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setSentEmails(data["emails"]);
            setSentNextPT(data["nextPageToken"]);
            setSentPT(lastPT);
            setIsLoadingSent(false);
          });
      }
    }
    setEventSent("");
   
  
  }, [eventSent, sentNextPT, sentPT, sentPrevPTlist, isLoadingSent]);

  useEffect(() => {
    if (eventSearch === "next") {
      if (searchNextPT !== "") {
        fetch(BACKEND_API+
          "read_emails?labelIds=&search_string="+search+"&maxResults="+maxResults+"" +
          searchNextPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setSearchEmails(data["emails"]);
            if (searchNextPT !== "0") {
              searchPrevPTlist.push(searchPT);
              setSearchPT(searchNextPT);
            }
            setSearchNextPT(data["nextPageToken"]);
            setIsLoadingSearch(false);
          });
      }
    } else if (eventSearch === "prev") {
      if (searchPrevPTlist.length !== 0) {
        var lastPT = searchPrevPTlist.pop()
        fetch(BACKEND_API+
          "read_emails?labelIds=&search_string="+search+"&maxResults="+maxResults+"" +
          lastPT
        )
          .then((response) => response.text())
          .then((data) => {
            data = data.replace(/&quot;/g, '\\"');
            data = JSON.parse(data);
            setSearchEmails(data["emails"]);
            setSearchNextPT(data["nextPageToken"]);
            setSearchPT(lastPT);
            setIsLoadingSearch(false);
          });
      }
    }
    setEventSearch("");
    
  }, [eventSearch, searchNextPT, searchPT, searchPrevPTlist])

  useEffect(() => {
    console.log('in app'+ search)
    if (search !== "") {
      setIsLoadingSearch(true);
      setEventSearch("next") // next

  }
  }, [search]);

  if (isLoadingInbox || isLoadingDraft || isLoadingSent ) {
    return (
      <div className="App">
        <Header setSearch={setSearch} search={search}/>
      <div className="mail__centre">
       <CircularProgress color="secondary" />
      </div>
      </div>
    );
  }
  
  const sideBarParams = { setSearch, setInboxNextPT, inboxPrevPTlist, setEventInbox,setIsLoadingInbox, setDraftNextPT
    , draftPrevPTlist, setEventDraft, setIsLoadingDraft, 
  setSentNextPT, sentPrevPTlist, setEventSent, setIsLoadingSent };

  return (
    <div className="App">
      <Router>
        <Header setSearch={setSearch} search={search}/>
        <div className="app_body">
          <Sidebar sideBarParams={sideBarParams} />
          <Switch>
            <Route exact path="/">
              <Emaillist
                emails={inboxEmails}
                setEventInbox={setEventInbox}
                isLoadingInbox = {isLoadingInbox}
                setIsLoadingInbox = {setIsLoadingInbox}
              />
            </Route>
            <Route exact path="/draft">
              <DraftList emails={draftEmails} 
              setEventDraft={setEventDraft} isLoadingDraft = {isLoadingDraft} setIsLoadingDraft = {setIsLoadingDraft}/>
            </Route>
            <Route exact path="/sent">
              <SentList emails={sentEmails} 
              setEventSent={setEventSent} isLoadingSent = {isLoadingSent} setIsLoadingSent = {setIsLoadingSent}/>
            </Route>
            <Route exact path="/mail">
              <Mail setId={setId} setRead={setRead} />
            </Route>
            <Route exact path="/search">
            <Searchlist
                emails={searchEmails}
                setEventSearch={setEventSearch} isLoadingSearch={isLoadingSearch} setIsLoadingSearch={setIsLoadingSearch}
              />
            </Route>
          </Switch>
        </div>
        {isMessageOpen && <Compose />}
      </Router>
    </div>
  );
}

export default App;
