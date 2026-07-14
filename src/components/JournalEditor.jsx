import { useState, useEffect } from "react";
import { handleCorrect } from "../services/api.js";

function JournalEditor() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />
      <button
        onClick={async () => {
          const data = await handleCorrect(text);
          setResult(data);
          console.log("Backend response:", data);
        }}
      >
        Check Writing
      </button>
    </>
  );
}

export default JournalEditor;
