// import { useEffect, useState } from "react";

// function useFetch(url) {
//    console.log("the url:",url);
//     const [emails, setEmails] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const nextPageToken = ""
//     useEffect(() => {
//         setLoading(true);
//         fetch(url)
//           .then((res) => {
//             return res.text();
//           })
//           .then((data) => {
//             data = data.replace(/&quot;/g, '\\"');
//             data = JSON.parse(data);
//             setEmails(data["emails"]);
//             nextPageToken = data["pageToken"]
//           }).catch((err) => { 
//             setError(err);
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       }, [url]);

//   // const refetch = () => {
//   //   setLoading(true);
//   //   fetch(url)
//   //   .then((data) => {
//   //       data = data.replace(/&quot;/g, '\\"');
//   //       data = JSON.parse(data);
//   //       setEmails(data["emails"]);
//   //     })
//   //     .catch((err) => {
//   //       setError(err);
//   //     })
//   //     .finally(() => {
//   //       setLoading(false);
//   //     });
//   // };
//   console.log("the email:",emails);
//   return { emails, nextPageToken};
// }

// export default useFetch;
