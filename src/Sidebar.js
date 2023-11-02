import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./css/sidebar.css";
import Sidebaroptions from "./Sidebaroptions";
import InboxIcon from "@mui/icons-material/Inbox";
import SentIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { OpenSendMessage } from "./features/mail/mailSlice";
import { useHistory } from "react-router-dom";

function Sidebar({sideBarParams}) {
  const dispatch = useDispatch();
  const [active, setActive] = useState("1");
  const history = useHistory();

  function onClickDraft () {
    console.log('phani')
    sideBarParams.setSearch("");
    setActive("2");
    if (sideBarParams.draftPrevPTlist.length !== 0){
      sideBarParams.setDraftNextPT("0");
      sideBarParams.setEventDraft("next");
      sideBarParams.draftPrevPTlist([]);
      sideBarParams.setIsLoadingDraft(true)
    }
    
    history.push("/draft");
    
  }
  function onClickSent () {
    sideBarParams.setSearch("");
    setActive("3");
    if (sideBarParams.sentPrevPTlist.length !== 0){
      sideBarParams.setSentNextPT("0");
      sideBarParams.setEventSent("next");
      sideBarParams.sentPrevPTlist([]);
      sideBarParams.setIsLoadingSent(true);
    }
    
    history.push("/sent");
  }
  function onClickInbox () {
    sideBarParams.setSearch("");
    setActive("1");
    if (sideBarParams.inboxPrevPTlist.length !== 0){
      sideBarParams.setInboxNextPT("0");
      sideBarParams.setEventInbox("next");
      sideBarParams.inboxPrevPTlist([]);
      sideBarParams.setIsLoadingInbox(true)
    }
    
    history.push("/");
  }
  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon />}
        className="compose_btn"
        onClick={() => dispatch(OpenSendMessage())}
      >
        {" "}
        Compose{" "}
      </Button>

      <Sidebaroptions
        Icon={InboxIcon}
        title="Inbox"
        isactive={active === "1" ? true : false}
        onClick={onClickInbox}
      />
      <Sidebaroptions
        Icon={InboxIcon}
        title="Draft"
        isactive={active === "2" ? true : false}
        onClick={onClickDraft}
      />

      <Sidebaroptions
        Icon={SentIcon}
        title="Sent"
        isactive={active === "3" ? true : false}
        onClick={onClickSent}    
      />
    </div>
  );
}

export default Sidebar;
