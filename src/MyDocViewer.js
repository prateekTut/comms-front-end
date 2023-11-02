import DocViewer from "react-doc-viewer";

 
function MyDocViewer({myPath}) 
{
    const docs = [
      { uri: require("./Image Attachments/"+ myPath) }, // Local File//
    ];
    // eslint-disable-next-line
    return <DocViewer documents={docs} />;
  }
export default MyDocViewer;