import { useEffect, useState } from "react";

function EmailSorting({ emails }) {
  const [inbox, setInbox] = useState([]);
  const [draft, setDraft] = useState([]);
  const [loading,setLoading] = useState(false);
  const [sent, setSent] = useState([]);

  t(() => {
    setLoading(true);
    emails.map((email) =>
        email.LabelIds.includes("INBOX")
          ? setInbox(email)
          : email.LabelIds.includes("DRAFT")
          ? setDraft(email)
          : setSent(email)
      );
    setLoading(false);
      
  }, [emails]);useEffec
  return { inbox, draft, sent,loading };
}

export default EmailSorting;
