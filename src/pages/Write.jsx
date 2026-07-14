import { useState } from "react";
import JournalEditor from "../components/JournalEditor.jsx";
import JournalText from "../components/JournalText.jsx";

function Write() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  return (
    <>
      <JournalEditor />
      <JournalText />
      {/* <Sidebar />  */}
    </>
  );
}

export default Write;
